import express from 'express';
import tableManage from '../services/casher/table_manage.service.js';
const router = express.Router();

// /casher/table_manage/

router.get('/', function(req, res) {
    res.redirect('/casher/table_manage');
});

router.get('/table_manage', async function (req, res) {
    const branchId = req.session.branch_id; 
    const areaId = +req.query.areaId || 0; // Lấy id chi nhánh từ query string và ép kiểu sang số
    const tables = await tableManage.findByID(branchId, areaId);
    const areas = await tableManage.findAreasByBranchID(branchId);

    for (let i = 0; i < tables.length; i++) {
        tables[i].is_available = tables[i].is_available && tables[i].is_available[0] === 1;
    }

    // Truyền dữ liệu vào view
    res.render('vwCasher/table_manage', {
        active: 'table_manage',
        layout: 'casher',
        areas: areas,
        activeAreaID: areaId,
        tables: tables,
        empty: tables.length === 0,
        area_id: areaId,
        branch_id: branchId,
    });
});

router.get('/order_manage', async function (req, res) {
    const branch_id = req.session.branchInfo.branch_id;
    const orders = await tableManage.findOrderByBranchID(branch_id);

    let order_id = +req.query.order_id || 0;
    if (orders.length > 0) 
        order_id = order_id != 0 ? order_id : orders[0].order_id;

    const order = await tableManage.findOrderByID(order_id);
    const order_items = await tableManage.findOrderItemsByOrderId(order_id);

    let total_price = 0;
    for (let i = 0; i < order_items.length; i++) {
        total_price += order_items[i].total_price;
    }

    res.render('vwCasher/order_manage', {
        active: 'order_manage',
        active_order: order_id,
        layout: 'casher',
        orders: orders,
        order: order,
        order_items: order_items,
        total_price: total_price
    });

});

router.get('/order_list', async function (req, res) {
    const branch_id = req.session.branchInfo.branch_id;
    const orders = await tableManage.findOrderByBranchID_all(branch_id);

    res.render('vwCasher/order_list', {
        active: 'order_list',
        layout: 'casher',
        orders: orders
    });
});

router.get('/order_detail', async function (req, res) {
    const order_id = +req.query.order_id || 0;
    const order = await tableManage.findOrderByID(order_id);
    const order_items = await tableManage.findOrderItemsByOrderId(order_id);
    const order_status_history = await tableManage.findAllOrderStatusHistory(order_id);

    let total_price = 0;
    for (let i = 0; i < order_items.length; i++) {
        total_price += order_items[i].total_price;
    }

    res.render('vwCasher/order_detail', {
        active: 'order_list',
        layout: 'casher',
        order: order,
        order_items: order_items,
        total_price: total_price,
        order_status_history: order_status_history,
    });
});


router.use(express.json());

router.post('/confirm_order', async function (req, res) {
    const order_id = +req.body.order_id || 0;

    try {
        await tableManage.confirmOrder(order_id);
        res.json({ success: true, message: 'Order confirmed!' }); // Phản hồi khi thành công
    } catch (error) {
        console.error('Error confirming order:', error);
        res.status(500).json({ success: false, message: 'Failed to confirm order.' }); // Phản hồi khi thất bại
    }
})

router.post('/cancel_order', async function (req, res) {
    const order_id = +req.body.order_id || 0;
    const reason = req.body.reason;

    try {
        await tableManage.cancelOrder(order_id, reason);
        res.json({ success: true, message: 'Order canceled!' }); // Phản hồi khi thành công
    } catch (error) {
        console.error('Error confirming order:', error);
        res.status(500).json({ success: false, message: 'Failed to confirm order.' }); // Phản hồi khi thất bại
    }
})


export default router;