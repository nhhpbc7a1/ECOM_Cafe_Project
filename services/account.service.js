import db from '../ultis/db.js';

export default {
    findByEmail(email) {
        return db('accounts').where('email', email).first();
    }
}