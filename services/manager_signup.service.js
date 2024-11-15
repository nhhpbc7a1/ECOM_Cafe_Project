import db from '../ultis/db.js';

const managerSignupService = {
    // Kiểm tra email đã tồn tại chưa
    checkEmailExists: async (email) => {
        const rows = await db('accounts').where('email', email).select();
        return rows.length > 0;
    },

    // Tạo người dùng mới
    createUser: async ({ email, password, role_id }) => {
        try {
            const [id] = await db('accounts').insert({ email, password, role_id });
            return { id, email, role_id };
        } catch (error) {
            console.error('Error while creating user:', error);
            return null;
        }
    },
};

export default managerSignupService;