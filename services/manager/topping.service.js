import db from '../../ultis/db.js';

export default {
    findAll(menu_id) {
        return db('toppings')
            .join('menus', 'toppings.menu_id', 'menus.menu_id')
            .where('menus.menu_id', menu_id)
            .select(
                'toppings.topping_id',
                'toppings.topping_name',
                'toppings.image_href',
                'toppings.cost_price',
                'toppings.sale_price',
                'toppings.is_available'
            );
    },
    findByID(topping_id) {
        return db('toppings')
           .where('topping_id', topping_id)
           .first();
    },
    add(entity) {
        return db('toppings')
           .insert(entity);
    },
    patch(topping_id, entity) {
        return db('toppings')
           .where('topping_id', topping_id)
           .update(entity);
    },
    del(topping_id) {
        return db('toppings').where('topping_id', topping_id).del();
    }
};
