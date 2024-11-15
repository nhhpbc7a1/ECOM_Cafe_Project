import express from 'express';
import tableService from '../../services/manager/table.service.js';

const router = express.Router();

// route for /manager/table/...

router.get('/',async function(req, res) {
    const branch_id = 1;
    const list = await tableService.findTable_ByBranchID(branch_id);
    res.render('vwManager/table/list', {
        tables: list,
    });
});

router.get('/add', async function (req, res) {
    const branch_id = 1;
    const areaList = await tableService.find_branch_areas(branch_id);
    res.render('vwManager/table/add', {
        areas: areaList
    });
});

router.post('/del', async function (req, res) {
    await tableService.del(req.body.table_id);
    res.redirect('/manager/table');
});


router.get('/edit', async function (req, res) {
    const id = +req.query.id || 0;
    const entity = await tableService.findByID(id);
    const categoryList = await categoryService.findAll();

    if (!entity) {
        return res.redirect('/manager/table');
    }

    entity.is_available = entity.is_available && entity.is_available[0] === 1;
    entity.is_spicy = entity.is_spicy && entity.is_spicy[0] === 1;
    entity.has_vegetables = entity.has_vegetables && entity.has_vegetables[0] === 1;

    // console.log(entity);
    res.render('vwManager/table/edit', {
        categories: categoryList,
        table: entity
    });
});


router.post('/patch', async function (req, res) {
    // console.log(req.body);
    const table_id = req.body.table_id;
    const changes = {
        name: req.body.name,
        description: req.body.description,
        cost_price: req.body.cost_price,
        sale_price: req.body.sale_price,
        is_spicy: req.body.is_spicy === 'on',
        has_vegetables: req.body.has_vegetables === 'on',
        category_id: req.body.category_id,
        menu_id: 1,
        is_available: req.body.is_available === 'on',
    };
    // console.log(changes);
    await tableService.patch(table_id, changes);
    res.redirect('/manager/table');
});

router.post('/add', async function (req, res) {
    // console.log(req.body);
    const menu_id = 1;
    const newMenuItem = {
        name: req.body.name,
        description: req.body.description,
        cost_price: req.body.cost_price,
        sale_price: req.body.sale_price,
        is_spicy: req.body.is_spicy === 'on',
        has_vegetables: req.body.has_vegetables === 'on',
        category_id: req.body.category_id,
        menu_id: menu_id,
        is_available: req.body.is_available === 'on',
    }
    await tableService.add(newMenuItem);
    res.redirect('/manager/table');
});

router.get('/generate_qr_code',async function(req, res) {
    const qrcode = await tableService.generateQRCode();
    res.json({qrcode: qrcode});
});


export default router;