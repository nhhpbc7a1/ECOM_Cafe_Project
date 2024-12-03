import express from 'express';

const router = express.Router();

import menuRouter from './customer/menu.route.js';
import createOrderService from '../services/createOrder.service.js'
router.use('/menu', menuRouter);

router.get('/cart', async function (req, res) {

    res.render('vwCustomer/cart.hbs', {
        layout: false,
    });
});
router.post('/cart', async function (req, res) {
    
    if (req.session.cart == undefined) {
        res.status(404);
    }
    const cart = req.session.cart;

    let order = {
        table_id: req.session.table_id,
        order_date: new Date(),
        status: 'Pending',
        total_amount: 50,
    }

    const newOrder_id = await createOrderService.add_order(order);

    for(let item of cart) {
        const order_item = {
            order_id: newOrder_id,
            menu_item_id: item.product_id,
            quantity: item.quantity,
            note: "",
        }
        const newOrder_item_id = await createOrderService.add_order_item(order_item);

        for (let topping of item.toppings) {
            const order_item_topping = {
                order_item_id: newOrder_item_id,
                topping_id: topping.topping_id,
            }
            await createOrderService.add_order_item_topping(order_item_topping);
        }
    }
    console.log("heellasdasdasdasdasd")
    console.log(cart);
    res.render('vwCustomer/cart.hbs', {
        layout: false,
    });
});


router.get('/confirm_payment', async function (req, res) {

    res.render('vwCustomer/confirm_payment.hbs', {
        layout: false,
    });
});

import detailRouter from './customer/detail.route.js';
router.use('/detail', detailRouter);

import order_listRouter from './customer/order_list.route.js';
router.use('/order_list', order_listRouter);


export default router;
