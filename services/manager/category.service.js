import db from '../../ultis/db.js';

export default {
    findAll(menu_id) {
        return db('categories')
            .join('menus', 'categories.menu_id', 'menus.menu_id')
            .where('menus.menu_id', menu_id)
            .select(
                'categories.category_id',
                'categories.category_name',
                'categories.image_href',
            );
    },
    findByID(category_id) {
        return db('categories')
           .where('category_id', category_id)
           .first();
    },
    add(entity) {
        return db('categories')
           .insert(entity);
    },
    patch(category_id, entity) {
        return db('categories')
           .where('category_id', category_id)
           .update(entity);
    },
    del(category_id) {
        return db('categories').where('category_id', category_id).del();
    }
};
