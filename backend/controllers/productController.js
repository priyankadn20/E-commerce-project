import { cloudinary } from "../config/cloudinary.js";
import productModel from "../models/productModel.js";

//function to add new product

const addProduct = async (req, res) => {
    try{
        const { name, description, price, category,subCategory,sizes,bestseller } = req.body;
        const images1 = req.files.image1 && req.files.image1[0];
        const images2 = req.files.image2 && req.files.image2[0];
        const images3 = req.files.image3 && req.files.image3[0];
        const images4 = req.files.image4 && req.files.image4[0];

        const images = [images1, images2, images3, images4].filter((item) => item !== undefined);

        let imagesUrl = await Promise.all(images.map(async (item) => {
            let result = await cloudinary.uploader.upload(item.path,{resource_type: "image"});
            
            return result.secure_url;

        }));

        const productData = {
            name,description,category,
            price: Number(price),
            subCategory,
            bestseller:bestseller === "true" ? true : false,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now()
        }

        console.log(productData);

        const product = new productModel(productData);
        await product.save();


    res.json({success: true, message: "Product added successfully"});
    

    }catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });

    }

}

//function to list products
const listProducts = async (req, res) => {

}

//remove product
const removeProduct = async (req, res) => { 

}

//single product details
const singleProduct = async (req, res) => {

}

export { cloudinary };

export { addProduct, listProducts, removeProduct, singleProduct };