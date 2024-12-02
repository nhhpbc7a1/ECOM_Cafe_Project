import express from 'express';
import areaService from '../../services/manager/area.service.js';

const router = express.Router();

// route for /manager/area/...

router.use((req, res, next) => {
    res.locals.active = 'area'; // Đặt giá trị 'active' mặc định
    next(); // Chuyển sang middleware/route handler tiếp theo
});


router.get('/', async function (req, res) {
    const branch_id = req.session.branchInfo.branch_id;
    const list = await areaService.findByBranchID(branch_id);
    console.log(list);
    res.render('vwManager/area/list', {
        areas: list
    });
});

router.get('/add', async function (req, res) {
    res.render('vwManager/area/add');
});

router.post('/del', async function (req, res) {
    await areaService.del(req.body.area_id);
    res.redirect('/manager/area');
    
});


router.get('/edit', async function (req, res) {
    const id = +req.query.id || 0;
    const entity = await areaService.findByID(id);

    if (!entity) {
        return res.redirect('/manager/area');
    }

    res.render('vwManager/area/edit', {
        area: entity
    });
});


router.post('/patch', async function (req, res) {
    const area_id = req.body.area_id;

    const changes = {
        name: req.body.name, 
    };

    await areaService.patch(area_id, changes);
        
    res.redirect('/manager/area');
});

router.post('/add', async function (req, res) {
    const branch_id = req.session.branchInfo.branch_id;
    const newarea = {
        name: req.body.name,
        branch_id: branch_id,
    };
    await areaService.add(newarea);

    res.redirect('/manager/area');
});


export default router;