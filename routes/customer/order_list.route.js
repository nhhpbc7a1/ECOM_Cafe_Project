import express from 'express';
import order_listService from '../../services/customer/order_list.service.js';

const router = express.Router();

router.get('/', async function (req, res) {

    const branch_id = req.session.branchInfo.branch_id;
    const orders = await order_listService.findOrderByBranchID_all(branch_id);

    let total_price = 0;
    for (let i = 0; i < orders.length; i++) {
        total_price += orders[i].total_price;
    }

    res.render('vwCustomer/order_list', {
        active: 'order_list',
        layout: false,
        orders: orders,
        total_price: total_price,
    });

});

export default router;