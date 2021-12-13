import { Schema, model } from 'mongoose';
import { UserInterface } from './interfaces';



const userSchema = new Schema<UserInterface>({
  phone:{ type:String, required:true },
  activated:{ type:Boolean, default:false },
  name:{ type:String, require:false },
  avatarPath:{ type:String, required:false },
}, { timestamps:true });



export default model<UserInterface>('User', userSchema, 'Users');