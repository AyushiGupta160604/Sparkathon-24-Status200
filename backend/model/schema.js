const mongoose = require('mongoose');
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

const Register = new mongoose.model("users_registration",userSchema);
module.exports = Register;