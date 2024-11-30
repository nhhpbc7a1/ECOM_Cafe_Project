import express from 'express';
import check from '../middlewares/auth.js'
import accountService from '../services/account.service.js';
const router = express.Router();

import loginRouter from './account/login.route.js';
router.use('/login', loginRouter);

import signupRouter from './account/signup.route.js';
router.use('/signup', signupRouter);

router.post('/logout', check, function (req, res) {
  req.session.auth = false;
  req.session.authAccount = null;
  req.session.branchInfo = null
  res.redirect(req.headers.referer);
});

router.get('/is-available', async function (req, res) {
  const email = req.query.email;
  const account = await accountService.findByEmail(email);

  if (account) {
      return res.json(true);
  }
  res.json(false);
});



export default router;