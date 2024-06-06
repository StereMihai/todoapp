import { Router } from "express";
import { createaNewUser, signin } from "../../handlers/user";
import { validateData } from "../../modules/middleware";
import { userSchema } from "../../schemas/userSchema";

const userRouter = Router();

/**
 * User routes
*/

userRouter.post('/user', validateData(userSchema), createaNewUser);
userRouter.post('/signin', validateData(userSchema), signin);


export default userRouter;