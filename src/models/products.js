import { Schema, model } from "mongoose";

const  nameCollection = 'products';

const productSchema = new Schema({
    //set id automatcalli with autoincrement
    //id: { type: Number, required: [true, 'id is required'], unique: true },
    title: { type: String, required: [true, 'title is requuired'] },
    description: { type: String, required: [true, 'description is required'] },
    price: { type: Number, required: [true, 'price is required'] },
    thumbnail: { type: String},
    code: { type: String, required: [true, 'code is required'], unique: true},
    stock: { type: Number, required: [true, 'stock is required'] },
    category: { type: String, required: [true, 'category is required'] },
    status: { type: Boolean, default: true },
});

export const productModel = model(nameCollection, productSchema);