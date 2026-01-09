import mongoose from 'mongoose';

const connectDB = async () => {
  try { 
    await mongoose.connect('mongodb://127.0.0.1:27017/Admin_DB_AI');
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  } 
};

export default connectDB;