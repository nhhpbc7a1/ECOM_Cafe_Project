import db from '../../ultis/db.js';

export default {
    findAll(branch_id) {
        return db('orders')
            .join('tables', 'orders.table_id', 'tables.table_id')
            .join('branches', 'branches.branch_id', 'tables.branch_id')
            .where('branches.branch_id', branch_id)
            .select(
                'orders.order_id',
                'tables.table_name',
                'orders.order_date',
                'orders.status',
                'orders.total_amount'
            );
    },
    async getOrderById(orderId) {
        return await db('orders')
            .select('*')
            .where('order_id', orderId)
            .first(); // Lấy 1 dòng kết quả
    },
    async getOrderItemsByOrderId(orderId) {
        return await db('order_items')
            .join('menu_items', 'menu_items.menu_item_id', 'order_items.menu_item_id')
            .select('*')
            .where('order_id', orderId);
    },

    async getOrderItemToppingsByOrderId(orderId) {
        // Lấy danh sách order_item_id từ order_items trước
        const orderItems = await db('order_items')
            .select('order_item_id')
            .where('order_id', orderId);

        const orderItemIds = orderItems.map(item => item.order_item_id);

        // Lấy topping dựa vào order_item_id
        return await db('order_item_toppings')
            .join('toppings', 'toppings.topping_id', 'order_item_toppings.topping_id')
            .select('*')
            .whereIn('order_item_id', orderItemIds);
    },

    async getOrderStatusHistoryByOrderId(orderId) {
        return await db('order_status_history')
            .select('*')
            .where('order_id', orderId);
    },

    async getOrderPaymentsByOrderId(orderId) {
        return await db('order_payments')
            .select('*')
            .where('order_id', orderId);
    },

    async getFullOrderDetails(orderId) {
        const order = await this.getOrderById(orderId);
        if (!order) {
            throw new Error(`Order with ID ${orderId} not found.`);
        }

        const order_items = await this.getOrderItemsByOrderId(orderId);
        const order_item_toppings = await this.getOrderItemToppingsByOrderId(orderId);
        const order_status_history = await this.getOrderStatusHistoryByOrderId(orderId);
        const order_payments = await this.getOrderPaymentsByOrderId(orderId);

        return {
            order,
            order_items,
            order_item_toppings,
            order_status_history,
            order_payments,
        };
    }
};
