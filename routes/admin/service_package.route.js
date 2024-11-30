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
    const branch_info = await branch_infoService.findByID(branch_id);
    res.render('vwManager/branch_info/edit', {
        layout: 'manager',
        branch_info: branch_info,
    });
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