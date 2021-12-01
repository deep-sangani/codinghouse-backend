import crypto from 'crypto';

export class OtpService{
  static async ganarateOtp():Promise<number>{
    const otp = await crypto.randomInt(1111, 9999);
    return otp;
    
  } 
}