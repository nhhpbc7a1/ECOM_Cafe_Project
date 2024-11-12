import express from 'express';

const router = express.Router();

router.get('/', function(req, res) {
    res.render('vwManager/signup', {
        layout: false,
    });
});

export default router;
