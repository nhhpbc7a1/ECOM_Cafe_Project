import db from '../ultis/db.js';

export default {
    findAll() {
        return db('categories');
    },
    findByBranchID(branchID) {
        return db('categories')
            .join('menus', 'categories.menu_id', 'menus.menu_id')
            .join('branches', 'menus.branch_id', 'branches.branch_id')
            .where('branches.branch_id', branchID)
            .select(
                'categories.category_id',
                'categories.category_name',
                'categories.image_href',
            );
    },
}