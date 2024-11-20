import express from 'express';
import toppingService from '../../services/manager/topping.service.js';

const router = express.Router();

// route for /manager/topping/...

router.use((req, res, next) => {
    res.locals.active = 'topping'; // Đặt giá trị 'active' mặc định
    next(); // Chuyển sang middleware/route handler tiếp theo
});

router.get('/', async function (req, res) {
    const menu_id = 1;
    const list = await toppingService.findAll(menu_id);
    // console.log(list);
    // return;
    res.render('vwManager/topping/list', {
        toppings: list
    });
});

router.get('/add', async function (req, res) {
    res.render('vwManager/topping/add');
});

router.post('/del', async function (req, res) {
    await toppingService.del(req.body.topping_id);
    res.redirect('/manager/topping');
});


router.get('/edit', async function (req, res) {
    const id = +req.query.id || 0;
    const entity = await toppingService.findByID(id);

    if (!entity) {
        return res.redirect('/manager/topping');
    }

    entity.is_available = entity.is_available && entity.is_available[0] === 1;

    // console.log(entity);
    // return;
    res.render('vwManager/topping/edit', {
        topping: entity
    });
});


router.post('/patch', async function (req, res) {
    // Lấy `topping_id` từ request
    const topping_id = req.body.topping_id;

    // Tạo object `changes` chứa các trường cần cập nhật
    const changes = {
        topping_name: req.body.topping_name, // Tên topping
        image_href: req.body.image_href, // Đường dẫn hình ảnh
        cost_price: req.body.cost_price, // Giá gốc
        sale_price: req.body.sale_price, // Giá bán
        is_available: req.body.is_available === 'on', // Trạng thái có sẵn
    };

    console.log(changes);
    // Gọi service để cập nhật dữ liệu
    await toppingService.patch(topping_id, changes);
    
    // Chuyển hướng về trang quản lý topping
    res.redirect('/manager/topping');
});

router.post('/add', async function (req, res) {
    // console.log(req.body);
    const menu_id = 1;
    const newMenuItem = {
        topping_name: req.body.topping_name, // Tên topping
        image_href: req.body.image_href, // Đường dẫn hình ảnh
        cost_price: req.body.cost_price, // Giá gốc
        sale_price: req.body.sale_price, // Giá bán
        is_available: req.body.is_available === 'on', // Trạng thái có sẵn
        menu_id: menu_id, // ID của menu
    }
    await toppingService.add(newMenuItem);
    res.redirect('/manager/topping');
});


export default router;