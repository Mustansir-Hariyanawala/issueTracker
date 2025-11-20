import express from "express";
import cors from "cors";

import userRouter from "./routes/userRouter.js";
import issueRouter from "./routes/issueRouter.js";
import connectDB from "./util/databaseUtil.js";
import { verifyToken } from "./middleware/verifyToken.js";


const app = express();
const port = 3000;

// Enable CORS for frontend
app.use(cors({
  origin: ['http://localhost:3001', 'http://localhost:3000'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (for uploaded media)
app.use('/uploads', express.static('uploads'));

connectDB(); 

app.use("/api/users", userRouter);
app.use("/api/issues", verifyToken, issueRouter);

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
