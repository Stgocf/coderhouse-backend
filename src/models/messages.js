import { Schema, model } from "mongoose";

const  nameCollection = 'messages';

const messageSchema = new Schema({
    user: { type: String, required: [true, 'user is required'] },
    message: { type: String, required: [true, 'message is required'] }
});

export const messageModel = model(nameCollection, messageSchema);