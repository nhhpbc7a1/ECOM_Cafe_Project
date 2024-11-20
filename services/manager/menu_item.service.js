import db from '../../ultis/db.js';

export default {
    findAll(branch_id) {
        return db('menu_items')
            .join('menus', 'menu_items.menu_id', 'menus.menu_id')
            .join('branches', 'menus.branch_id', 'branches.branch_id')
            .where('branches.branch_id', branch_id)
            .select(
                'menu_items.menu_item_id',
                'menu_items.name',
                'menu_items.description',
                'menu_items.image_href',
                'menu_items.cost_price',
                'menu_items.sale_price',
                'menu_items.is_available',
            );
    },
    findByID(id) {
        return db('menu_items')
           .where('menu_item_id', id)
           .first();
    },
    add(entity) {
        return db('menu_items')
           .insert(entity);
    },
    patch(menu_item_id, entity) {
        return db('menu_items')
           .where('menu_item_id', menu_item_id)
           .update(entity);
    },
    del(menu_item_id) {
        return db('menu_items').where('menu_item_id', menu_item_id).del();
    }
}