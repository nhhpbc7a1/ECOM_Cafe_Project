import express from 'express';
import tableService from '../../services/manager/table.service.js';

const router = express.Router();

// route for /manager/table/...

router.use((req, res, next) => {
    res.locals.active = 'table'; // Đặt giá trị 'active' mặc định
    next(); // Chuyển sang middleware/route handler tiếp theo
});

router.get('/',async function(req, res) {
    const branch_id = req.session.branchInfo.branch_id;
    const list = await tableService.findTable_ByBranchID(branch_id);
    res.render('vwManager/table/list', {
        tables: list,
    });
});

router.get('/add', async function (req, res) {
    const branch_id = req.session.branchInfo.branch_id;
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
    const branch_id = req.session.branchInfo.branch_id;
    const id = +req.query.id || 0;
    const entity = await tableService.findByID(id);
    const areaList = await tableService.find_branch_areas(branch_id);

    if (!entity) {
        return res.redirect('/manager/table');
    }

    entity.is_available = entity.is_available && entity.is_available[0] === 1;
    res.render('vwManager/table/edit', {
        areas: areaList,
        table: entity
    });
});


router.post('/patch', async function (req, res) {
    const table_id = req.body.table_id;
    const changes = {
        table_id: req.body.table_id,
        branch_id: req.body.branch_id,
        area_id: req.body.area_id,
        table_name: req.body.table_name,
        qr_code: req.body.qr_code,
        is_available: req.body.is_available === 'on',
    };
    await tableService.patch(table_id, changes);
    res.redirect('/manager/table');
});

router.post('/add', async function (req, res) {
    const branch_id = req.session.branchInfo.branch_id;
    const newTable = {
        branch_id: branch_id,
        area_id: req.body.area_id,
        table_name: req.body.table_name,
        qr_code: req.body.qr_code,
        is_available: req.body.is_available === 'on',
    }
    await tableService.add(newTable);
    res.redirect('/manager/table');
});

router.get('/generate_qr_code',async function(req, res) {
    const ipserver = '192.168.31.146:3000';
    const url = 'http://' + ipserver + '/customer/menu?qr_code=';

    const qrcode = await tableService.generateQRCode();
    res.json({qrcode: url+qrcode});
});


export default router;