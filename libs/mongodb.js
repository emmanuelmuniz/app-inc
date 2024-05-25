import mongoose from "mongoose";

export const dynamic = "force-dynamic";

const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to Mongo DB.");
    } catch (error) {
        console.log(error);
    }
}

export default connectMongoDB;