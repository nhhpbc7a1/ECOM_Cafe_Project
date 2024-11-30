import db from '../../ultis/db.js';

export default {
    findAll() {
        return db('service_package_payment');
    },
    add(entity) {
        return db('service_package_payment').insert(entity);
    },
    del(id) {
        return db('service_package_payment').where('service_package_payment_id', id).del();
    },
    patch(id, entity) {
        return db('service_package_payment')
           .where('service_package_payment_id', id)
           .update(entity);
    },
    findByID(id) {
        return db('service_package_payment').where('service_package_payment_id', id).first();
    },
}