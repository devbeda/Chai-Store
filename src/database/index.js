import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if(!process.env.MONGODB_URL) {
      throw new Error("MONGODB_URL not defined");
    }
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}`)
    console.log(`\n MongoDB connected to ${connectionInstance.connection.host}`);
    
  } catch (error) {
    console.log("MongoDB connection error: " + error);
    process.exit(1);
    
  }
}

export default connectDB;