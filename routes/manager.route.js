import express from 'express';
const router = express.Router();

// route for /manager/...

// Middleware để đặt layout mặc định là 'manager'
router.use((req, res, next) => {
    res.locals.layout = 'manager';
    next();
});

router.get('/', function(req, res) {
    res.render('vwManager/dashboard', {
        // layout: false,
        active: "dashboard",
        user: req.user // Truyền thông tin user từ token vào view nếu cần
    });
});


import branch_infoRouter from './manager/branch_info.route.js';
router.use('/branch_info', branch_infoRouter);

import menu_itemRouter from './manager/menu_item.route.js';
router.use('/menu_item', menu_itemRouter);

import categoryRouter from './manager/category.route.js';
router.use('/category', categoryRouter);

import toppingRouter from './manager/topping.route.js';
router.use('/topping', toppingRouter);

import tableRouter from './manager/table.route.js';
router.use('/table', tableRouter);

import orderRouter from './manager/order.route.js';
router.use('/order', orderRouter);

import employeeRouter from './manager/employee.route.js';
router.use('/employee', employeeRouter);


export default router;