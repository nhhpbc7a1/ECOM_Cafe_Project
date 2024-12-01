import db from '../../ultis/db.js';

export default {
    findByID(id) {
        return db('menu_items')
           .where('menu_item_id', id)
           .first();
    },
    findToppingByMenuItemID(menu_item_id) {
        return db('toppings')
        .join('menu_item_toppings', 'toppings.topping_id', 'menu_item_toppings.topping_id')
        .where('menu_item_toppings.menu_item_id', menu_item_id);
    }
}