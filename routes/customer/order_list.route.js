import express from 'express';
import order_listService from '../../services/customer/order_list.service.js';

const router = express.Router();

router.get('/', async function (req, res) {

    const branch_id = req.session.branchInfo.branch_id;
    const orders = await order_listService.findOrderByBranchID_all(branch_id);

    let total_price = 0;
    for (let i = 0; i < orders.length; i++) {
        if (orders[i].status != "Cancelled") {
            total_price += orders[i].total_price;
        }
    }

    let tax = total_price / 10;
    let total_after_tax = total_price + tax;

    res.render('vwCustomer/order_list', {
        active: 'order_list',
        layout: false,
        orders: orders,
        total_price: total_price,
        tax: tax,
        total_after_tax: total_after_tax,
    });

});

router.post('/payment', async function (req, res) {
    const branch_id = req.session.branchInfo.branch_id;
    const orders = await order_listService.findOrderByBranchID_all(branch_id);

    for (let i = 0; i < orders.length; i++) {
        await order_listService.add_completed_orderStatusHistory( {
            order_id: orders[i].order_id,
            status: "Completed",
            change_date: new Date(),
            reason: ''
        });
        await order_listService.update_status_by_order_id(orders[i].order_id, {status: "Completed"});
    }

});



export default router;