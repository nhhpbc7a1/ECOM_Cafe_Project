import express from 'express';
import categoryService from '../../services/manager/category.service.js';
import multer from 'multer';
import handleFileUpload from '../../services/handleFileUpload.service.js';
const upload = multer({ dest: 'public/images/uploads/' });

const router = express.Router();

// route for /manager/category/...

router.use((req, res, next) => {
    res.locals.active = 'category'; // Đặt giá trị 'active' mặc định
    next(); // Chuyển sang middleware/route handler tiếp theo
});


router.get('/', async function (req, res) {
    const branch_id = req.session.branchInfo.branch_id;
    const list = await categoryService.findByBranchID(branch_id);
    res.render('vwManager/category/list', {
        categories: list
    });
});

router.get('/add', async function (req, res) {
    res.render('vwManager/category/add');
});

router.post('/del', upload.single('image'), async function (req, res) {
    await categoryService.del(req.body.category_id);
    res.redirect('/manager/category');
    
});


router.get('/edit', async function (req, res) {
    const id = +req.query.id || 0;
    const entity = await categoryService.findByID(id);

    if (!entity) {
        return res.redirect('/manager/category');
    }

    res.render('vwManager/category/edit', {
        category: entity
    });
});


router.post('/patch', upload.single('image'), async function (req, res) {
    // Lấy `category_id` từ request
    const category_id = req.body.category_id;

    // Tạo object `changes` chứa các trường cần cập nhật
    const changes = {
        category_name: req.body.category_name, // Tên category
        image_href: req.body.image_href, // Đường dẫn hình ảnh
    };

    // Gọi service để cập nhật dữ liệu
    await categoryService.patch(category_id, changes);
    
    const imagePath = await handleFileUpload(req, 'categories', category_id);
    const image = req.file;
    if (image) {
        changes.image_href = imagePath;
        await categoryService.patch(category_id, changes);
    }
    
    // Chuyển hướng về trang quản lý category
    res.redirect('/manager/category');
});

router.post('/add', upload.single('image'), async function (req, res) {
    const menu_id = 1;
    const newCategory = {
        category_name: req.body.category_name, // Tên category
        image_href: req.body.image_href, // Đường dẫn hình ảnh
        menu_id: menu_id, // ID của menu
    };
    const newCategory_id = await categoryService.add(newCategory);

    const imagePath = await handleFileUpload(req, 'categories', newCategory_id);
    const image = req.file;
    if (image) {
        newCategory.image_href = imagePath;
        await categoryService.patch(newCategory_id, newCategory);
    }

    res.redirect('/manager/category');
});


export default router;