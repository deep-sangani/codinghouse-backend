
import { Request, Response } from 'express';

import   User  from '../database/models/user';
import { HashService } from '../services/hash-service';
import { Token } from '../services/jwt-token-service';
import { OtpService } from '../services/otp-service';
// import { UserService } from '../services/user-service';

export class UserController{
  static async sendOtp(req:Request, res:Response):Promise<object>{
    if (!req.body.phoneno){
      return res.status(500).json({ message:'please enter phoneno' });
    }
    
    const otp = await OtpService.ganarateOtp();
    // UserService.sendOtp(req.body.phoneno, otp);
    const inputdata = req.body.phoneno + otp.toString();
    const hash = HashService.genarateHash(inputdata);
    const time = 1000 * 60 * 2;
    const expires =  Date.now() + time;
  
    return res.status(200).json({ otp, hash:`${hash}.${expires}` });
  }

  static async verifyOtp(req:Request, res:Response):Promise<object>{
    try {
      if (!req.body.phoneno || !req.body.otp || !req.body.hash){
        return res.status(500).json({ message:'please enter phone number ,otp and hash' });
      }
      const { hash, phoneno, otp } = req.body;
      const [hashedCode, expireTime] = hash.split('.');
      if (expireTime < Date.now()){
        return res.status(200).json({ message:'opps! otp is expired' });
      }

      const inputdata = phoneno + otp.toString();
      const result = HashService.validateHash(inputdata, hashedCode);
      if (!result){
        return res.status(500).json({ message:'otp is invalid' });
      }

      let user = await User.findOne({ phone:phoneno }) ;
      if (!user){
        await User.create({ phone:phoneno });
      }
      console.log(user);
      
      // get access and refresh tokens
      Token.getAccessToken({ userid:user!._id.toString(), phoneno:user!.phone });
      return res.status(200).json({ accessToken:null, message:'login successfully!' });
    } catch (error) {
      console.log(error);
      return {};
     
    }
  }
}