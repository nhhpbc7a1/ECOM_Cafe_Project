import express from 'express';
import detailService from '../../services/customer/detail.service.js';

const router = express.Router();
// kiểm tra login
// function isLoggedIn(req, res, next) {
//     if (req.session.user) {
//         return next();
//     }
//     return res.redirect('/login');
// }

router.get('/add', async function (req, res) {
    const productId = +req.query.id || 0; 
    console.log("deatail id: ",productId);
    if (!productId) {
        return res.status(400).send('ID sản phẩm không hợp lệ');
    }

    try {
        const menu_item = await detailService.findByID(productId);
        
        if (!menu_item) {
            return res.status(404).send('Sản phẩm không tồn tại');
        }


        const toppingList = await detailService.findToppingByMenuItemID(productId);

        res.render('vwCustomer/detail/add', {
            menu_item: menu_item,
            toppings: toppingList
        });
    } catch (err) {
        // Xử lý lỗi nếu có
        return res.status(500).send('Lỗi khi lấy thông tin sản phẩm');
    }
});
router.post('/add', (req, res) => {
    const { product_id, name, cost_price, quantity, topping, note , image_href } = req.body;
    console.log("product detail: ", req.body);

    const parsedProductId = parseInt(product_id); 
    const parsedQuantity = parseInt(quantity); 
    const parsedCostPrice = parseFloat(cost_price); // Chuyển cost_price thành số

    // Parse topping từ chuỗi JSON thành mảng đối tượng
    let parsedTopping = [];
    if (topping) {
        try {
            parsedTopping = JSON.parse(topping); 
        } catch (error) {
            console.log("Error parsing topping:", error);
        }
    }

    if (!req.session.cart) {
        req.session.cart = [];
    }

    const cart = req.session.cart;
    const existingProduct = cart.find(item => item.product_id === parsedProductId);

    if (existingProduct) {
        existingProduct.quantity += parsedQuantity;
        existingProduct.total_price = existingProduct.quantity * existingProduct.cost_price;
        // Cập nhật topping mới nếu có
        existingProduct.topping = parsedTopping;
        existingProduct.image_href = image_href;
    } else {
        const newProduct = {
            product_id: parsedProductId,
            name,
            quantity: parsedQuantity,
            cost_price: parsedCostPrice,
            total_price: parsedCostPrice * parsedQuantity,
            topping: parsedTopping, // Lưu topping dưới dạng mảng
            note,
            image_href
        };
        cart.push(newProduct);
    }

    // Tính tổng giá trị giỏ hàng
    let cartTotal = 0;
    cart.forEach(item => {
        cartTotal += item.total_price;
    });

    req.session.cartTotal = cartTotal;
    res.redirect('/cart');
});
router.get('/edit', (req, res) => {
    const { id } = req.query;  
    console.log(id); 

 
    const product = req.session.cart?.find(item => item.product_id == id); 
    console.log(product); 
    if (product) {
  
        res.render('vwCustomer/detail/edit', { product });
    } else {
 
        res.redirect('/cart');
    }
});
router.post('/edit', (req, res) => {
    const { product_id, quantity, note, topping } = req.body;
    console.log("product detail: ", req.body);

    const parsedProductId = parseInt(product_id);
    const parsedQuantity = parseInt(quantity);

    // Kiểm tra tính hợp lệ của quantity
    if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
        return res.status(400).send('Invalid quantity');
    }

    // Kiểm tra và chuyển topping thành mảng nếu cần
    let parsedTopping = [];
    if (topping) {
        try {
            // Nếu topping có giá trị, thử parse nó từ chuỗi JSON
            parsedTopping = JSON.parse(topping);  // Chuyển chuỗi JSON thành mảng đối tượng
        } catch (e) {
            // Nếu không thể parse, trả về lỗi
            return res.status(400).send('Invalid topping data');
        }
    }

    // Kiểm tra giỏ hàng
    if (!req.session.cart) {
        req.session.cart = []; // Khởi tạo giỏ hàng nếu chưa có
    }

    const cart = req.session.cart;
    const existingProduct = cart.find(item => item.product_id === parsedProductId);

    if (existingProduct) {
        // Cập nhật sản phẩm đã có trong giỏ
        existingProduct.quantity = parsedQuantity;
        existingProduct.note = note || existingProduct.note;
        existingProduct.topping = parsedTopping; // Cập nhật topping mới

        // Tính lại giá trị tổng của sản phẩm
        const toppingPrice = parsedTopping.reduce((total, toppingItem) => {
            // Giả sử mỗi topping có giá 1 đơn vị, bạn có thể thay đổi logic tính giá tùy theo yêu cầu
            return total + parseFloat(toppingItem.price);  // Sử dụng giá từ toppingItem nếu có
        }, 0);

        // Cập nhật giá sản phẩm (cost_price + toppingPrice)
        const updatedPrice = (existingProduct.cost_price + toppingPrice) * parsedQuantity;
        existingProduct.total_price = updatedPrice;

    } else {
        // Nếu sản phẩm chưa có trong giỏ, trả về lỗi hoặc thông báo
        return res.status(404).send('Product not found in cart');
    }

    // Tính tổng giá trị giỏ hàng
    let cartTotal = 0;
    cart.forEach(item => {
        cartTotal += item.total_price;
    });

    req.session.cartTotal = cartTotal;

    // Chuyển hướng về giỏ hàng sau khi cập nhật
    res.redirect('/cart');
});





export default router;