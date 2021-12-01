import { Router } from 'express';
import { UserController } from '../controllers/user-controller';

const userRouter = Router();

userRouter.post('/send-otp', UserController.sendOtp);
userRouter.post('/verify-otp', UserController.verifyOtp);


export default userRouter;