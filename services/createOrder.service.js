import db from '../ultis/db.js';

export default {
    async add_order(entity) {
        await db('orders').insert(entity);
        const result = await db('orders')
            .max('order_id as id')
            .first();
        return result.id;  // Trả về order_id của đơn hàng mới
    },

    async add_order_item(entity) {
        await db('order_items').insert(entity);
        const result = await db('order_items')
            .max('order_item_id as id')
            .first();
        return result.id;  // Trả về order_item_id của mục đơn hàng mới
    },

    async add_order_item_topping(entity) {
        await db('order_item_toppings').insert(entity);
        const result = await db('order_item_toppings')
            .max('order_item_topping_id as id')
            .first();
        return result.id;  // Trả về order_item_topping_id của topping mới
    },
    add_order_status_history(entity) {
        return db('order_status_history').insert(entity);
    }
}
