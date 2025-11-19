import express from "express";
import userRouter from "./routes/userRouter.js";
import issueRouter from "./routes/issueRouter.js";

const app = express();
const port = 3000;

app.use("/api/user", userRouter);
app.use("/api/issues", issueRouter);

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
