export class UserService {
  static sendOtp(phoneno:string, otp:number):boolean{
    if (phoneno && otp){
      return true;
    } else {
      return false;
    }
  }
}