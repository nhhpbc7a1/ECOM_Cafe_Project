import express from 'express';

const router = express.Router();

router.get('/menu',async function(req, res) {
    const qr_code = req.query.qr_code || 0;
    
    res.render('vwCustomer/menu.hbs', {
        layout:false,
        qr_code: qr_code
    });
});

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
