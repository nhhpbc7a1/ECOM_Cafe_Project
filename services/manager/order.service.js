import db from '../../ultis/db.js';

export default {
    findAll(branch_id) {
        return db('orders')
            .join('tables', 'orders.table_id', 'tables.table_id')
            .join('branches', 'branches.branch_id', 'tables.branch_id')
            .where('branches.branch_id', branch_id)
            .select(
                'orders.order_id',
                'orders.table_id',
                'orders.order_date',
                'orders.status',
                'orders.total_amount'
            );
    },
    findByID(order_id) {
        return db('orders')
           .where('order_id', order_id)
           .first();
    },
    add(entity) {
        return db('orders')
           .insert(entity);
    },
    patch(order_id, entity) {
        return db('orders')
           .where('order_id', order_id)
           .update(entity);
    },
    del(order_id) {
        return db('orders').where('order_id', order_id).del();
    }
};
