import { Request, Response } from "express";

import taskService from "../service/taskService";
import { Task } from "@prisma/client";

const taskController = {
  createTask: async (req: Request, res: Response): Promise<Response> => {
    try {
      const task = req.body.task;
      const category = req.body.category;
      const user_id = Number(req.body.user_id);
      if (!task || !category || !user_id)
        res
          .status(401)
          .json({ error: "preencha todos com campos obrigatorios" });

      const resultado = await taskService.createTask(task, category, user_id);

      if ("error" in resultado || !resultado) {
        res.status(401).json({ error: resultado.error });
      }

      return res.status(201).json(resultado);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  },
  timelineTasks: async (req: Request, res: Response): Promise<Response> => {
    try {
      const user_id = Number(req.query.user_id);

      const order_by = req.query.order_by === "asc" ? "asc" : "desc";

      if (!user_id) return res.status(400).json({ error: "envie o user_id" });

      const resultado: Task[] | object = await taskService.timelineTasks(
        user_id,
        order_by
      );

      if ("error" in resultado)
        return res.status(400).json({ error: resultado.error });

      return res.status(200).json(resultado);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  },
  editTask: async (req: Request, res: Response): Promise<Response> => {
    try {
      const id = Number(req.params.id);
      const task = req.body.task;
      const category = req.body.category;

      if (!id || !task || !category) {
        return res
          .status(400)
          .json({ error: "preencha todos com campos obrigatorios" });
      }

      const resultado: Task | object = await taskService.editTask(
        id,
        task,
        category
      );
      if ("error" in resultado)
        return res.status(400).json({ error: resultado.error });

      return res.status(200).json(resultado);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  },
  editCompleted: async (req: Request, res: Response): Promise<Response> => {
    try {
      const id = Number(req.params.id);

      if (!id) {
        return res
          .status(400)
          .json({ error: "preencha todos com campos obrigatorios" });
      }

      const resultado: Task | object = await taskService.editCompleted(id);
      if ("error" in resultado)
        return res.status(400).json({ error: resultado.error });

      return res.status(200).json(resultado);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  },
  deleteTask: async (req: Request, res: Response): Promise<Response> => {
    try {
      const id = Number(req.params.id);

      if (!id) {
        return res
          .status(400)
          .json({ error: "preencha todos com campos obrigatorios" });
      }

      const resultado: Task | object = await taskService.deleteTask(id);
      if ("error" in resultado)
        return res.status(400).json({ error: resultado.error });

      return res.status(200).json(resultado);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  },
};
export default taskController;
