import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            dbName:"chatify_db"
        });
        console.log('MongoDB connected successfully', conn.connection.host);
    } catch (error) {
        console.error("Error connection to MongoDB:", error);
        process.exit(1); // 1 status code means failure, 0 means success
    }
}