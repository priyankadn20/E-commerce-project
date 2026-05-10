import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}

//Routes for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = createToken(user._id);
            return res.json({ success: true, token });
        } else {
            return res.json({ success: false, message: "Invalid credentials" });
        }

    }catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }

}

//user registration
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        //check if user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        //validationg email and password
        if(!validator.isEmail(email)) {
            return res.json({ success: false, message: "please enter a valid email" });
        }
        if(password.length < 8) {
            return res.json({ success: false, message: "please enter a stronger password" });
        }
        //hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });
        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({ success: true, token });


    }catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
        
    }

}

//route for admin login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password, process.env.JWT_SECRET);
            return res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid admin credentials" });
        }
    }catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
    

}

export { loginUser, registerUser, adminLogin };