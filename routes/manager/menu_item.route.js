import express from 'express';
import menu_itemService from '../../services/menu_item.service.js';

const router = express.Router();


router.get('/',async function(req, res) {
    // const branch_id = req.query.accountid || 0;
    const branch_id = 1;
    const list = await menu_itemService.findAll(branch_id);
    res.render('vwManager/menu_item/list', {
        menu_items: list
    });
});

router.get('/add', async function(req, res) {
    res.render('vwManager/menu_item/add');
});

export default router;