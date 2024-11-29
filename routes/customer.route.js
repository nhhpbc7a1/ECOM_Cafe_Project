import express from 'express';

const router = express.Router();

import menuRouter from './customer/menu.route.js';
router.use('/menu', menuRouter);

router.get('/cart',async function(req, res) {
    
    res.render('vwCustomer/cart.hbs', {
        layout:false,
    });
});

router.get('/confirm_payment',async function(req, res) {
    
    res.render('vwCustomer/confirm_payment.hbs', {
        layout:false,
    });
});


export default router;
