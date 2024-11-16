import express from 'express';
import orderService from '../../services/manager/order.service.js';

const router = express.Router();

// route for /manager/order/...

router.use((req, res, next) => {
    res.locals.active = 'order'; // Đặt giá trị 'active' mặc định
    next(); // Chuyển sang middleware/route handler tiếp theo
});

router.get('/', async function (req, res) {
    const menu_id = 1;
    const list = await orderService.findAll(menu_id);
    // console.log(list);
    // return;
    res.render('vwManager/order/list', {
        orders: list
    });
});

router.get('/add', async function (req, res) {
    res.render('vwManager/order/add');
});

router.post('/del', async function (req, res) {
    await orderService.del(req.body.order_id);
    res.redirect('/manager/order');
});


router.get('/edit', async function (req, res) {
    const id = +req.query.id || 0;
    const entity = await orderService.findByID(id);

    if (!entity) {
        return res.redirect('/manager/order');
    }

    entity.is_available = entity.is_available && entity.is_available[0] === 1;

    // console.log(entity);
    // return;
    res.render('vwManager/order/edit', {
        order: entity
    });
});


router.post('/patch', async function (req, res) {
    // Lấy `order_id` từ request
    const order_id = req.body.order_id;

    // Tạo object `changes` chứa các trường cần cập nhật
    const changes = {
        order_name: req.body.order_name, // Tên order
        image_href: req.body.image_href, // Đường dẫn hình ảnh
        cost_price: req.body.cost_price, // Giá gốc
        sale_price: req.body.sale_price, // Giá bán
        is_available: req.body.is_available === 'on', // Trạng thái có sẵn
    };

    console.log(changes);
    // Gọi service để cập nhật dữ liệu
    await orderService.patch(order_id, changes);
    
    // Chuyển hướng về trang quản lý order
    res.redirect('/manager/order');
});

router.post('/add', async function (req, res) {
    // console.log(req.body);
    const menu_id = 1;
    const newMenuItem = {
        order_name: req.body.order_name, // Tên order
        image_href: req.body.image_href, // Đường dẫn hình ảnh
        cost_price: req.body.cost_price, // Giá gốc
        sale_price: req.body.sale_price, // Giá bán
        is_available: req.body.is_available === 'on', // Trạng thái có sẵn
        menu_id: menu_id, // ID của menu
    }
    await orderService.add(newMenuItem);
    res.redirect('/manager/order');
});


export default router;