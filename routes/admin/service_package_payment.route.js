import express from 'express';
import service_package_paymentService from '../../services/admin/service_package_payment.service.js';

const router = express.Router();

// route for /admin/service_package_payment/...

router.use((req, res, next) => {
    res.locals.active = 'service_package_payment'; // Đặt giá trị 'active' mặc định
    next(); // Chuyển sang middleware/route handler tiếp theo
});

router.get('/', async function (req, res) {
    const list = await service_package_paymentService.findAll();
    console.log(list);
    res.render('vwAdmin/service_package_payment/list', {
        service_package_payments: list,
    });
});

router.get('/add', async function (req, res) {
    res.render('vwAdmin/service_package_payment/add');
});

router.post('/del', async function (req, res) {
    await service_package_paymentService.del(req.body.service_package_payment_id);
    res.redirect('/admin/service_package_payment');
});


router.get('/edit', async function (req, res) {
    const id = +req.query.id || 0;
    const entity = await service_package_paymentService.findByID(id);

    if (!entity) {
        return res.redirect('/admin/service_package_payment');
    }
    res.render('vwAdmin/service_package_payment/edit', {
        service_package_payment: entity
    });
});


router.post('/patch', async function (req, res) {
    const entity = {
        service_package_payment_id: req.body.service_package_payment_id,
        branch_id: req.body.branch_id,
        service_package_id: req.body.service_package_id,
        date_bought: new Date(),
    }
    await service_package_paymentService.patch(entity.service_package_payment_id, entity);
    res.redirect('/admin/service_package_payment');
});

router.post('/add', async function (req, res) {
    const entity = {
        branch_id: req.body.branch_id,
        service_package_id: req.body.service_package_id,
        date_bought: new Date(),
    }
    await service_package_paymentService.add(entity);
    res.redirect('/admin/service_package_payment');

});


export default router;