import { Document } from 'mongoose';


export interface UserInterface extends Document{
  phone:string,
  activated:boolean,
  name:string
  avatarPath:string
}
export interface RefreshTokenInterface extends Document{
  token:string,
  userid:object
}