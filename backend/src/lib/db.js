import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const {MONGODB_URI} = process.env
        if (!MONGODB_URI) throw new Error("Mongo URI is not set ");
        const conn = await mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS:10000,
            dbName:"chatify_db"
        });
        console.log('MongoDB connected successfully through host: ', conn.connection.host);
    } catch (error) {

        console.error("Error connection to MongoDB: \n", error);
        throw error;
    }
}