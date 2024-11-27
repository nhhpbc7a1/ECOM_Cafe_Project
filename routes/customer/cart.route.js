import express from 'express';
import cartService from '../../services/customer/cart.service.js';
const router = express.Router();
router.get('/', (req, res) => {
    console.log('Rendering Cart Page');
    res.render('vwCustomer/cart'); // Đảm bảo đúng đường dẫn tệp cart.hbs
});
export default router;