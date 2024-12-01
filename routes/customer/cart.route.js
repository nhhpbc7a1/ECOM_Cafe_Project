import express from 'express';
import cartService from '../../services/customer/cart.service.js'; // Service quản lý giỏ hàng
import productService from '../../services/customer/menu.service.js'; // Service quản lý giỏ hàng
const router = express.Router();

// Render Cart Page
router.get('/', (req, res) => {
    console.log('Rendering Cart Page');
    const cart = req.session.cart || []; 

    // Tính tổng giá trị sản phẩm trong giỏ hàng (totalSubtotal)
    const totalSubtotal = cart.reduce((total, item) => total + (item.quantity * item.cost_price), 0);

    // Tính các khoản phí (fees), ví dụ giả sử phí là 10% của subtotal
    const fees = totalSubtotal * 0.1; // Ví dụ phí là 10% của subtotal

    // Tính tổng cộng (totalPrice) = subtotal + fees
    const totalPrice = totalSubtotal + fees;

    console.log('Cart:', cart);
    console.log('Total Subtotal:', totalSubtotal);
    console.log('Fees:', fees);
    console.log('Total Price:', totalPrice);

    // Truyền tất cả các giá trị vào template
    res.render('vwCustomer/cart', { cart, totalSubtotal, fees, totalPrice });
});
router.get('/random-products', async (req, res) => {
    try {
        const randomProducts = await productService.getRandomProducts(); // Gọi hàm từ service
        res.json({
            success: true,
            data: randomProducts,
        });
    } catch (error) {
        console.error('Error fetching random products:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Add product to cart
router.post('/add', async (req, res) => {
    const { product_id, name, cost_price, quantity } = req.body;

    // Kiểm tra và hiển thị các giá trị nhận được
    console.log('Received product_id:', product_id); // Kiểm tra product_id
    console.log('Received quantity:', quantity);     // Kiểm tra quantity
    console.log('Received cost_price:', cost_price);  // Kiểm tra cost_price
    console.log('Received name:', name);              // Kiểm tra name

    // Kiểm tra và tạo giỏ hàng nếu chưa có
    if (!req.session.cart) {
        req.session.cart = [];
    }
    const cart = req.session.cart;

    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    const existingProduct = cart.find(item => item.product_id === product_id);

    // Kiểm tra giá trị cost_price hợp lệ
    let validCostPrice = parseFloat(cost_price);
    if (isNaN(validCostPrice) || validCostPrice <= 0) {
        validCostPrice = 0;  
    }

    if (existingProduct) {
        // Nếu sản phẩm đã có trong giỏ hàng, cập nhật số lượng và tổng tiền
        console.log('Found existing product:', existingProduct);
        existingProduct.quantity += parseInt(quantity); // Cộng thêm số lượng sản phẩm
        existingProduct.total_price = existingProduct.quantity * validCostPrice; // Tính lại giá trị tổng
        console.log('Updated product quantity:', existingProduct.quantity);
        console.log('Updated product total price:', existingProduct.total_price);
    } else {
        // Nếu sản phẩm chưa có trong giỏ, thêm sản phẩm mới vào giỏ
        const newProduct = {
            product_id,
            name,
            quantity: parseInt(quantity), // Chuyển quantity sang kiểu số nguyên
            cost_price: validCostPrice, // Sử dụng giá trị cost_price hợp lệ
            total_price: validCostPrice * parseInt(quantity) // Tính giá trị tổng của sản phẩm
        };
        cart.push(newProduct); // Thêm sản phẩm mới vào giỏ
        console.log('Added new product to cart:', newProduct);
    }

    console.log('Cart after update:', cart);  // Kiểm tra giỏ hàng sau khi cập nhật

    // Lưu giỏ hàng vào session
    req.session.cart = cart;

    // Chuyển hướng đến trang giỏ hàng (cart)
    res.redirect('/cart');
});



// View cart
router.get('/view', (req, res) => {
    const cart = req.session.cart || [];
    res.json({ cart });
});

// Remove product from cart
router.post('/remove', (req, res) => {
    try {
        const { productId } = req.body;

        // Kiểm tra xem giỏ hàng có tồn tại hay không
        if (!req.session.cart || req.session.cart.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        // Xóa sản phẩm khỏi giỏ hàng
        req.session.cart = req.session.cart.filter(item => item.productId !== productId);

        res.json({ message: 'Product removed from cart', cart: req.session.cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Clear cart
router.post('/clear', (req, res) => {
    try {
        req.session.cart = []; // Xóa giỏ hàng
        res.json({ message: 'Cart cleared', cart: req.session.cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Update product quantity in the cart
router.post('/update', async (req, res) => {
    const { product_id, change } = req.body;
    
    console.log('Updating product_id:', product_id);
    console.log('Change:', change); // Giá trị +1 hoặc -1

    // Kiểm tra xem giỏ hàng có tồn tại không
    if (!req.session.cart) {
        return res.redirect('/cart'); // Nếu không có giỏ hàng, điều hướng đến trang giỏ hàng
    }

    const cart = req.session.cart;

    // Tìm sản phẩm trong giỏ hàng
    const product = cart.find(item => item.product_id === product_id);

    if (!product) {
        return res.redirect('/cart'); // Nếu không tìm thấy sản phẩm trong giỏ hàng, điều hướng lại trang giỏ hàng
    }

    product.quantity += parseInt(change); 
    if (product.quantity < 0) product.quantity = 0; 

    product.total_price = product.quantity * product.cost_price;


    if (product.quantity === 0) {
        const index = cart.indexOf(product);
        cart.splice(index, 1); 
    }

 
    const cartTotal = cart.reduce((acc, item) => acc + item.total_price, 0);

 
    req.session.cartTotal = cartTotal;


    res.redirect('/cart');
});
router.get('/totalSubtotal', (req, res) => {
    if (!req.session.cart || req.session.cart.length === 0) {
        return res.json({
            success: true,
            totalSubtotal: 0,
            message: 'Cart is empty'
        });
    }

    const cart = req.session.cart;
    const totalSubtotal = cart.reduce((total, item) => {
        return total + (item.quantity * item.cost_price); 
    }, 0); 

    res.json({
        success: true,
        totalSubtotal: totalSubtotal
    });
});
// Checkout process (thực hiện thanh toán)
router.post('/checkout', (req, res) => {
    try {
        if (req.session.cart && req.session.cart.length > 0) {
            // Giả sử xử lý thanh toán tại đây
            // Có thể tích hợp với dịch vụ thanh toán như Stripe, PayPal
            req.session.cart = []; // Xóa giỏ hàng sau khi thanh toán thành công
            res.json({ message: 'Checkout successful, cart cleared' });
        } else {
            res.status(400).json({ message: 'Your cart is empty' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
