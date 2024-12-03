import express from 'express';
import cartService from '../../services/customer/cart.service.js'; // Service quản lý giỏ hàng
import productService from '../../services/customer/menu.service.js'; // Service quản lý giỏ hàng
import detailService from '../../services/customer/detail.service.js';
const router = express.Router();

// Render Cart Page
router.get('/', async (req, res) => {
    console.log('Rendering Cart Page');
    const cart = req.session.cart || []; 

    // Lặp qua giỏ hàng để lấy topping cho mỗi sản phẩm
    for (const item of cart) {
    
        const toppingList = await detailService.findToppingByMenuItemID(item.product_id);

        // Gắn trạng thái "selected" cho topping dựa trên dữ liệu trong giỏ hàng
        toppingList.forEach(topping => {
            topping.selected = item.toppings?.some(t => t.id === topping.id) || false;
        });

        // Gắn topping vào sản phẩm trong giỏ hàng
        item.toppingList = toppingList;
    }

    // Tính tổng giá trị sản phẩm trong giỏ hàng (totalSubtotal)
    const totalSubtotal = cart.reduce((total, item) => total + (item.quantity * item.cost_price), 0);

    // Tính phí (ví dụ phí 10%)
    const fees = totalSubtotal * 0.1; 

    // Tổng giá (subtotal + phí)
    const totalPrice = totalSubtotal + fees;

    // Truyền dữ liệu vào template
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
    // console.log('Received product_id:', product_id); // Kiểm tra product_id
    // console.log('Received quantity:', quantity);     // Kiểm tra quantity
    // console.log('Received cost_price:', cost_price);  // Kiểm tra cost_price
    // console.log('Received name:', name);              // Kiểm tra name

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
        const newProduct = {
            product_id,
            name,
            quantity: parseInt(quantity), 
            cost_price: validCostPrice, 
            total_price: validCostPrice * parseInt(quantity) 
        };
        cart.push(newProduct); // Thêm sản phẩm mới vào giỏ
        console.log('Added new product to cart:', newProduct);
    }

    console.log('Cart after update:', cart);  // Kiểm tra giỏ hàng sau khi cập nhật

    // Lưu giỏ hàng vào session
    req.session.cart = cart;

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

    // Console log giỏ hàng hiện tại
    console.log('Current cart:', cart); 

    // Tìm sản phẩm trong giỏ hàng
    const product = cart.find(item => parseInt(item.product_id) === parseInt(product_id));
    console.log('Product found:', product);

    if (!product) {
        return res.redirect('/cart'); // Nếu không tìm thấy sản phẩm trong giỏ hàng, điều hướng lại trang giỏ hàng
    }

    product.quantity += parseInt(change); 
    if (product.quantity < 0) product.quantity = 0; 

    product.total_price = product.quantity * product.cost_price;

    // Kiểm tra và xóa sản phẩm nếu số lượng bằng 0
    if (product.quantity === 0) {
        const index = cart.indexOf(product);
        cart.splice(index, 1); 
    }

    console.log('Updated cart:', cart);


    const cartTotal = cart.reduce((acc, item) => acc + item.total_price, 0);

    // Lưu tổng giỏ hàng vào session
    req.session.cartTotal = cartTotal;

    // Console log tổng giỏ hàng
    console.log('Cart total:', cartTotal);

    // Redirect đến trang giỏ hàng
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
