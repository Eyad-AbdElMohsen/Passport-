import mongoose, { Model, Schema, Document,  Types } from "mongoose"
import dotenv from 'dotenv'

dotenv.config()

const DB_URL = process.env.DB_URL

if(typeof DB_URL == 'string')
    mongoose.connect(DB_URL).then(()=> console.log('mongodb server start'))
else
    throw("DB_URL must be a satring")

const userSchema: Schema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    googleId: {type: String, required: false}
})

export interface IUser extends Document { 
    name: string,
    email: string,
    googleId?: string
}

export interface GoogleUser {
    name: string,
    email: string,
    googleId?: string,
    emails: string[]
}



export const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);