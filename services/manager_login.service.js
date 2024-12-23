import db from '../ultis/db.js';
import bcrypt from 'bcrypt';

export default {

    async authenticate(email, password) {
        const user = await db('accounts').where({ email }).first();
        if (user && await bcrypt.compare(password, user.password)) {
            return user; // Trả về user nếu đúng thông tin
        }
        return null; // Trả về null nếu thông tin không chính xác
    },
    findBranchInfo_forManager(account_id) {
        return db('accounts')
        .join('branches', 'branches.manager_id', 'accounts.account_id')
        .join('menus', 'menus.branch_id', 'branches.branch_id')
        .where('account_id', account_id).first();
    },
    findBranchInfo_forEmployee(account_id) {
        return db('employees')
        .join('branches', 'branches.branch_id', 'employees.branch_id')
        .join('accounts', 'accounts.account_id', 'employees.account_id')
        .where('accounts.account_id', account_id).first();
    }


    // const authenticate = async (email, password) => {
    //     try {
    //         // Lấy người dùng từ cơ sở dữ liệu theo email
    //         const user = await db('accounts').where({ email }).first();
    //         console.log(user);
    //         if (user) {
    //             // So sánh mật khẩu người dùng nhập vào với mật khẩu lưu trong cơ sở dữ liệu (nếu mật khẩu chưa mã hóa)
    //             if (user.password === password) {
    //                 return user;
    //             }
    //         }

    //         // Trả về null nếu không tìm thấy người dùng hoặc mật khẩu không khớp
    //         return null;
    //     } catch (error) {
    //         console.error('Error during authentication:', error);
    //         throw error;  // Ném lỗi lên trên để controller có thể xử lý
    //     }
    // };


};