import { Schema, model } from 'mongoose';

interface User{
  phone:string,
  activated:boolean
}

const userSchema = new Schema<User>({
  phone:{ type:String, required:true },
  activated:{ type:Boolean, default:false },
}, { timestamps:true });

export default model('User', userSchema, 'Users');