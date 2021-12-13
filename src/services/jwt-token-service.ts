import jwt from  'jsonwebtoken';

import RefreshToken from '../database/models/refresh-model';
import User from '../database/models/user';
interface Payload {
  phoneno:string,
  userid:string
}
export class Token{

  static async getAccessToken(payload:Payload):Promise<string>{
    const token:string = await jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn:'10m' });
    return token;
  }

  static async getRefreshToken(payload:Payload):Promise<string>{
    const token:string = await jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn:'1Y' });
    return token;
  }

  static async storeRefreshToken(id:string, refreshToken:string):Promise<void>{
    await RefreshToken.create({ userid:id, token:refreshToken });
  }

  static async checkAccessToken(accessToken:string):Promise<any>{
    const payload:any = await jwt.verify(accessToken, process.env.JWT_SECRET!);
    if (payload){
      const getUserData = await User.findOne({ _id:payload.userid });
      return getUserData;
    } else {
      return {};
    }
  }
}