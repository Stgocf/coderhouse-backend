import { Schema, model } from "mongoose";
//import mongoosePaginate from 'mongoose-paginate-v2';

const  nameCollection = 'carts';

const cartSchema = new Schema({
    products:[
        {
            id: {type:Schema.Types.ObjectId, ref:'products' },
            qty:{ type:Number, required:[true, 'qty is required']}
        }
    ]
});

//added plugin pagination
//cartSchema.plugin(mongoosePaginate);

export const cartModel = model(nameCollection, cartSchema);