import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';
import SSLCommerzPayment from 'sslcommerz-lts';

const deliveryCharge = 80;

// ─────────────────────────────────────────
// COD
// ─────────────────────────────────────────
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        const newOrder = new orderModel({
            userId, items, amount, address,
            paymentMethod: 'COD',
            payment: false,
            date: Date.now(),
        });
        await newOrder.save();
        await userModel.findByIdAndUpdate(userId, { cartData: {} });
        res.json({ success: true, message: 'Order placed successfully' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// ─────────────────────────────────────────
// SSLCommerz — bKash
// ─────────────────────────────────────────
const placeOrderBkash = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        const newOrder = new orderModel({
            userId, items, amount, address,
            paymentMethod: 'Bkash',
            payment: false,
            date: Date.now(),
        });
        await newOrder.save();

        const data = {
            total_amount: amount,
            currency: 'BDT',
            tran_id: newOrder._id.toString(),
            success_url: `${process.env.BACKEND_URL}/api/order/verify/ssl?orderId=${newOrder._id}&success=true`,
            fail_url: `${process.env.BACKEND_URL}/api/order/verify/ssl?orderId=${newOrder._id}&success=false`,
            cancel_url: `${process.env.BACKEND_URL}/api/order/verify/ssl?orderId=${newOrder._id}&success=false`,
            shipping_method: 'Courier',
            product_name: 'E-commerce Order',
            product_category: 'General',
            product_profile: 'general',
            cus_name: address.firstName + ' ' + address.lastName,
            cus_email: address.email,
            cus_add1: address.street,
            cus_city: address.city,
            cus_state: address.state,
            cus_postcode: address.zipcode,
            cus_country: address.country,
            cus_phone: address.phone,
            ship_name: address.firstName + ' ' + address.lastName,
            ship_add1: address.street,
            ship_city: address.city,
            ship_state: address.state,
            ship_postcode: address.zipcode,
            ship_country: address.country,
        };

        const sslcz = new SSLCommerzPayment(
            process.env.SSLC_STORE_ID,
            process.env.SSLC_STORE_PASSWORD,
            false // ✅ sandbox mode
        );

        const apiResponse = await sslcz.init(data);

        console.log("SSL API Response:", JSON.stringify(apiResponse)); // ✅ debug log

        if (apiResponse?.GatewayPageURL) {
            return res.json({ success: true, payment_url: apiResponse.GatewayPageURL });
        } else {
            await orderModel.findByIdAndDelete(newOrder._id);
            return res.json({ success: false, message: 'SSL payment init failed' });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// ─────────────────────────────────────────
// SSLCommerz — Nagad
// ─────────────────────────────────────────
const placeOrderNagad = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        const newOrder = new orderModel({
            userId, items, amount, address,
            paymentMethod: 'Nagad',
            payment: false,
            date: Date.now(),
        });
        await newOrder.save();

        const data = {
            total_amount: amount,
            currency: 'BDT',
            tran_id: newOrder._id.toString(),
            success_url: `${process.env.BACKEND_URL}/api/order/verify/ssl?orderId=${newOrder._id}&success=true`,
            fail_url: `${process.env.BACKEND_URL}/api/order/verify/ssl?orderId=${newOrder._id}&success=false`,
            cancel_url: `${process.env.BACKEND_URL}/api/order/verify/ssl?orderId=${newOrder._id}&success=false`,
            shipping_method: 'Courier',
            product_name: 'E-commerce Order',
            product_category: 'General',
            product_profile: 'general',
            cus_name: address.firstName + ' ' + address.lastName,
            cus_email: address.email,
            cus_add1: address.street,
            cus_city: address.city,
            cus_state: address.state,
            cus_postcode: address.zipcode,
            cus_country: address.country,
            cus_phone: address.phone,
            ship_name: address.firstName + ' ' + address.lastName,
            ship_add1: address.street,
            ship_city: address.city,
            ship_state: address.state,
            ship_postcode: address.zipcode,
            ship_country: address.country,
        };

        const sslcz = new SSLCommerzPayment(
            process.env.SSLC_STORE_ID,
            process.env.SSLC_STORE_PASSWORD,
            false  // ✅ sandbox mode
        );

        const apiResponse = await sslcz.init(data);

        console.log("SSL API Response:", JSON.stringify(apiResponse)); // ✅ debug log

        if (apiResponse?.GatewayPageURL) {
            return res.json({ success: true, payment_url: apiResponse.GatewayPageURL });
        } else {
            await orderModel.findByIdAndDelete(newOrder._id);
            return res.json({ success: false, message: 'SSL payment init failed' });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// ─────────────────────────────────────────
// SSL Verify — Payment success/fail
// ─────────────────────────────────────────
const verifySSL = async (req, res) => {
    try {
        const orderId = req.query.orderId || req.body.orderId;
        const success = req.query.success || req.body.value_a;

        if (success === 'false' || success === 'FAILED') {
            await orderModel.findByIdAndDelete(orderId);
            return res.redirect(`${process.env.FRONTEND_URL}/cart`);
        }

        const order = await orderModel.findByIdAndUpdate(
            orderId,
            { payment: true },
            { new: true }
        );
        await userModel.findByIdAndUpdate(order.userId, { cartData: {} });
        return res.redirect(`${process.env.FRONTEND_URL}/orders`);

    } catch (error) {
        console.log(error);
        return res.redirect(`${process.env.FRONTEND_URL}/cart`);
    }
};

const verifyBkash = verifySSL;
const verifyNagad = verifySSL;

// ─────────────────────────────────────────
// Admin / User
// ─────────────────────────────────────────
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await orderModel.find({ userId });
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        await orderModel.findByIdAndUpdate(orderId, { status });
        res.json({ success: true, message: 'Status updated successfully' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export {
    placeOrder,
    placeOrderBkash, verifyBkash,
    placeOrderNagad, verifyNagad,
    verifySSL,
    allOrders, userOrders, updateStatus,
};