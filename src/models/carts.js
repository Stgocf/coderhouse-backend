import { Schema, model } from "mongoose";

const  nameCollection = 'carts';

const cartSchema = new Schema({
    products:[
        {
            id: {type:Schema.Types.ObjectId, ref:'products' },
            qty:{ type:Number, required:[true, 'qty is required']}
        }
    ]
});

export const cartModel = model(nameCollection, cartSchema);