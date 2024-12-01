import express from 'express';
import orderService from '../../services/manager/order.service.js';

const router = express.Router();

// route for /manager/order/...

router.use((req, res, next) => {
    res.locals.active = 'order'; // Đặt giá trị 'active' mặc định
    next(); // Chuyển sang middleware/route handler tiếp theo
});

router.get('/', async function (req, res) {
    const branch_id = req.session.branchInfo.branch_id;
    const list = await orderService.findAll(branch_id);
    res.render('vwManager/order/list', {
        orders: list
    });
});


router.get('/detail', async function (req, res) {
    const id = +req.query.id || 0;
    const entity = await orderService.getFullOrderDetails(id);

    if (!entity) {
        return res.redirect('/manager/order');
    }

    res.render('vwManager/order/detail', {
        entity: entity
    });
});




export default router;