import { Document } from 'mongoose';


export interface UserInterface extends Document{
  phone:string,
  activated:boolean,
}