import jwt from  'jsonwebtoken';

import RefreshToken from '../database/models/refresh-model';
import User from '../database/models/user';
interface Payload {
  phoneno:string,
  userid:string
}
export class Token{

  static async getAccessToken(payload:Payload):Promise<string>{
    const token:string = await jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn:'10s' });
    return token;
  }

  static async getRefreshToken(payload:Payload):Promise<string>{
    const token:string = await jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, { expiresIn:'1Y' });
    return token;
  }

  static async storeRefreshToken(id:string, refreshToken:string):Promise<void>{
    await RefreshToken.create({ userid:id, token:refreshToken });
  }

  static async checkAccessToken(accessToken:string):Promise<any>{
    const payload:any = await jwt.verify(accessToken, process.env.JWT_SECRET!);
    if (payload){
      console.log(payload);
      
      const getUserData = await User.findOne({ _id:payload.userid });
      return getUserData;
    } else {
      return {};
    }
  }

  static async checkRefreshToken(refreshToken:string):Promise<any>{
    const payload:any = await jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!);
    if (payload){
      const userDetails = await RefreshToken.findOne({ userid:payload.userid }).populate('userid').lean();
      if (!userDetails){
        throw new Error('invalid token');
      }
      return userDetails.userid;
    } else {
      throw Error('user not exist');
    }
  }

  static async removeRefreshToken(refreshToken:string):Promise<void>{
    await RefreshToken.deleteOne({ token:refreshToken });
    return;
  }
}