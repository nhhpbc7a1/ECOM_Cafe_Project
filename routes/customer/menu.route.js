import express from 'express';

const router = express.Router();


router.get('/', function(req, res) {
    res.render('vwCustomer/menu', {
        layout: false,
    });
});
export default router;