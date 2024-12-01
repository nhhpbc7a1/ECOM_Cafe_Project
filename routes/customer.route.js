import express from 'express';

const router = express.Router();

import menuRouter from './customer/menu.route.js';
router.use('/menu', menuRouter);

router.get('/cart', async function (req, res) {

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

export default router;
