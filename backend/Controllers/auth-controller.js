const User = require('../model/schema.js');
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
    const email = req.query.email;

    try {
        const isEmailRegistered = await User.exists({ email });
        if (isEmailRegistered) {
            res.json({ redirectTo: '/profile' }); // Redirect to register page if email is registered
        } else {
            res.json({ redirectTo: '/register' }); // Redirect to products page if email is not registered
        }
    } catch (error) {
        console.error('Error verifying email:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
};

exports.profile=async(req,res)=>{
    try{
       console.log("welcome to profile page");
       
    }catch(error){
        console.error('Error fetching problems:', error);
        res.status(500).send('Internal Server Error');
    }
}
