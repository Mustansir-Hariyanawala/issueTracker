import { Router } from "express";
import {
  getAllIssues,
  getIssue,
  getMyIssues,
  postIssue,
  updateIssue,
  deleteIssue,
} from "../controllers/issueController.js";
const issueRouter = Router();

issueRouter.get("/", getAllIssues);
issueRouter.post("/create", postIssue);
issueRouter.get("/my", getMyIssues);
issueRouter.get("/:id", getIssue);
issueRouter.put("/:id/status", updateIssue);
issueRouter.delete("/:id", deleteIssue);


export default issueRouter;
