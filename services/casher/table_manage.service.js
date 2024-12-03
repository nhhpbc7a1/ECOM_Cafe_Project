import db from '../../ultis/db.js';

export default {
    findAll() {
        return db('tables');
    },
    async updateTableIsAvailable(branchId) {
        const tables =await db('tables').where('branch_id', branchId);
        for (const table of tables) {
            // Cập nhật trạng thái của bàn
            const orders = await db('orders').where('orders.table_id', table.table_id).orderBy('order_date', 'desc');
            if (orders.length < 1 || orders[0].status != 'Pending')
                await db('tables').where('table_id', table.table_id).update({ is_available: 0 });
            else
                await db('tables').where('table_id', table.table_id).update({ is_available: 1 });
        }
    },
    async findByID(branchId, areaId) {
        await this.updateTableIsAvailable(branchId);
        if (areaId === 0) {
            return db('tables')
                .where('branch_id', branchId);
        }
        return db('tables')
            .where('branch_id', branchId) // Lọc theo branchId
            .andWhere('area_id', areaId) // Lọc theo areaId
            .select(); // Lấy toàn bộ các cột
    },
    async findOrderByBranchID(branch_id) {

        try {
            // Lấy thông tin đơn hàng từ bảng orders


            const rows = await db('orders as o')
                .join('tables as t', 'o.table_id', 't.table_id')
                .where('t.branch_id', branch_id)
                .andWhereRaw("TRIM(LOWER(o.status)) IN ('pending')")
                .select('o.order_id', 'o.order_date', 'o.status', 'o.total_amount', 't.table_id', 't.table_name')
                .orderBy('o.order_date', 'desc');


            // Lấy order items cho mỗi đơn hàng
            for (let order of rows) {
                // Gọi hàm `findOrderItemsByOrderId` để lấy các order items
                order.orderItems = await this.findOrderItemsByOrderId(order.order_id);

                for (let order_item of order.orderItems) {
                    order_item.toppings = await this.findOrderItemToppingsByOrderItemID(order_item.order_item_id);
                }
    
            }

            return rows;
        } catch (error) {
            console.error('Error executing query:', error);
            throw error;
        }
    },
    async findOrderByBranchID_all(branch_id) {

        try {
            // Lấy thông tin đơn hàng từ bảng orders


            const rows = await db('orders as o')
                .join('tables as t', 'o.table_id', 't.table_id')
                .where('t.branch_id', branch_id)
                .select('o.order_id', 'o.order_date', 'o.status', 'o.total_amount', 't.table_id', 't.table_name')
                .orderBy('o.order_date', 'desc');


            // Lấy order items cho mỗi đơn hàng
            for (let order of rows) {
                // Gọi hàm `findOrderItemsByOrderId` để lấy các order items
                order.orderItems = await this.findOrderItemsByOrderId(order.order_id);

                for (let order_item of order.orderItems) {
                    order_item.toppings = await this.findOrderItemToppingsByOrderItemID(order_item.order_item_id);
                }
    
            }

            return rows;
        } catch (error) {
            console.error('Error executing query:', error);
            throw error;
        }
    },

    findOrderByID(order_id) {
        return db('orders').where('order_id', order_id).first();
    },
    findOrderItemToppingsByOrderItemID(order_item_id) {
        return db('order_item_toppings')
            .join('toppings', 'toppings.topping_id', 'order_item_toppings.topping_id')
            .where('order_item_id', order_item_id);
    },
    async findOrderItemsByOrderId(order_id) {

        try {
            const rows = await db('order_items')
                .join('menu_items', 'order_items.menu_item_id', 'menu_items.menu_item_id')
                .where('order_id', order_id);

            for (let order_item of rows) {
                order_item.total_price = parseFloat(order_item.sale_price) * parseFloat(order_item.quantity);
                order_item.toppings = await this.findOrderItemToppingsByOrderItemID(order_item.order_item_id);
                for (let item of order_item.toppings) {
                    order_item.total_price += parseFloat(item.sale_price);
                }
            }


            return rows; // Trả về kết quả truy vấn
        } catch (error) {
            console.error('Error executing query:', error);
            throw error; // Ném lỗi để xử lý ở nơi gọi
        }
    },
    findAreasByBranchID(branch_id) {
        return db('areas').where('branch_id', branch_id);
    },
    async confirmOrder(order_id) {
        await db('orders').where('order_id', order_id).update({status: 'Verified'});
        await db('order_status_history').insert({status: 'Verified', change_date: new Date, order_id: order_id});
    },
    async cancelOrder(order_id, reason) {
        await db('orders').where('order_id', order_id).update({status: 'Cancelled'});
        await db('order_status_history').insert({status: 'Cancelled', change_date: new Date, order_id: order_id, reason: reason});
    },
    async findAllOrderStatusHistory(order_id) {
        return db('order_status_history').where('order_id', order_id);
    }

};