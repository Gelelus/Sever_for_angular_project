import mongoose, { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { IUserDocument } from '../interfaces/IUserDocument';
import { IUserModel } from '../interfaces/IUserModel';

const userSchema = new Schema({
    name: {
        type: String,
        unique:true,
        required: true,
        trim: true
    },
    age: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    pets: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Pet'
        }
      ],

})

userSchema.statics.findByCredentials = async (login : string, password : string) : Promise<IUserDocument> => {
    
    const user = await User.findOne({name: login})
    
    if(!user) {
        throw new Error('Unable user')
    }
    
    const isMatch = await bcrypt.compare(password, user.password)
    
    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

userSchema.methods.generateAuthToken = async function () : Promise<string> {

    const user = this as IUserDocument
    const token = jwt.sign({_id: user._id.toString() }, 'expressapp');
    return token

}


userSchema.pre('save', async function(next){
    const user = this as IUserDocument
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const User = model<IUserDocument, IUserModel>('User', userSchema);

export default User