import express from 'express';

const router = express.Router();

import menuRouter from './customer/menu.route.js';
import createOrderService from '../services/createOrder.service.js'
router.use('/menu', menuRouter);

router.post('/cart', async function (req, res) {
    if (req.session.cart == undefined) {
        return res.status(404).json({
            message: 'No items in cart',
        });
    }

    const cart = req.session.cart;

    let order = {
        table_id: req.session.table_id,
        order_date: new Date(),
        status: 'Pending',
        total_amount: cart.totalPrice,
    };

    try {
        const newOrder_id = await createOrderService.add_order(order);

        for (let item of cart) {  // Giả sử cart chứa một mảng items
            const order_item = {
                order_id: newOrder_id,
                menu_item_id: item.product_id,
                quantity: item.quantity,
                note: item.note,
            };
            const newOrder_item_id = await createOrderService.add_order_item(order_item);

            if (item.toppingList != undefined) {
                for (let topping of item.toppingList) {
                    const order_item_topping = {
                        order_item_id: newOrder_item_id,
                        topping_id: topping.topping_id,
                    };
                    await createOrderService.add_order_item_topping(order_item_topping);
                }
            }
        }

        await createOrderService.add_order_status_history({
            order_id: newOrder_id,
            status: 'Pending',
            reason: '',
            change_date: new Date(),
        })

        // Trả về JSON response cho AJAX
        res.status(200).json({
            message: 'Order placed successfully',
            orderId: newOrder_id,
        });

    } catch (err) {
        console.error('Error placing order:', err);
        res.status(500).json({
            message: 'An error occurred while processing the order.',
        });
    }
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
