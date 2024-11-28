import db from '../../ultis/db.js';

export default {
    findAll(branch_id) {
        return db('employees')
            .where('employees.branch_id', branch_id)
            .join('accounts', 'accounts.account_id', 'employees.account_id');
    },
    findByID(id) {
        return db('employees')
           .where('employee_id', id)
           .join('accounts', 'accounts.account_id', 'employees.account_id')
           .first();
    },
    add_employee(entity) {
        return db('employees')
           .insert(entity);
    },
    add_account(entity) {
        return db('accounts')
           .insert(entity);
    },
    patch_employee(employee_id, entity) {
        return db('employees')
           .where('employee_id', employee_id)
           .update(entity);
    },
    patch_account(account_id, entity) {
        return db('accounts')
           .where('account_id', account_id)
           .update(entity);
    },

    del(employee_id) {
        return db('employees').where('employee_id', employee_id).del();
    },
    del_account(account_id) {
        return db('accounts').where('account_id', account_id).del();
    },
    findByEmail(email) {
        return db('accounts').where('email', email).first();
    }
}