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
            .insert(entity)
            .then(() => {
                return db('menu_items')
                    .max('menu_item_id as id')
                    .first();
            })
            .then(result => {
                return result.id;  // Trả về menu_item_id của bản ghi mới
            });
    },
    patch(menu_item_id, entity) {
        return db('menu_items')
            .where('menu_item_id', menu_item_id)
            .update(entity);
    },
    del(menu_item_id) {
        return db('menu_items').where('menu_item_id', menu_item_id).del();
    },
    findToppingByBranchId(branch_id) {        
        return db('toppings')
           .join('menus','toppings.menu_id','menus.menu_id')
           .join('branches','menus.branch_id','branches.branch_id')
           .where('branches.branch_id', branch_id)
           .select('toppings.*');
    },
    findToppingsByMenuItemID(menuItemId) {
        return db('menu_item_toppings')
           .join('toppings', 'menu_item_toppings.topping_id', 'toppings.topping_id')
           .where('menu_item_toppings.menu_item_id', menuItemId)
           .select('toppings.*');
    },
    async updateToppingsToMenuItem(menuItemId, topping_id_array) {
        const old_list = await db('menu_item_toppings').where('menu_item_id', menuItemId);
        for (let item of old_list)
            await db('menu_item_toppings').where('menu_item_topping_id', item.menu_item_topping_id).del();

        for (let id of topping_id_array) {
            // Lưu vào bảng menu_item_toppings
            const topping = await db('toppings').where('topping_id', id).first();
            const entity = {
                topping_id: topping.topping_id,
                menu_item_id: menuItemId
            }
            await db('menu_item_toppings').insert(entity);
        }
    }
}