import express from 'express';
import service_packageService from '../../services/admin/service_package.service.js';

const router = express.Router();

// route for /admin/service_package/...

router.use((req, res, next) => {
    res.locals.active = 'service_package'; // Đặt giá trị 'active' mặc định
    next(); // Chuyển sang middleware/route handler tiếp theo
});

router.get('/', async function (req, res) {
    const list = await service_packageService.findAll();
    console.log(list);
    res.render('vwAdmin/service_package/list', {
        service_packages: list,
    });
});

router.get('/add', async function (req, res) {
    res.render('vwAdmin/service_package/add');
});

router.post('/del', async function (req, res) {
    await service_packageService.del(req.body.service_package_id);
    res.redirect('/admin/service_package');
});


router.get('/edit', async function (req, res) {
    const id = +req.query.id || 0;
    const entity = await service_packageService.findByID(id);

    if (!entity) {
        return res.redirect('/admin/service_package');
    }
    res.render('vwAdmin/service_package/edit', {
        service_package: entity
    });
});


router.post('/patch', async function (req, res) {
    const entity = {
        service_package_id: req.body.service_package_id,
        day_amount: req.body.day_amount,
        fee_amount: req.body.fee_amount,
    }
    await service_packageService.patch(entity.service_package_id, entity);
    res.redirect('/admin/service_package');
});

router.post('/add', async function (req, res) {
    const entity = {
        day_amount: req.body.day_amount,
        fee_amount: req.body.fee_amount,
    }
    await service_packageService.add(entity);
    res.redirect('/admin/service_package');

});


export default router;