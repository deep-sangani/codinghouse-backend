import { Twilio } from './twilio-service';
import Jimp from 'jimp';
import path from 'path';
import   User  from '../database/models/user';
import { UserInterface } from '../database/models/interfaces';



export class UserService {
  static async sendOtp(phoneno:string, otp:number):Promise<boolean>{
    if (phoneno && otp){
      const body = `your codinghouse otp is ${otp}`;
      await Twilio.sendSms(body, phoneno);
      return true; 
    } else {
      return false;
    }
  }

  static async findUser(filter:object):Promise<any>{
    let user = await User.findOne(filter) ;
    return user;
  }

  static async createUser(filter:object):Promise<any>{
    const user = await User.create(filter);
    return user;
  }

  static async updateUser(user:UserInterface, data:any):Promise<any>{
    console.log(user);
    
    user.activated = true;
    user.avatarPath = data.imgpath;
    user.name = data.fullname;
    await user.save();
    return user;
  }

  static async storeImg(avatar:string):Promise<string>{
    const buffer = await Buffer.from(avatar.replace(/^data:image\/(png|jpg|jpeg);base64,/, ''), 'base64');
    const jimpimg = await Jimp.read(buffer);
    const imgpath = `${Date.now()}-${Math.round(Math.random() * 1e9)}.png`;
    await jimpimg.resize(150, Jimp.AUTO).write(path.resolve(__dirname, `../../storage/${imgpath}`));
    return imgpath;
  }
}