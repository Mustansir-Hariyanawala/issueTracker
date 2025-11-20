import { Router } from "express";
import {
  getAllIssues,
  getIssue,
  getMyIssues,
  postIssue,
  updateIssue,
  deleteIssue,
} from "../controllers/issueController.js";
import authorizeRoles from "../middleware/authorizeRoles.js";
import { verifyToken } from "../middleware/verifyToken.js";
import upload from "../middleware/upload.js";

const issueRouter = Router();

issueRouter.get("/",authorizeRoles("admin"), verifyToken, getAllIssues);
issueRouter.post("/create", verifyToken, upload.single('media'), postIssue);
issueRouter.get("/my", verifyToken, getMyIssues);
issueRouter.get("/:id", verifyToken, getIssue);
issueRouter.put("/:id/status", authorizeRoles("admin"), verifyToken, updateIssue);
issueRouter.delete("/:id", authorizeRoles("admin"), verifyToken, deleteIssue);

export default issueRouter;
