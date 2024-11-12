import express from 'express';
import branch_infoService from '../../services/manager/branch_info.service.js';

const router = express.Router();

router.get('/', async function(req, res) {
    const branch_id = 1;
    const branch_info = await branch_infoService.findByID(branch_id);
    res.render('vwManager/branch_info/edit', {
        layout: 'manager',
        branch_info: branch_info,
    });
});


export default router;