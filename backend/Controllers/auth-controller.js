exports.home=async(req,res)=>{
    try{
       console.log("welcome to home page");
       
    }catch(error){
        console.error('Error fetching problems:', error);
        res.status(500).send('Internal Server Error');
    }
}