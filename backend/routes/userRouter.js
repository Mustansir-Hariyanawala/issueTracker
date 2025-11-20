import { Router } from "express";
import { register, login, getUser } from "../controllers/userController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const userRouter = Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/profile", verifyToken, getUser);

export default userRouter;
