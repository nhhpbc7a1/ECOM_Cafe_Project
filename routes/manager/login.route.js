import express from 'express';

const router = express.Router();

router.get('/', function(req, res) {
    res.render('vwManager/login', {
        layout: false,
    });
});

export default router;