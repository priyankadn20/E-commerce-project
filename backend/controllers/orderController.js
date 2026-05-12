import orderModel from '../models/orderModel.js';

//placing orders usong COD method
const placeOrder = async (req, res) => {

    try{
        const{userId , items, amount, address} = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            address,
            paymentMethod: "COD",
            payment: false,
            date: Date.now(),
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save();
        await userModel.findByIdAndUpdate(userId, {cartData: {}});
        res.json({success: true, message: "Order placed successfully"});

    }catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }

}

//placing orders using bkash payment method
const placeOrderBkash = async (req, res) => {

}

//placing orders using nagad payment method

const placeOrderNagad = async (req, res) => {

}

//all orders of a admin panel
const allOrders = async (req, res) => {

}

//user order data for frontend
const userOrders = async (req, res) => {

}

//update order status for admin panel
const updateStatus = async (req, res) => {

}

export { placeOrder, placeOrderBkash, placeOrderNagad, allOrders, userOrders, updateStatus };