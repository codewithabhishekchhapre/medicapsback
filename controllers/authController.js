const User = require('../models/User');
require('dotenv').config();
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.signup = async (req, res) => {

     try {
          const { username, email, password, mobile, role } = req.body;
          // Check if email already exists
          const existingUser = await User.findOne({ email });
          if (existingUser) return res.status(400).json({ message: 'Email already exists' });

          const user = new User({
               username,
               email,
               password,
               mobile,
               role
          })
          await user.save();

          res.json({ message: 'User registered successfully', user })

     }
     catch (error) {
          res.status(500).json({ message: 'Server error', error });
     }
}    

exports.login = async (req, res) => {
     try {
       const { email, password } = req.body;
   
       const user = await User.findOne({ email, password }); // Direct match
       if (!user) return res.status(401).json({ message: 'Invalid email or password' });
   
       res.status(200).json({
         message: 'Login successful',
         user: {
           id: user._id,
           username: user.username,
           email: user.email,
           mobile: user.mobile,
           role: user.role,
           isVerified: user.isVerified
         }
       });
     } catch (error) {
       res.status(500).json({ message: 'Server error', error });
     }
   };

exports.getAllUsers = async (req, res) => {
     try {
       const users = await User.find(); // You can add filters if needed
       res.status(200).json({
         message: 'All users fetched successfully',
         users,
       });
     } catch (error) {
       res.status(500).json({ message: 'Server error', error });
     }
   };
   
   function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
  }


  // this is a send otp code

   exports.sendOtp=async(req,res)=>{

      const {email,purpose}=req.body;
      const otp=generateOTP();
      console.log(process.env.SENDER_EMAIL);
      console.log(email,purpose)
      const msg = {
        to: email,
        from: process.env.SENDER_EMAIL,
        subject: 'Your OTP Code',
        text: `Your One Time Password (OTP) is: ${otp}`,
      };
      try {
        await sgMail.send(msg);
        res.send({ success: true, message: 'OTP sent successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: 'Failed to send OTP' });
      }

   }