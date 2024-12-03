import express from 'express';
import dashBoardService from '../../services/admin/dashboard.service.js';

const router = express.Router();

router.get('/', async function (req, res) {
    try {
        // Lấy dữ liệu từ cả hai phương thức
        const chart1Data = await dashBoardService.get_Service_PackagesData(); // Dữ liệu cho biểu đồ cột
        const chart2Data = await dashBoardService.get_Service_Package_Payment(); 

        console.log("Chart1 Data:", chart1Data); // Kiểm tra dữ liệu biểu đồ cột
        console.log("Chart2 Data:", chart2Data); 

        // Render view và truyền cả hai dữ liệu vào
        res.render('vwAdmin/dashboard', { chart1Data, chart2Data });
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu biểu đồ: ", error);
        res.status(500).send('Có lỗi khi lấy dữ liệu biểu đồ');
    }
});

export default router;