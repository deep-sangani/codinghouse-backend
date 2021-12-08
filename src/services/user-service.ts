import { Twilio } from './twilio-service';

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
}