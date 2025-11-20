import express from "express";

import userRouter from "./routes/userRouter.js";
import issueRouter from "./routes/issueRouter.js";
import connectDB from "./util/databaseUtil.js";
import { verifyToken } from "./middleware/verifyToken.js";


const app = express();
const port = 3000;
app.use(express.json());

connectDB(); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", userRouter);
app.use("/api/issues", verifyToken, issueRouter);

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
