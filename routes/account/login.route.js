import express from 'express';
import managerLoginService from '../../services/manager_login.service.js';

const router = express.Router();

// Route GET cho trang login
router.get('/', function (req, res) {
    res.render('vwAccount/login', {
        layout: false,
    });
});

// Route POST cho đăng nhập
router.post('/', async (req, res) => { // Đổi từ /login thành /
    const { email, password } = req.body;

    try {
        // Kiểm tra đăng nhập qua service
        const account = await managerLoginService.authenticate(email, password);
        if (account) {

            req.session.auth = true;
            req.session.authAccount = account;
            req.session.branchInfo = await managerLoginService.findBranchInfo(account.account_id);

            if (account.role_id === 1) {
                res.redirect('/admin/');
            } else if (account.role_id === 2) {
                res.redirect('/manager/');
            } else if (account.role_id === 3) {
                res.redirect('/casher/');
                req.session.branch_id = 1;
                req.session.table_id = 1;
            }
            else {
                // Thêm các điều kiện khác nếu có các loại role khác
                return res.status(403).json({ message: 'Quyền hạn không hợp lệ' });
            }
        } else {
            // Đăng nhập thất bại
            return res.status(401).render('vwAccount/login', {
                layout: false,
                error: 'Email hoặc mật khẩu không đúng',
            });
        }
    } catch (error) {

        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Đã xảy ra lỗi. Vui lòng thử lại sau.' });
    }
});

export default router;
