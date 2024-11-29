import express from 'express';
const router = express.Router();

import loginRouter from './account/login.route.js';
router.use('/login', loginRouter);

import signupRouter from './account/signup.route.js';
router.use('/signup', signupRouter);

export default router;