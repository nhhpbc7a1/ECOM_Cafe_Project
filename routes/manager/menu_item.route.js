import express from 'express';
import menu_itemService from '../../services/manager/menu_item.service.js';
import categoryService from '../../services/category.service.js';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));


const upload = multer({ dest: 'public/images/uploads/' });

const handleFileUpload = async (req, type, id) => {
    const image = req.file;
    if (!image) return null;

    // Tạo thư mục lưu ảnh cho id
    const uploadDir = path.normalize(path.join(__dirname, '..', '..', 'public', 'images', `${type}`, `${id}`));

    // Kiểm tra xem thư mục đã tồn tại chưa, nếu chưa thì tạo thư mục
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(path.join(uploadDir));
    }

    // Đường dẫn ảnh cần lưu
    const imagePath = path.join(uploadDir, 'main.jpg');

    // Di chuyển ảnh vào thư mục
    fs.renameSync(image.path, imagePath);

    return `/${type}/${id}/main.jpg`; // Trả về đường dẫn ảnh để lưu vào cơ sở dữ liệu
};

const router = express.Router();

// route for /manager/menu_item/...

router.use((req, res, next) => {
    res.locals.active = 'menu_item'; // Đặt giá trị 'active' mặc định
    next(); // Chuyển sang middleware/route handler tiếp theo
});

router.get('/', async function (req, res) {
    // const branch_id = req.query.accountid || 0;
    const branch_id = 1;
    const list = await menu_itemService.findAll(branch_id);
    res.render('vwManager/menu_item/list', {
        menu_items: list
    });
});

router.get('/add', async function (req, res) {
    const categoryList = await categoryService.findAll();
    res.render('vwManager/menu_item/add', {
        categories: categoryList
    });
});

router.post('/del', async function (req, res) {
    await menu_itemService.del(req.body.menu_item_id);
    res.redirect('/manager/menu_item');
});


router.get('/edit', async function (req, res) {
    const id = +req.query.id || 0;
    const entity = await menu_itemService.findByID(id);
    const categoryList = await categoryService.findAll();

    if (!entity) {
        return res.redirect('/manager/menu_item');
    }

    entity.is_available = entity.is_available && entity.is_available[0] === 1;

    res.render('vwManager/menu_item/edit', {
        categories: categoryList,
        menu_item: entity
    });
});


router.post('/patch', upload.single('image'), async function (req, res) {
    const menu_item_id = req.body.menu_item_id;
    const changes = {
        name: req.body.name,
        description: req.body.description,
        cost_price: req.body.cost_price,
        sale_price: req.body.sale_price,
        category_id: req.body.category_id,
        menu_id: 1,
        is_available: req.body.is_available === 'on',
    };
    await menu_itemService.patch(menu_item_id, changes);

    // Xử lý ảnh tải lên nếu có
    const imagePath = await handleFileUpload(req, 'menu_items', menu_item_id);
    const image = req.file;
    if (image) {
        changes.image_href = imagePath;
        await menu_itemService.patch(menu_item_id, changes);
    }

    res.redirect('/manager/menu_item');
});

router.post('/add', upload.single('image'), async function (req, res) {

    const menu_id = 1;
    const image = req.file; // Ảnh tải lên
    const newMenuItem = {
        name: req.body.name,
        description: req.body.description,
        cost_price: req.body.cost_price,
        sale_price: req.body.sale_price,
        category_id: req.body.category_id,
        menu_id: menu_id,
        is_available: req.body.is_available === 'on',
    };
    const new_menu_item_id = await menu_itemService.add(newMenuItem);

    // Xử lý ảnh tải lên nếu có
    const imagePath = await handleFileUpload(req, 'menu_items', new_menu_item_id);

    if (image) {
        newMenuItem.image_href = imagePath;
        await menu_itemService.patch(new_menu_item_id, newMenuItem);
    }

    res.redirect('/manager/menu_item');
});


export default router;