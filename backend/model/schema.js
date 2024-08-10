const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { required } = require('nodemon/lib/config');

// Define a schema
const userSchema = new mongoose.Schema({
  title: { type: String, enum: ['Mr', 'Mrs', 'Ms', 'Not prefer to say'],required:true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  countryCode: { type: Number, required: true },
  phone: { type: Number, required: true,unique:true },
  password: { type: String, required: true },
  email: { type: String, required: true,unique:true }
});
// //compare password

// userSchema.methods.verifyPassword=async function (password) {
   
//   const isMatch = bcrypt.compare(password,this.password);
//   return isMatch; 
// }

userSchema.methods.generateToken = async function() {
  try {
      return jwt.sign({
          userId: this._id.toString(),
          email: this.email,
      }, process.env.JWT_SECRET_KEY, {
          expiresIn: "30d"
      });
  } catch (error) {
      console.error(error);
  }
};

const Register = new mongoose.model("users_registration",userSchema);
module.exports = Register;