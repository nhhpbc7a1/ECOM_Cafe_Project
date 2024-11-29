import express from 'express';
import orderService from '../../services/manager/order.service.js';

const router = express.Router();

// route for /manager/order/...

router.use((req, res, next) => {
    res.locals.active = 'order'; // Đặt giá trị 'active' mặc định
    next(); // Chuyển sang middleware/route handler tiếp theo
});

router.get('/', async function (req, res) {
    const menu_id = 1;
    const list = await orderService.findAll(menu_id);
    console.log(list);
    // return;
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

    console.log(entity);

    // return;
    res.render('vwManager/order/detail', {
        entity: entity
    });
});




export default router;