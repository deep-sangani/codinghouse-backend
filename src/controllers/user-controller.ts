
import { Request, Response } from 'express';
import { UserDto } from '../dtos/user-dto';
import { HashService } from '../services/hash-service';
import { Token } from '../services/jwt-token-service';
import { OtpService } from '../services/otp-service';
import { UserService } from '../services/user-service';
import { UserInterface } from '../database/models/interfaces';
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
  
    return res.status(200).json({ otp, hash:`${hash}.${expires}`, phoneno:req.body.phoneno });
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
      const result = await HashService.validateHash(inputdata, hashedCode);
      if (!result){
        return res.status(500).json({ message:'otp is invalid' });
      }
      var user:UserInterface = await UserService.findUser({ phone:phoneno });
      
      if (!user){
        user = await UserService.createUser({ phone:phoneno });
      }
      
      // get access and refresh tokens
      const accessToken = await Token.getAccessToken({ userid:user!._id.toString(), phoneno:user!.phone });
      const refreshToken = await Token.getRefreshToken({ userid:user!._id.toString(), phoneno:user!.phone });
      await res.cookie('refreshToken', refreshToken, { maxAge:1000 * 60 * 60 * 24 * 30 });
      await res.cookie('accessToken', accessToken, { maxAge:1000 * 60 * 60 * 24 * 30 });
      await Token.storeRefreshToken(user?._id, refreshToken);
      const userDto = await  new UserDto(user);
      return res.status(200).json({ message:'login successfully!', user:userDto, auth:true });
    } catch (error) {
      console.log(error);
      return res.status(200).json({ type:'ERROR', message:error  });
     
    }
  }

  static async activate(req:Request, res:Response):Promise<object>{
    try {
      console.log('ready');
      
      const { avatar, fullname } = req.body;
      const user = req.user;
      console.log({ userfromcontroller:user });
      

      
      if (!avatar || !fullname){
        return res.status(200).json({ type:'ERROR', message:'user activation failed  '  });
      }
      const imgpath = await UserService.storeImg(avatar);
     

      if (!user){
        return res.status(404).json({ message:'User is not Found' });
      }
      const updatedUser = await UserService.updateUser(user, { avatar, fullname, imgpath });
  
      const userDto = new UserDto(updatedUser);
      return res.status(200).json({ user:userDto });
      



    } catch (error) {
      console.log(error);
      return res.status(200).json({ type:'ERROR', message:error  });
      
    }
  }
}