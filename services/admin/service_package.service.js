import db from '../../ultis/db.js';

export default {
    findAll() {
        return db('service_packages');
    },
    add(entity) {
        return db('service_packages').insert(entity);
    },
    del(id) {
        return db('service_packages').where('service_package_id', id).del();
    },
    patch(id, entity) {
        return db('service_packages')
           .where('service_package_id', id)
           .update(entity);
    },
    findByID(id) {
        return db('service_packages').where('service_package_id', id).first();
    },
}