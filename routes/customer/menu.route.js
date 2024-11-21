import express from 'express';
import menuItemService from '../../services/customer/menu.service.js';
const router = express.Router();


router.get('/', async function(req, res) {
    try {
        const groupedItems = await menuItemService.findall(); 
        const categories = await menuItemService.findAllCategories(); 
        const totalItems = await menuItemService.countTotalItems();
        console.log(groupedItems); // Kiểm tra dữ liệu
        res.render('vwCustomer/menu', {
            layout: false,
            groupedItems,
            categories,
            totalItems
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});
router.get('/search', async function(req, res) {
    try {
        const { query } = req.query; // Lấy chuỗi cần tìm từ query parameter
        if (!query) {
            return res.status(400).send('Missing search query'); // Báo lỗi nếu không có query
        }

        const searchResults = await menuItemService.search(query); // Gọi hàm search từ service
        res.render('vwCustomer/search', {
            layout: false,
            searchResults, // Kết quả tìm kiếm
            query // Để hiển thị lại chuỗi tìm kiếm trong giao diện
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});


export default router;