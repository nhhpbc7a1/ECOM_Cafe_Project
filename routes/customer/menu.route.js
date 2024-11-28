import express from 'express';
import menuItemService from '../../services/customer/menu.service.js';
const router = express.Router();


router.get('/', async function(req, res) {
    try {
        const { category_id } = req.query; // Lấy category_id từ query parameters

        let groupedItems;

        // Nếu có category_id, lọc sản phẩm theo category
        if (category_id) {
            groupedItems = await menuItemService.findallByCategory(category_id); // Lọc theo category
        } else {
            groupedItems = await menuItemService.findall(); // Lấy tất cả sản phẩm nếu không có category_id
        }

        const categories = await menuItemService.findAllCategories();
        const totalItems = await menuItemService.countTotalItems();

        // Render trang menu với groupedItems, categories, và totalItems
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
        const { query } = req.query; // Lấy chuỗi tìm kiếm từ query parameter
        if (!query) {
            return res.status(400).send('Missing search query');
        }

        // Kết quả tìm kiếm
        const searchResults = await menuItemService.search(query);

        // Danh mục và tổng số sản phẩm (giữ layout thống nhất)
        const categories = await menuItemService.findAllCategories();
        const totalItems = await menuItemService.countTotalItems();

        res.render('vwCustomer/search', {
            layout: false,
            searchResults,
            categories,
            totalItems,
            query, // Để hiển thị lại chuỗi tìm kiếm
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});


export default router;