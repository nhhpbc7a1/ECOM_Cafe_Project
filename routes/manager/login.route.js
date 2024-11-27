import express from 'express';
import jwt from 'jsonwebtoken';
import managerLoginService from '../../services/manager_login.service.js';

const router = express.Router();

// Route GET cho trang login
router.get('/', function(req, res) {
    res.render('vwManager/login', {
        layout: false,
    });
});

// Route POST cho đăng nhập
router.post('/', async (req, res) => { // Đổi từ /login thành /
    const { email, password } = req.body;

    try {
        // Kiểm tra đăng nhập qua service
        const user = await managerLoginService.authenticate(email, password);
        if (user) {
            if (user.password === password) {
                let redirectUrl = ''; 

                if (user.role_id === 1) {
                    // Nếu role_id = 1, chuyển đến dashboard của quản lý
                    redirectUrl = '/admin/';
                } else if (user.role_id === 2) {
                    // Nếu role_id = 2, chuyển đến dashboard của nhân viên
                    redirectUrl = '/manager/';
                } else {
                    // Thêm các điều kiện khác nếu có các loại role khác
                    return res.status(403).json({ message: 'Quyền hạn không hợp lệ' });
                }
            }
            // Tạo token
            const token = jwt.sign({ id: user.id }, 'secretKey', { expiresIn: '1h' }); // Sử dụng secret key phù hợp với dự án

            // Thiết lập cookie với token
            res.cookie('authToken', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 3600000 
            });

            return res.redirect('/manager/');
        } else {
            // Đăng nhập thất bại
            return res.status(401).render('vwManager/login', {
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
