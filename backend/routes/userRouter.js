import { Router } from "express";
import { register, login, getUser } from "../controllers/userController.js";

const userRouter = Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/", getUser);

export default userRouter;
