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
        html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                    <h2 style="color: #2c3e50; text-align: center;">OTP Verification</h2>
                    <p>Hello,</p>
                    <p>Thank you for signing up. Please use the OTP below to verify your email:</p>
                    <div style="font-size: 24px; font-weight: bold; text-align: center; padding: 15px; background: #f4f4f4; border-radius: 5px;">
                        ${otp}
                    </div>
                    <p style="margin-top: 20px;">If you didn’t request this, please ignore this email.</p>
                    
                    <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
                    
                    <h3 style="color: #2c3e50;">Need Help?</h3>
                    <p>If you have any questions or need assistance, feel free to reach out to our support team:</p>
                    <p>
                        📧 Email: <a href="mailto:zerobroker8134@gmail.com" style="color: #3498db;">zerobroker8134@gmail.com</a>
                    </p>
                    
                    <p>Best Regards, <br> <strong>Zero Broker</strong></p>
                </div>
            `,

      };
      try {
        await sgMail.send(msg);
        res.send({ success: true, message: 'OTP sent successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: 'Failed to send OTP' });
      }

   }