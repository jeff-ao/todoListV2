import Router, { Request, Response } from "express";
import taskController from "../controller/taskController";

const router = Router();

router.post("/", (req: Request, res: Response) => {
  taskController.createTask(req, res);
});
router.get("/timeline", (req: Request, res: Response) => {
  taskController.timelineTasks(req, res);
});

router.put("/:id", (req: Request, res: Response) => {
  taskController.editTask(req, res);
});
router.put("/:id/completed", (req: Request, res: Response) => {
  taskController.editCompleted(req, res);
});

router.delete("/:id", (req: Request, res: Response) => {
  taskController.deleteTask(req, res);
});

export default router;
