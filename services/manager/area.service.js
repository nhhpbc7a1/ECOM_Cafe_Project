import db from '../../ultis/db.js';

export default {
    findAll(branch_id) {
        return db('areas')
            .where('branch_id', branch_id);
    },
    findByBranchID(branch_id) {
        return db('areas')
            .where('branch_id', branch_id);
    },
    findByID(area_id) {
        return db('areas')
            .where('area_id', area_id).first();
    },
    add(entity) {
        return db('areas')
            .insert(entity)
    },
    patch(area_id, entity) {
        return db('areas')
            .where('area_id', area_id)
            .update(entity);
    },
    del(area_id) {
        return db('areas').where('area_id', area_id).del();
    },
};
