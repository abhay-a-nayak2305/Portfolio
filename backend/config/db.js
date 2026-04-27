import mongoose from 'mongoose';

const connectDB = async (env) => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  try {
    const uri = env?.MONGODB_URI || process.env.MONGODB_URI;
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

export default connectDB;
