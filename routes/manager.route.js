import express from 'express';
import menu_itemService from '../services/menu_item.service.js';

const router = express.Router();

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

export default router;