import express from "express";
import {placeOrder, placeOrderBkash, placeOrderNagad, allOrders, userOrders, updateStatus} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

const orderRouter = express.Router();


//admin features
orderRouter.post('/list',adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateStatus);


//payment features
orderRouter.post('/place', authUser, placeOrder);
orderRouter.post('/place/bkash', authUser, placeOrderBkash);
orderRouter.post('/place/nagad', authUser, placeOrderNagad);


//user features
orderRouter.post('/userorders', authUser, userOrders);

export default orderRouter;