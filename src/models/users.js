import { Schema, model } from "mongoose";
//import mongoosePaginate from 'mongoose-paginate-v2';

const  nameCollection = 'users';

const userSchema = new Schema({
            first_name: {type:String, required:[true, 'username is required'] },
            last_name: { type:String, required:[true, 'password is required']},
            email: { type:String,required:[true, 'password is required'], unique: true},
            age: { type:Number, required:[true, 'age is required']},
            password: { type:String, required:[true, 'password is required']},
            role: { type:String, default: 'user'},
        
}
);

//added plugin pagination
//cartSchema.plugin(mongoosePaginate);

export const userModel = model(nameCollection, userSchema);