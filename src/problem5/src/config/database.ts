import mongoose from 'mongoose';

export const connectDb = async (): Promise<void> => {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/expresscrud';
    try {
        await mongoose.connect(mongoUri);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        process.exit(1);
    }
};
