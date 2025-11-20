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
const issueRouter = Router();

issueRouter.get("/", getAllIssues);
issueRouter.post("/create", postIssue);
issueRouter.get("/my", getMyIssues);
issueRouter.get("/:id", getIssue);
issueRouter.put("/:id/status", authorizeRoles("admin"), updateIssue);
issueRouter.delete("/:id", authorizeRoles("admin"), deleteIssue);

export default issueRouter;
