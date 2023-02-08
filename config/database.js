import mongoose from "mongoose";

export const connectDatabse = async () => {
    try {
        
        mongoose.set("strictQuery", true);
        
        const { connection } = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
