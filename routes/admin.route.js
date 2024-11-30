import express from 'express';
const router = express.Router();

// route for /manager/...

// Middleware để đặt layout mặc định là 'manager'
router.use((req, res, next) => {
    res.locals.layout = 'admin';
    next();
});

router.get('/', function(req, res) {
    res.render('vwManager/dashboard', {
        // layout: false,
        active: "dashboard",
        user: req.user // Truyền thông tin user từ token vào view nếu cần
    });
});

import managerRouter from './admin/manager.route.js';
router.use('/manager', managerRouter);

import service_packageRouter from './admin/service_package.route.js';
router.use('/service_package', service_packageRouter);

import service_package_paymentRouter from './admin/service_package_payment.route.js';
router.use('/service_package_payment', service_package_paymentRouter);

import hub_infoRouter from './admin/hub_info.route.js';
router.use('/hub_info', hub_infoRouter);

export default router;