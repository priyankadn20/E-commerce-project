import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';
import Bkash from 'bkash';
import axios from 'axios';

//global variable

const currency = 'BDT';
const deliveryCharge = 80

//getway initialize 
const bkash = new Bkash(process.env.BKASH_SECRET_KEY)

//placing orders usong COD method
const placeOrder = async (req, res) => {

    try{
        const{userId , items, amount, address} = req.body;

        const orderData = {
            userId,
            items,
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
  try{
     const{userId , items, amount, address} = req.body;
     const { origin } = req.headers;

     const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "Bkash",
            payment: false,
            date: Date.now(),
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        const line_items = items.map(item => ({
            price_data: {
                currency: 'BDT ',
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity

        }))

        line_items.push({
            price_data: {
                currency: 'BDT ',
                product_data: {
                    name: "Delivery Charges",
                },
                unit_amount: deliveryCharge * 100,
            },
            quantity: 1
        })

        const session = await bkash.checkout.sessions.create({
            seccess_url:`${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:```${origin}/verify?success=false&orderId=${newOrder._id}`
            line_items,
            mode:'payment',
        })



  }catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });

  }

}

//placing orders using nagad payment method

const placeOrderNagad = async (req, res) => {

}

//all orders of a admin panel
const allOrders = async (req, res) => {
    try{
        const orders = await orderModel.find({});
        res.json({success: true, orders});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }

}

//user order data for frontend
const userOrders = async (req, res) => {
    try {

        const {userId} = req.body;
        const  orders = await orderModel.find({userId})
        res.json({success: true, orders});
    }catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }

}

//update order status for admin panel
const updateStatus = async (req, res) => {
    try{
        const {orderId, status} = req.body;
        await orderModel.findByIdAndUpdate(orderId, {status});
        res.json({success: true, message: "Status updated successfully"});
    }catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }

}

export { placeOrder, placeOrderBkash, placeOrderNagad, allOrders, userOrders, updateStatus };