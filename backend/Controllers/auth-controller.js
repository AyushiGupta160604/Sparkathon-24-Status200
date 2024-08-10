const User = require('../model/schema.js');
const mongoose = require('mongoose');

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
        // console.log(registered);
        
        res.status(200).json({
            message: "Registration Successful",
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
        const isEmailRegistered = await User.exists({ email });
        if (isEmailRegistered) {
            res.json({ redirectTo: '/profile' }); 
        } else {
            res.json({ redirectTo: '/register' });
        }
    } catch (error) {
        console.error('Error verifying email:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
};


exports.profile = async (req, res) => {
    try {
        const userId = req.query.userId;  // Get userId from query parameters
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        // Validate if userId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: 'Invalid User ID' });
        }

        const user = await User.findById(userId);
        if (user) {
            res.json({
                firstname: user.firstname,
                lastname:user.lastname,
                email: user.email,
                countryCode: user.countryCode,
                phone: user.phone,
            });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.addToCart = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: 'Unauthorized: User ID is missing' });
        }
        const userId = req.user.id;
        const productId = req.body.productId;

        const user = await User.findById(userId);
        if (user) {
            user.savedItems.push(productId);
            await user.save();
            res.json({ message: 'Item added to cart' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
};
