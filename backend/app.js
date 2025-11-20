import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/database.js";

import userRouter from "./routes/userRouter.js";
import issueRouter from "./routes/issueRouter.js";

dotenv.config(); 

const app = express();
const port = 3000;
app.use(express.json());

connectDB(); 

app.use("/api/user", userRouter);
app.use("/api/issues", issueRouter);

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
