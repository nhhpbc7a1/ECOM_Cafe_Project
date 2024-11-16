import express from 'express';
import { authenticateToken } from '../middlewares/auth.js';
const router = express.Router();

// route for /manager/...

import loginRouter from './manager/login.route.js';
router.use('/login', loginRouter);

import signupRouter from './manager/signup.route.js';
router.use('/signup', signupRouter);

// Middleware để đặt layout mặc định là 'manager'
router.use((req, res, next) => {
    res.locals.layout = 'manager';
    next();
});


// Các route yêu cầu xác thực
// Áp dụng `authenticateToken` cho các route cần bảo vệ

router.get('/', authenticateToken, function(req, res) {
    res.render('vwManager/dashboard', {
        // layout: false,
        active: "dashboard",
        user: req.user // Truyền thông tin user từ token vào view nếu cần
    });
});


import branch_infoRouter from './manager/branch_info.route.js';
router.use('/branch_info', authenticateToken, branch_infoRouter);

import menu_itemRouter from './manager/menu_item.route.js';
router.use('/menu_item', authenticateToken, menu_itemRouter);

import categoryRouter from './manager/category.route.js';
router.use('/category', authenticateToken, categoryRouter);

import toppingRouter from './manager/topping.route.js';
router.use('/topping', authenticateToken, toppingRouter);

import tableRouter from './manager/table.route.js';
router.use('/table', authenticateToken, tableRouter);


export default router;