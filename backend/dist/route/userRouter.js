import { Router } from 'express';
import { getAllUser, signUp, login, verifyUser } from '../controller/use-controller.js';
import { validate, signUpValidatory, loginValidatory } from '../util/validator.js';
import { verifyToken } from '../util/token-manager.js';
const userRouter = Router();
console.log("here");
userRouter.route('/').get(getAllUser);
userRouter.post('/signup', validate(signUpValidatory), signUp);
userRouter.post('/login', validate(loginValidatory), login);
userRouter.get('/auth-status', verifyToken, verifyUser);
export default userRouter;
//# sourceMappingURL=userRouter.js.map