import db from '../../ultis/db.js';

export default {
    findAll() {
        return db('managers')
            .join('accounts', 'accounts.account_id', 'managers.account_id')
            .where('role_id', '2');
    },
    findByID(id) {
        return db('managers')
            .where('manager_id', id)
            .join('accounts', 'accounts.account_id', 'managers.account_id')
            .first();
    },
    add_manager(entity) {
        return db('managers')
            .insert(entity);
    },
    add_account(entity) {
        return db('accounts')
            .insert(entity);
    },
    patch_manager(manager_id, entity) {
        return db('managers')
            .where('manager_id', manager_id)
            .update(entity);
    },
    patch_account(account_id, entity) {
        return db('accounts')
            .where('account_id', account_id)
            .update(entity);
    },

    del(manager_id) {
        return db('managers').where('manager_id', manager_id).del();
    },
    del_account(account_id) {
        return db('accounts').where('account_id', account_id).del();
    },
    findByEmail(email) {
        return db('accounts').where('email', email).first();
    }

}