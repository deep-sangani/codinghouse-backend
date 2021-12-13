import { Schema, model } from 'mongoose';
import { RefreshTokenInterface } from './interfaces';



const tokenSchema = new Schema<RefreshTokenInterface>({
  userid:{ type:Schema.Types.ObjectId, ref:'User' },
  token:{ type:String },
}, { timestamps:true });



export default model<RefreshTokenInterface>('RefreshToken', tokenSchema, 'Tokens');