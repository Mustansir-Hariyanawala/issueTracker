import { connect } from 'mongoose';
import dotenv from 'dotenv'

dotenv.config()
const MONGO_URI = process.env.MONGO_URI;
console.log("MONGO_URI:", MONGO_URI);

const connectDB = async () => {
    try {
        const res = await connect(MONGO_URI);
        console.log('MongoDB connected');
    } catch (err) {
        console.error('Error connecting to database:', err.message);
        process.exit(1); 
    }
};

export default connectDB;
