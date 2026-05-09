


//function to add new product

const addProduct = async (req, res) => {
    try{
        const { name, description, price, category,subCategory,sizes,bestseller } = req.body;
        const images1 = req.files.image1[0];
        const images2 = req.files.image2[0];
        const images3 = req.files.image3[0];
        const images4 = req.files.image4[0];

    console.log(name, description, price, category, subCategory, sizes, bestseller);
    console.log(images1, images2, images3, images4);

    res.json({})

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


export { addProduct, listProducts, removeProduct, singleProduct };