import express from 'express';

const router = express.Router();

// /casher/table_manage/

router.get('/', function(req, res) {
    res.render('vwCasher/table_manage', {layout: false});
});


export default router;