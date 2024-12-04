import express from 'express';
import branch_infoService from '../../services/manager/branch_info.service.js';

import multer from 'multer';
import handleFileUpload from '../../services/handleFileUpload.service.js';
const upload = multer({ dest: 'public/images/uploads/' });


const router = express.Router();

// route for /manager/branch_info/...

router.use((req, res, next) => {
    res.locals.active = 'branch_info'; // Đặt giá trị 'active' mặc định
    next(); // Chuyển sang middleware/route handler tiếp theo
});

router.get('/', async function(req, res) {
    const branch_id = req.session.branchInfo.branch_id;

    // Fetch branch information
    const branch_info = await branch_infoService.findByID(branch_id);

    // Fetch the current service package and remaining days
    const currentServicePackage = await branch_infoService.getCurrentServicePackage(branch_id);

    res.render('vwManager/branch_info/edit', {
        layout: 'manager',
        branch_info: branch_info,
        service_package: currentServicePackage, // Pass service package to the view
    });
});
router.post('/purchase', async function (req, res) {
    try {
        // Kiểm tra dữ liệu từ client gửi về
        const { service_package_id } = req.body;
        console.log(req.body)
        if (!service_package_id) {
            return res.status(400).json({
                success: false,
                message: 'Thiếu ID gói cước!',
            });
        }

        const branch_id = req.session?.branchInfo?.branch_id;
        if (!branch_id) {
            return res.status(401).json({
                success: false,
                message: 'Phiên làm việc không hợp lệ. Vui lòng đăng nhập lại.',
            });
        }

        console.log('Branch ID:', branch_id);
        console.log('Service Package ID:', service_package_id);

        const result = await branch_infoService.purchaseServicePackage(branch_id, service_package_id);

        // Phản hồi thành công
        res.json({
            success: true,
            message: `Gói cước đã được gia hạn thành công! Ngày hết hạn mới: ${result.newExpirationDate}`,
        });
    } catch (error) {
        console.error('Error during purchasing service package:', error);

        // Phản hồi lỗi
        res.status(500).json({
            success: false,
            message: 'Có lỗi xảy ra trong quá trình mua gói cước.',
        });
    }
});


router.post('/patch', upload.single('image'), async function(req, res) {
    const branch_id = req.session.branchInfo.branch_id;
    const branch_info = {
        name: req.body.name,
        contact_phone: req.body.contact_phone,
        address: req.body.address,
    } 
    await branch_infoService.patch(branch_id, branch_info);

    const imagePath = await handleFileUpload(req, 'branches_logo', branch_id);
    const image = req.file;
    if (image) {
        branch_info.logo_href = imagePath;
        await branch_infoService.patch(branch_id, branch_info);
    }

    res.redirect('/manager/branch_info');
});


export default router;