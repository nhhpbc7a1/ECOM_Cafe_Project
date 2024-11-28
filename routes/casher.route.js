import express from 'express';

const router = express.Router();

import table_manageRouter from './casher/table_manage.route.js';
router.use('/table_manage', table_manageRouter);

export default router;