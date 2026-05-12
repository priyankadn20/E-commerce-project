import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const authUser = (req, res, next) => {
    const {token} = req.headers;
    if(!token){
        return res.json({success: false, message: "not authorized Login again"});
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}
export default authUser;