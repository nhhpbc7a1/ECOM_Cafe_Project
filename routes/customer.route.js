import express from 'express';

const router = express.Router();

import menuRouter from './customer/menu.route.js';
router.use('/menu', menuRouter);

router.get('/cart', async function (req, res) {

    res.render('vwCustomer/cart.hbs', {
        layout: false,
    });
});
router.post('/cart', async function (req, res) {
    req
    res.render('vwCustomer/cart.hbs', {
        layout: false,
    });
});


router.get('/confirm_payment', async function (req, res) {

    res.render('vwCustomer/confirm_payment.hbs', {
        layout: false,
    });
});

import detailRouter from './customer/detail.route.js';
router.use('/detail', detailRouter);

import order_listRouter from './customer/order_list.route.js';
router.use('/order_list', order_listRouter);


export default router;
