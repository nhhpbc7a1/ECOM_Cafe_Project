import db from '../../ultis/db.js';

export default {
    findAll() {
        return db('tables');
    },
    findByID(branchId, areaId) {
        if (areaId === 0) {

            return db('tables')
                .where('branch_id', branchId);
            // .where('is_available', true);
        }
        // return [
        //     {
        //         table_id: 1,
        //         branch_id: 1,
        //         area_id: 1,
        //         table_name: 'Table 1',
        //         qr_code: 'http://10.0.41.45:3000/customer/menu?qr_code=XldrwQLOdm',
        //         is_available: true
        //     },
        //     {
        //         table_id: 1,
        //         branch_id: 1,
        //         area_id: 1,
        //         table_name: 'Table 1',
        //         qr_code: 'http://10.0.41.45:3000/customer/menu?qr_code=XldrwQLOdm',
        //         is_available: true
        //     },
        //     {
        //         table_id: 1,
        //         branch_id: 1,
        //         area_id: 1,
        //         table_name: 'Table 1',
        //         qr_code: 'http://10.0.41.45:3000/customer/menu?qr_code=XldrwQLOdm',
        //         is_available: true
        //     },
        //     {
        //         table_id: 1,
        //         branch_id: 1,
        //         area_id: 1,
        //         table_name: 'Table 1',
        //         qr_code: 'http://10.0.41.45:3000/customer/menu?qr_code=XldrwQLOdm',
        //         is_available: true
        //     },
        //     {
        //         table_id: 1,
        //         branch_id: 1,
        //         area_id: 1,
        //         table_name: 'Table 1',
        //         qr_code: 'http://10.0.41.45:3000/customer/menu?qr_code=XldrwQLOdm',
        //         is_available: true
        //     },
        //     {
        //         table_id: 1,
        //         branch_id: 1,
        //         area_id: 1,
        //         table_name: 'Table 1',
        //         qr_code: 'http://10.0.41.45:3000/customer/menu?qr_code=XldrwQLOdm',
        //         is_available: true
        //     },
        //     {
        //         table_id: 1,
        //         branch_id: 1,
        //         area_id: 1,
        //         table_name: 'Table 1',
        //         qr_code: 'http://10.0.41.45:3000/customer/menu?qr_code=XldrwQLOdm',
        //         is_available: true
        //     },
        //     {
        //         table_id: 1,
        //         branch_id: 1,
        //         area_id: 1,
        //         table_name: 'Table 1',
        //         qr_code: 'http://10.0.41.45:3000/customer/menu?qr_code=XldrwQLOdm',
        //         is_available: true
        //     },
        //     {
        //         table_id: 1,
        //         branch_id: 1,
        //         area_id: 1,
        //         table_name: 'Table 1',
        //         qr_code: 'http://10.0.41.45:3000/customer/menu?qr_code=XldrwQLOdm',
        //         is_available: true
        //     },
        //     {
        //         table_id: 1,
        //         branch_id: 1,
        //         area_id: 1,
        //         table_name: 'Table 1',
        //         qr_code: 'http://10.0.41.45:3000/customer/menu?qr_code=XldrwQLOdm',
        //         is_available: true
        //     },
        //     {
        //         table_id: 1,
        //         branch_id: 1,
        //         area_id: 1,
        //         table_name: 'Table 1',
        //         qr_code: 'http://10.0.41.45:3000/customer/menu?qr_code=XldrwQLOdm',
        //         is_available: true
        //     },
        //     {
        //         table_id: 1,
        //         branch_id: 1,
        //         area_id: 1,
        //         table_name: 'Table 1',
        //         qr_code: 'http://10.0.41.45:3000/customer/menu?qr_code=XldrwQLOdm',
        //         is_available: true
        //     },
        //     {
        //         table_id: 1,
        //         branch_id: 1,
        //         area_id: 1,
        //         table_name: 'Table 1',
        //         qr_code: 'http://10.0.41.45:3000/customer/menu?qr_code=XldrwQLOdm',
        //         is_available: true
        //     },
        //     {
        //         table_id: 1,
        //         branch_id: 1,
        //         area_id: 1,
        //         table_name: 'Table 1',
        //         qr_code: 'http://10.0.41.45:3000/customer/menu?qr_code=XldrwQLOdm',
        //         is_available: true
        //     },
        //     {
        //         table_id: 1,
        //         branch_id: 1,
        //         area_id: 1,
        //         table_name: 'Table 1',
        //         qr_code: 'http://10.0.41.45:3000/customer/menu?qr_code=XldrwQLOdm',
        //         is_available: true
        //     },
        //     {
        //         table_id: 1,
        //         branch_id: 1,
        //         area_id: 1,
        //         table_name: 'Table 1',
        //         qr_code: 'http://10.0.41.45:3000/customer/menu?qr_code=XldrwQLOdm',
        //         is_available: true
        //     },
        //     {
        //         table_id: 1,
        //         branch_id: 1,
        //         area_id: 1,
        //         table_name: 'Table 1',
        //         qr_code: 'http://10.0.41.45:3000/customer/menu?qr_code=XldrwQLOdm',
        //         is_available: true
        //     },
        //     {
        //         table_id: 1,
        //         branch_id: 1,
        //         area_id: 1,
        //         table_name: 'Table 1',
        //         qr_code: 'http://10.0.41.45:3000/customer/menu?qr_code=XldrwQLOdm',
        //         is_available: true
        //     },
        //     {
        //         table_id: 1,
        //         branch_id: 1,
        //         area_id: 1,
        //         table_name: 'Table 1',
        //         qr_code: 'http://10.0.41.45:3000/customer/menu?qr_code=XldrwQLOdm',
        //         is_available: true
        //     },
        //     {
        //         table_id: 1,
        //         branch_id: 1,
        //         area_id: 1,
        //         table_name: 'Table 1',
        //         qr_code: 'http://10.0.41.45:3000/customer/menu?qr_code=XldrwQLOdm',
        //         is_available: true
        //     },
        //     {
        //         table_id: 1,
        //         branch_id: 1,
        //         area_id: 1,
        //         table_name: 'Table 1',
        //         qr_code: 'http://10.0.41.45:3000/customer/menu?qr_code=XldrwQLOdm',
        //         is_available: true
        //     },
        //     {
        //         table_id: 1,
        //         branch_id: 1,
        //         area_id: 1,
        //         table_name: 'Table 1',
        //         qr_code: 'http://10.0.41.45:3000/customer/menu?qr_code=XldrwQLOdm',
        //         is_available: true
        //     },
        //     {
        //         table_id: 1,
        //         branch_id: 1,
        //         area_id: 1,
        //         table_name: 'Table 1',
        //         qr_code: 'http://10.0.41.45:3000/customer/menu?qr_code=XldrwQLOdm',
        //         is_available: true
        //     },
        //     {
        //         table_id: 1,
        //         branch_id: 1,
        //         area_id: 1,
        //         table_name: 'Table 1',
        //         qr_code: 'http://10.0.41.45:3000/customer/menu?qr_code=XldrwQLOdm',
        //         is_available: true
        //     },
        // ]

        return db('tables')
            .where('branch_id', branchId) // Lọc theo branchId
            .andWhere('area_id', areaId) // Lọc theo areaId
            .select(); // Lấy toàn bộ các cột
    },
    async findOrdersWithTablesByBranch(branch_id, table_id) {
        // return db('orders');

        try {
            // Lấy thông tin đơn hàng từ bảng orders
            /*
            const rows = await db('orders as o')
                .join('tables as t', 'o.table_id', 't.table_id')
                .where('t.branch_id', branch_id)
                .andWhere('t.table_id', table_id)
                .andWhereRaw("TRIM(LOWER(o.status)) IN ('pending', 'verified')")
                .select('o.order_id', 'o.order_date', 'o.status', 'o.total_amount', 't.table_id', 't.table_name')
                .orderBy('o.order_date', 'desc');
            */
            const rows = await db('orders');

            // Lấy order items cho mỗi đơn hàng
            for (let order of rows) {
                // Gọi hàm `findOrderItemsByOrderId` để lấy các order items
                order.orderItems = await this.findOrderItemsByOrderId(order.order_id);
            }

            return rows;
        } catch (error) {
            console.error('Error executing query:', error);
            throw error;
        }
    },


    async findOrderItemsByOrderId(order_id) {
        // return db('order_items');

        try {
            // Sử dụng Knex để thực hiện truy vấn
            const rows = await db('order_items as oit')
                .join('menu_items as mi', 'oit.menu_item_id', 'mi.menu_item_id')
                .leftJoin('menu_item_toppings as mit', 'mi.menu_item_id', 'mit.menu_item_id')
                .leftJoin('toppings as top', 'mit.topping_id', 'top.topping_id')
                .leftJoin('order_item_toppings as oitop', function () {
                    this.on('oit.order_item_id', '=', 'oitop.order_item_id')
                        .andOn('oitop.topping_id', '=', 'top.topping_id');
                })
                .where('oit.order_id', order_id) // Lọc theo order_id
                .select(
                    'oit.order_item_id',
                    'mi.menu_item_id',
                    'mi.name AS menu_item_name',
                    'mi.description AS menu_item_description',
                    'mi.sale_price AS menu_item_sale_price',
                    'oit.quantity AS order_item_quantity',
                    'oit.note AS order_item_note',
                    'top.topping_id',
                    'top.topping_name',
                    'top.sale_price AS topping_sale_price',
                    'oitop.quantity AS topping_quantity'
                )
                .orderBy('oit.order_item_id', 'asc'); // Sắp xếp theo order_item_id

            return rows; // Trả về kết quả truy vấn
        } catch (error) {
            console.error('Error executing query:', error);
            throw error; // Ném lỗi để xử lý ở nơi gọi
        }
    },
    findAreasByBranchID(branch_id) {
        return db('areas').where('branch_id', branch_id);
    }




};