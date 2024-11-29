import express from 'express';
import categoryService from '../../services/manager/category.service.js';

const router = express.Router();

// route for /manager/category/...

router.use((req, res, next) => {
    res.locals.active = 'category'; // Đặt giá trị 'active' mặc định
    next(); // Chuyển sang middleware/route handler tiếp theo
});


router.get('/', async function (req, res) {
    const menu_id = 1;
    const list = await categoryService.findAll(menu_id);
    // console.log(list);
    // return;
    res.render('vwManager/category/list', {
        categories: list
    });
});

router.get('/add', async function (req, res) {
    res.render('vwManager/category/add');
});

router.post('/del', async function (req, res) {
    await categoryService.del(req.body.category_id);
    res.redirect('/manager/category');
});


router.get('/edit', async function (req, res) {
    const id = +req.query.id || 0;
    const entity = await categoryService.findByID(id);

    if (!entity) {
        return res.redirect('/manager/category');
    }
    // console.log(entity);
    // return;
    res.render('vwManager/category/edit', {
        category: entity
    });
});


router.post('/patch', async function (req, res) {
    // Lấy `category_id` từ request
    const category_id = req.body.category_id;

    // Tạo object `changes` chứa các trường cần cập nhật
    const changes = {
        category_name: req.body.category_name, // Tên category
        image_href: req.body.image_href, // Đường dẫn hình ảnh
    };

    console.log(changes);
    // Gọi service để cập nhật dữ liệu
    await categoryService.patch(category_id, changes);
    
    // Chuyển hướng về trang quản lý category
    res.redirect('/manager/category');
});

router.post('/add', async function (req, res) {
    // console.log(req.body);
    const menu_id = 1;
    const newMenuItem = {
        category_name: req.body.category_name, // Tên category
        image_href: req.body.image_href, // Đường dẫn hình ảnh
        menu_id: menu_id, // ID của menu
    }
    await categoryService.add(newMenuItem);
    res.redirect('/manager/category');
});


export default router;