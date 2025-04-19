const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/medicaps', {
     //  useNewUrlParser: true,
     //  useUnifiedTopology: true,
    });
    console.log('✅ Local MongoDB connected');
  } catch (err) {
    console.error('❌ Connection failed:', err.message);
  }
};

module.exports = connectDB;
