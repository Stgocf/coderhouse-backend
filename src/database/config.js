import mongoose from "mongoose";

//const user = 'admin'
//const pwd = 'wF7slwUGBhxJ3g9U'
const uri = 'mongodb+srv://testuser:UAMreeOYI1Nzg9XS@coderbackend.m9kjkw0.mongodb.net/?retryWrites=true&w=majority&appName=coderbackend'

export const dbConnection = async () => {
    try {
        await mongoose.connect(uri);
        console.log('DB connected');
    } catch (error) {
        console.log('Error connecting to DB:', error);
        process.exit(1);
    }
}