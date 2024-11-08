import express from 'express';
import menu_itemService from '../services/menu_item.service.js';

const router = express.Router();

router.get('/login', function(req, res) {
    res.render('vwManager/login',)
});

router.get('/signup', function(req, res) {
    res.render('vwManager/signup',)
});


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