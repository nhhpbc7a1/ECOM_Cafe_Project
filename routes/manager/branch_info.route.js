import express from 'express';
import branch_settingService from '../../services/manager/branch_setting.service.js';

const router = express.Router();

router.get('/', async function(req, res) {
    const branch_id = 1;
    const branch_info = await branch_settingService.findByID(branch_id);
    res.render('vwManager/branch_setting/edit', {
        layout: 'manager',
        branch_info: branch_info,
    });
});


export default router;