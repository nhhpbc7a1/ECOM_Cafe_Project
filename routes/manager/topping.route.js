import express from 'express';
import toppingService from '../../services/manager/topping.service.js';
import multer from 'multer';
import handleFileUpload from '../../services/handleFileUpload.service.js';
const upload = multer({ dest: 'public/images/uploads/' });

const router = express.Router();

// route for /manager/topping/...

router.use((req, res, next) => {
    res.locals.active = 'topping'; // Đặt giá trị 'active' mặc định
    next(); // Chuyển sang middleware/route handler tiếp theo
});

router.get('/', async function (req, res) {
    const menu_id = 1;
    const list = await toppingService.findAll(menu_id);
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

    res.render('vwManager/topping/edit', {
        topping: entity
    });
});


router.post('/patch', upload.single('image'), async function (req, res) {
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

    // Gọi service để cập nhật dữ liệu
    await toppingService.patch(topping_id, changes);

    const imagePath = await handleFileUpload(req, 'toppings', topping_id);
    const image = req.file;
    if (image) {
        changes.image_href = imagePath;
        await toppingService.patch(topping_id, changes);
    }

    
    // Chuyển hướng về trang quản lý topping
    res.redirect('/manager/topping');
});

router.post('/add', upload.single('image'), async function (req, res) {
    const menu_id = 1;
    const newTopping = {
        topping_name: req.body.topping_name, // Tên topping
        image_href: req.body.image_href, // Đường dẫn hình ảnh
        cost_price: req.body.cost_price, // Giá gốc
        sale_price: req.body.sale_price, // Giá bán
        is_available: req.body.is_available === 'on', // Trạng thái có sẵn
        menu_id: menu_id, // ID của menu
    }
    const newTopping_id = await toppingService.add(newTopping);
    const imagePath = await handleFileUpload(req, 'toppings', newTopping_id);
    const image = req.file;
    if (image) {
        newTopping.image_href = imagePath;
        await toppingService.patch(newTopping_id, newTopping);
    }

    res.redirect('/manager/topping');
});


export default router;