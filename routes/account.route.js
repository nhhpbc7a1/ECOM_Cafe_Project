import express from 'express';
import check from '../middlewares/auth.js'
const router = express.Router();

import loginRouter from './account/login.route.js';
router.use('/login', loginRouter);

import signupRouter from './account/signup.route.js';
router.use('/signup', signupRouter);

router.post('/logout', check, function(req, res) {
    req.session.auth = false;
    req.session.authAccount = null;
    req.session.branchInfo = null
    res.redirect(req.headers.referer);
  });
  

export default router;