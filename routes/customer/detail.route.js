import express from 'express';
import detailService from '../../services/customer/detail.service.js';

const router = express.Router();

router.get('/add', async function (req, res) {
    const menu_item_id = +req.query.id || 0;
    const menu_item = await detailService.findByID(menu_item_id);
    const toppingList = await detailService.findToppingByMenuItemID(menu_item_id);
    
    // console.log(menu_item);
    // console.log(toppingList)
    res.render('vwCustomer/detail/add', {
        menu_item: menu_item,
        toppings: toppingList
    });
});



export default router;