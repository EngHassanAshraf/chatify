import mongoose from 'mongoose';
import { env } from "../lib/env.js";

export const connectDB = async () => {
    try {
        const {monogoDBUri} = env
        if (!monogoDBUri) throw new Error("Mongo URI is not set ");
        const conn = await mongoose.connect(monogoDBUri, {
            serverSelectionTimeoutMS:10000,
            dbName:"chatify_db"
        });
        console.log('MongoDB connected successfully through host: ', conn.connection.host);
    } catch (error) {

        console.error("Error connection to MongoDB: \n", error);
        throw error;
    }
}