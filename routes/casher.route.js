import express from 'express';
import tableManage from '../services/casher/table_manage.service.js';
const router = express.Router();

// /casher/table_manage/
router.get('/table_manage', async function (req, res) {
    // const branchId = req.session.branch_id; 
    const branchId = 1; 
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
    // const branchId = req.session.branch_id; 
    const branchId = 1; 
    // const tableId = req.query.table_id;
    const tableId = 1;
    const orders = await tableManage.findOrdersWithTablesByBranch(branchId, tableId);
    const orderId = 2;//+req.query.areaId || 0;

    const orderItems = await tableManage.findOrderItemsByOrderId(orderId);
    for (let i = 0; i < orderItems.length; i++) {
        console.log(orderItems[i]);
         
    }
    
    // Truyền dữ liệu vào view
    res.render('vwCasher/order_manage', {
        active: 'order_manage',
        layout: 'casher',
        orders: orders,
        branch_id: branchId,
        table_id: tableId,
        orderItems: orderItems
    });
});


export default router;