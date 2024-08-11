const User = require('../model/schema.js');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Product = require("../model/towel.js"); // Import your towel model
const LED = require("../model/led.js"); // Import your Product model
const Cart = require('../model/cart');

exports.home=async(req,res)=>{
    try{
       console.log("welcome to home page");
       
    }catch(error){
        console.error('Error fetching problems:', error);
        res.status(500).send('Internal Server Error');
    }
}
exports.register=async(req,res)=>{
    try{
        const { email, phone } = req.body;

        // Check if the user already exists by email or phone number
        const existingUser = await User.findOne({ $or: [{ email }, { phone }] });

        if (existingUser) {
            return res.status(409).json({
                message: "User already registered. Please login.",
                redirectTo: "/login"
            });
        }
        const registers = new User({
            title:req.body.title,
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            countryCode:req.body.countryCode,
            phone:req.body.phone,
            password:req.body.password,
            email:req.body.email
           
        })
        const registered = await registers.save();
        // Generate token
        const token = await registered.generateToken();
        // console.log(registered);
        
        res.status(200).json({
            message: "Registration Successful",
            token: token,
            userId: registered._id.toString(),
            email: registered.email,
            firstname: registered.firstname,
            lastname: registered.lastname,
        });
       

    }catch(error){
        res.status(400).send(error);
    }

}
exports.login = async (req, res) => {
    const email = req.body.email;
    try {
        const userExist = await User.findOne({ email });
        
        if (userExist) {
            // Generate token
            const token = await userExist.generateToken();

            // Store cookies
            const options = {
                expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day
                httpOnly: true,
            };

            // Send token and response
            res.status(200).cookie("token", token, options).json({
                redirectTo: '/profile',
                message: "Login Successful",
                token: token,
                userId: userExist._id.toString(),
                firstname: userExist.firstname,
                // isAdmin: userExist.isAdmin
            });
        } else {
            res.status(200).json({ redirectTo: '/register' });
        }
    } catch (error) {
        console.error('Error verifying email:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
};

exports.profile = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized: No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        // console.log('Decoded Token:', decoded);

        const userId = decoded.userId;
        // console.log('User ID from Token:', userId);

        // Convert string to ObjectId using 'new'
        const objectId = new mongoose.Types.ObjectId(userId);

        // Fetch user details from the database
        const user = await User.findById(objectId);
        if (user) {
            res.json({
                token:token,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                countryCode: user.countryCode,
                phone: user.phone,
            });
        } else {
            console.error('User not found in the database');
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.addToCart = async (req, res) => {
    const { productId } = req.body;
    const userId = req.user.userId; // Get userId from authenticated user

    try {
        let cart = await Cart.findOne({ userId });

        if (cart) {
            // Check if product already exists in cart
            let itemIndex = cart.products.findIndex(p => p.productId.toString() === productId);
            if (itemIndex > -1) {
                // Product exists, update quantity
                cart.products[itemIndex].quantity += 1;
            } else {
                // Product does not exist, add as new item
                cart.products.push({ productId, quantity: 1 });
            }
        } else {
            // Create a new cart for the user
            cart = new Cart({
                userId,
                products: [{ productId, quantity: 1 }]
            });
        }

        cart = await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ error: 'An error occurred while adding to cart' });
    }
};
exports.getCart = async (req, res) => {
    const userId = req.user.userId; // Get userId from authenticated user

    try {
        const cart = await Cart.findOne({ userId }).populate('products.productId');
        if (cart) {
            res.status(200).json(cart);
        } else {
            res.status(404).json({ message: 'Cart not found' });
        }
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ error: 'An error occurred while fetching the cart' });
    }
};
exports.removeFromCart = async (req, res) => {
    const { productId } = req.body;
    const userId = req.user.userId; // Get userId from authenticated user

    try {
        let cart = await Cart.findOne({ userId });

        if (cart) {
            cart.products = cart.products.filter(p => p.productId.toString() !== productId);
            cart = await cart.save();
            res.status(200).json(cart);
        } else {
            res.status(404).json({ message: 'Cart not found' });
        }
    } catch (error) {
        console.error('Error removing from cart:', error);
        res.status(500).json({ error: 'An error occurred while removing from cart' });
    }
};

exports.Product=async(req,res)=>{
    try {
        // Fetch all items from the "product" collection in MongoDB
        const products = await Product.find({});
        // Send the items data as a JSON response to the frontend
        res.json(products);
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ error: 'An error occurred while fetching items' });
    }
}
exports.LED=async(req,res)=>{
    try {
        // Fetch all items from the "product" collection in MongoDB
        const products = await LED.find({});
        // Send the items data as a JSON response to the frontend
        res.json(products);
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ error: 'An error occurred while fetching items' });
    }
}
