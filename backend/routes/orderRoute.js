import express from "express";
import {
  placeOrder,
  placeOrderBkash, verifyBkash,
  placeOrderNagad, verifyNagad,
  verifySSL,
  allOrders,
  userOrders,
  updateStatus
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

const orderRouter = express.Router();

// admin
orderRouter.post('/list', adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateStatus);

// payment
orderRouter.post('/place', authUser, placeOrder);
orderRouter.post('/place/bkash', authUser, placeOrderBkash);
orderRouter.post('/place/nagad', authUser, placeOrderNagad);
orderRouter.get('/bkash/callback', verifyBkash);
orderRouter.get('/nagad/callback', verifyNagad);
orderRouter.get('/verify/ssl', verifySSL);
orderRouter.post('/verify/ssl', verifySSL);

// user
orderRouter.post('/userorders', authUser, userOrders);

export default orderRouter;