import { Router } from 'express';
import { UserController } from '../controllers/user-controller';
import { AuthMiddleware } from '../middlewares/auth-middleware';
const userRouter = Router();

userRouter.post('/send-otp', UserController.sendOtp);
userRouter.post('/verify-otp', UserController.verifyOtp);
userRouter.post('/activate', AuthMiddleware.checkAccessToken, UserController.activate);
userRouter.get('/refresh', UserController.refresh);

export default userRouter;