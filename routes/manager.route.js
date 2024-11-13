import express from 'express';

const router = express.Router();

// route for /manager/...

import loginRouter from './manager/login.route.js';
router.use('/login', loginRouter);

import signupRouter from './manager/signup.route.js'
router.use('/signup', signupRouter);

import branch_infoRouter from './manager/branch_info.route.js'
router.use('/branch_info', branch_infoRouter);


// Middleware để đặt layout mặc định là 'manager'
router.use((req, res, next) => {
    res.locals.layout = 'manager';
    next();
});

router.get('/', function(req, res) {
    res.render('vwManager/dashboard',);
});

import menu_itemRouter from './manager/menu_item.route.js'
router.use('/menu_item', menu_itemRouter);

import tableRouter from './manager/table.route.js'
router.use('/table', tableRouter);

export default router;