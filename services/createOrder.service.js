import db from '../ultis/db.js';

export default {
    add_order(entity) {
        return db('orders')
            .insert(entity)
            .returning('order_id') 
            .then(([id]) => id);   
    },
    add_order_item(entity) {
        return db('order_items')
            .insert(entity)
            .returning('order_item_id') // Trả về giá trị của cột tự đ��ng tăng
            .then(([id]) => id);   // Lấy giá trị đầu tiên từ kết quả trả về
    },
    add_order_item_topping(entity) {
        return db('order_item_toppings')
            .insert(entity)
            .returning('order_item_topping_id') // Trả về giá trị của cột tự đ��ng tăng
            .then(([id]) => id);   // Lấy giá trị đầu tiên từ kết quả trả về
    }
}