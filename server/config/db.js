import mongoose from "mongoose";

export const connectDB = async () => {
    try {
      await mongoose.connect("mongodb://127.0.0.1:27017/jwtDB").then(() => console.log("DB connected"))
      // await mongoose.connect("mongodb+srv://jwtDB:ani0520@cluster0.myzt2.mongodb.net/jwtDB").then(() => console.log("DB connected"));
      
    } catch (err) {
        console.log(err);
        
    }
}

