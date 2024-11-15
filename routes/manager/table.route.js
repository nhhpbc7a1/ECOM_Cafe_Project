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
    const branch_id = 1;
    const id = +req.query.id || 0;
    const entity = await tableService.findByID(id);
    const areaList = await tableService.find_branch_areas(branch_id);

    if (!entity) {
        return res.redirect('/manager/table');
    }

    entity.is_available = entity.is_available && entity.is_available[0] === 1;
    console.log(entity);
    res.render('vwManager/table/edit', {
        areas: areaList,
        table: entity
    });
});


router.post('/patch', async function (req, res) {
    // console.log(req.body);
    const table_id = req.body.table_id;
    const changes = {
        table_id: req.body.table_id,
        branch_id: req.body.branch_id,
        area_id: req.body.area_id,
        table_name: req.body.table_name,
        qr_code: req.body.qr_code,
        is_available: req.body.is_available === 'on',
    };
    // console.log(changes);
    await tableService.patch(table_id, changes);
    res.redirect('/manager/table');
});

router.post('/add', async function (req, res) {
    const branch_id = 1;
    const newTable = {
        branch_id: branch_id,
        area_id: req.body.area_id,
        table_name: req.body.table_name,
        qr_code: req.body.qr_code,
        is_available: req.body.is_available === 'on',
    }
    await tableService.add(newTable);
    console.log(req.body);
    res.redirect('/manager/table');
});

router.get('/generate_qr_code',async function(req, res) {
    const qrcode = await tableService.generateQRCode();
    res.json({qrcode: 'http://localhost:3000/qr_code/'+qrcode});
});


export default router;