import express from 'express';
import confirmPaymentService from '../../services/customer/confirm_payment.service.js';
const router = express.Router();
router.get('/',  function(req, res) {
    res.render("vwCustomer/confirm_payment");
  
});
export default router;