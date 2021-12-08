import twilio from 'twilio';

export class Twilio{
 


  static async sendSms(body:string, toMobileNo:string):Promise<void>{
    const accountSid = process.env.TWILIO_ACCOUNT_SID!;
    const authToken = process.env.TWILIO_AUTH_TOKEN!;
    const client = twilio(accountSid, authToken);
    const fromMobileNo:string = '+13514449567';
    await client.messages.create({ body, from:fromMobileNo, to:toMobileNo });
  }
}