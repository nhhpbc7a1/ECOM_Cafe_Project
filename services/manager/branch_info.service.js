import db from '../../ultis/db.js';

export default {
    findByID(branch_id) {
        return db('branches').where('branch_id', branch_id).first();
    },
    patch(branch_id, entity) {
        return db('branches')
           .where('branch_id', branch_id)
           .update(entity);
    },
}