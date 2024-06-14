import mongoose from "mongoose";
//import config from config.js file at src
import { myconfig } from '../config.js';

//const user = 'admin'
//const pwd = 'wF7slwUGBhxJ3g9U'
export const dbUri = myconfig.MONGODBURI;

export const dbConnection = async () => {
    try {
        await mongoose.connect(dbUri);
        console.log('DB connected');
    } catch (error) {
        console.log('Error connecting to DB:', error);
        process.exit(1);
    }
}