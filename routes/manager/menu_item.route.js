import express from 'express';
import menu_itemService from '../../services/manager/menu_item.service.js';
import categoryService from '../../services/category.service.js';

import multer from 'multer';
import handleFileUpload from '../../services/handleFileUpload.service.js';
const upload = multer({ dest: 'public/images/uploads/' });

const router = express.Router();

// route for /manager/menu_item/...

router.use((req, res, next) => {
    res.locals.active = 'menu_item'; // Đặt giá trị 'active' mặc định
    next(); // Chuyển sang middleware/route handler tiếp theo
});

router.get('/', async function (req, res) {
    // const branch_id = req.query.accountid || 0;
    const branch_id = req.session.branchInfo.branch_id;
    const list = await menu_itemService.findAll(branch_id);
    res.render('vwManager/menu_item/list', {
        menu_items: list
    });
});

router.get('/add', async function (req, res) {
    const branch_id = req.session.branchInfo.branch_id;
    const categoryList = await categoryService.findByBranchID(branch_id);
    const toppingList = await menu_itemService.findToppingByBranchId(branch_id);
    // console.log(toppingList);
    res.render('vwManager/menu_item/add', {
        categories: categoryList,
        toppings: toppingList
    });
});

router.post('/del', upload.single('image'), async function (req, res) {
    await menu_itemService.del(req.body.menu_item_id);
    res.redirect('/manager/menu_item');
});


router.get('/edit', async function (req, res) {
    const id = +req.query.id || 0;
    const entity = await menu_itemService.findByID(id);
    const branch_id = req.session.branchInfo.branch_id;
    const categoryList = await categoryService.findByBranchID(branch_id);
    const toppingList = await menu_itemService.findToppingByBranchId(branch_id);
    const old_toppingList = await menu_itemService.findToppingsByMenuItemID(id);

    if (!entity) {
        return res.redirect('/manager/menu_item');
    }
    entity.is_available = entity.is_available && entity.is_available[0] === 1;

    res.render('vwManager/menu_item/edit', {
        categories: categoryList,
        toppings: toppingList,
        menu_item: entity,
        old_toppingList: old_toppingList,
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

    const toppings = req.body.toppings || [];

    if (toppings.length > 0) {
        await menu_itemService.updateToppingsToMenuItem(menu_item_id, toppings);
    }

    res.redirect('/manager/menu_item');
});

router.post('/add', upload.single('image'), async function (req, res) {

    
    const menu_id = req.session.branchInfo.menu_id;
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

    const toppings = req.body.toppings || [];
    if (toppings.length > 0) {
        await menu_itemService.updateToppingsToMenuItem(new_menu_item_id, toppings);
    }

    res.redirect('/manager/menu_item');
});


export default router;