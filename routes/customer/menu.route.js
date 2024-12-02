import express from 'express';
import menuItemService from '../../services/customer/menu.service.js';
import detailService from '../../services/customer/detail.service.js';
const router = express.Router();


router.get('/', async function(req, res) {
    try {
        const { category_id } = req.query; // Lấy category_id từ query parameters

        let groupedItems;

        // Nếu có category_id, lọc sản phẩm theo category
        if (category_id) {
            groupedItems = await menuItemService.findallByCategory(category_id); // Lọc theo category
        } else {
            groupedItems = await menuItemService.findall(); 
        }
        console.log(groupedItems)
        const categories = await menuItemService.findAllCategories();
        const totalItems = await menuItemService.countTotalItems();

        // Render trang menu với groupedItems, categories, và totalItems
        res.render('vwCustomer/menu', {
            layout: false,
            groupedItems,
            categories,
            totalItems
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});
router.get('/search', async function(req, res) {
    try {
        const { query } = req.query; // Lấy chuỗi tìm kiếm từ query parameter
        if (!query) {
            return res.status(400).send('Missing search query');
        }

        // Kết quả tìm kiếm
        const searchResults = await menuItemService.search(query);

        // Danh mục và tổng số sản phẩm (giữ layout thống nhất)
        const categories = await menuItemService.findAllCategories();
        const totalItems = await menuItemService.countTotalItems();

        res.render('vwCustomer/search', {
            layout: false,
            searchResults,
            categories,
            totalItems,
            query, // Để hiển thị lại chuỗi tìm kiếm
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});
router.post('/add', async (req, res) => {
    const { product_id, name, cost_price, quantity, image_href, topping } = req.body;

    console.log("menu add: ", product_id);

    // Nếu không có giỏ hàng trong session, tạo giỏ hàng mới
    if (!req.session.cart) {
        req.session.cart = [];
    }
    const cart = req.session.cart;

    // Khởi tạo parsedTopping là một mảng rỗng
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

    // Tính tổng giá trị của topping (nếu có)
    const totalToppingPrice = parsedTopping.reduce((acc, top) => acc + parseFloat(top.price), 0);

    // Tính tổng giá trị sản phẩm + topping
    const productTotalPrice = parseFloat(cost_price) * parseInt(quantity);
    const totalPrice = productTotalPrice + totalToppingPrice;

    // Tìm sản phẩm trong giỏ hàng
    const existingProduct = cart.find(item => item.product_id === parseInt(product_id));

    if (existingProduct) {
        console.log('Found existing product:', existingProduct);
        existingProduct.quantity += parseInt(quantity); // Tăng số lượng sản phẩm
        existingProduct.total_price = (existingProduct.quantity * parseFloat(cost_price)) + totalToppingPrice; // Cập nhật tổng giá trị
        existingProduct.toppings = parsedTopping; // Cập nhật topping
        console.log('Updated product quantity:', existingProduct.quantity); 
        console.log('Updated product total price:', existingProduct.total_price); 
    } else {
        // Nếu sản phẩm chưa có trong giỏ hàng, thêm mới sản phẩm
        const newProduct = {
            product_id,
            name,
            quantity: parseInt(quantity),
            cost_price: parseFloat(cost_price),
            total_price: totalPrice, // Tổng giá trị bao gồm topping
            image_href,
            toppings: parsedTopping // Thêm topping vào sản phẩm mới
        };
        cart.push(newProduct);
        console.log('Added new product to cart:', newProduct);
    }

    console.log('Cart after update:', cart);  // Kiểm tra giỏ hàng sau khi cập nhật

    // Cập nhật lại tổng tiền của giỏ hàng
    let cartTotal = 0;
    cart.forEach(item => {
        cartTotal += item.total_price; // Cộng dồn tổng tiền của tất cả các sản phẩm trong giỏ hàng
    });

    req.session.cartTotal = cartTotal; // Lưu tổng tiền vào session

    // Redirect lại đến trang giỏ hàng hoặc trang cần thiết
    res.redirect('/cart');
    
});





export default router;