import { Schema, model } from "mongoose";
//import mongoosePaginate from 'mongoose-paginate-v2';

const  nameCollection = 'users';

const userSchema = new Schema({
            first_name: {type:String },
            last_name: { type:String },
            email: { type:String,required:[true, 'password is required'], unique: true},
            age: { type:Number},
            password: { type:String, required:[true, 'password is required']},
            role: { type:String, default: 'user'},
        
}
);

//added plugin pagination
//cartSchema.plugin(mongoosePaginate);

export const userModel = model(nameCollection, userSchema);