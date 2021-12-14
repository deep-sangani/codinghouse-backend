import {  NextFunction, Request, Response } from 'express';
import { TokenExpiredError } from 'jsonwebtoken';
import { Token } from '../services/jwt-token-service';
export class AuthMiddleware {
  
  static async checkAccessToken(req:Request, res:Response, next:NextFunction):Promise<any>{
    try {
      const { accessToken } = req.cookies;
      if (!accessToken){
        throw new Error('something went wrong!');
      }
      //   next();
      const userdata = await Token.checkAccessToken(accessToken);
     
      if (userdata){
        req.user = userdata;
        next();
        
      } else {
        throw new Error('OPPS! User is not found!');
      }
    
    } catch (error) {
      console.log(error);
      if (error instanceof TokenExpiredError)
        return res.status(401).json({ status:'ERROR', message:error.message });
    }
  }
}