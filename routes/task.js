import { Router } from "express";
import {
  createNewTask,
  deleteTask,
  getMyTask,
  updateTask,
} from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = Router();

router.post("/new", isAuthenticated, createNewTask);

router.get("/my", isAuthenticated, getMyTask);

router
  .route("/:id")
  .put(isAuthenticated, updateTask)
  .delete(isAuthenticated, deleteTask);

export default router;
