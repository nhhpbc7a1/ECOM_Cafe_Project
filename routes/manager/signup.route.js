import express from 'express';
import managerSignupService from '../../services/manager_signup.service.js';
import bcrypt from 'bcrypt';
const router = express.Router();

router.get('/', function(req, res) {
    res.render('vwManager/signup', {
        layout: false,
    });
});
router.post('/', async (req, res) => {
    const { email, password, VerifyPassword, agreeTerms } = req.body;

    if (!email || !password || !VerifyPassword || !agreeTerms) {
        return res.status(400).render('vwManager/signup', {
            layout: false,
            error: 'Tất cả các trường là bắt buộc. Vui lòng điền đầy đủ thông tin.',
        });
    }

    if (password !== VerifyPassword) {
        return res.status(400).render('vwManager/signup', {
            layout: false,
            error: 'Mật khẩu không khớp. Vui lòng kiểm tra lại.',
        });
    }

    const existingUser = await managerSignupService.checkEmailExists(email);
    if (existingUser) {
        return res.status(400).render('vwManager/signup', {
            layout: false,
            error: 'Email đã được đăng ký.',
        });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await managerSignupService.createUser({
            email,
            password: hashedPassword,
            role_id: 2, // hoặc thiết lập role_id theo yêu cầu
        });

        if (newUser) {
            return res.redirect('/manager/login');
        } else {
            return res.status(500).render('vwManager/signup', {
                layout: false,
                error: 'Đã xảy ra lỗi khi tạo tài khoản. Vui lòng thử lại.',
            });
        }
    } catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).render('vwManager/signup', {
            layout: false,
            error: 'Đã xảy ra lỗi. Vui lòng thử lại sau.',
        });
    }
});
export default router;
