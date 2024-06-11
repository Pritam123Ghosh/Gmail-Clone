import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const Connection = async () => {
    const DB_URI = process.env.MONGO_URI
    try {
        await mongoose.connect(DB_URI);
        console.log("Database connection established")

    } catch (error) {
        console.log("Error while connecting the database", error.message);
    }
}
export default Connection;