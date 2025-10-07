import { Request, Response } from "express";
import { z } from "zod";
import taskService from "../service/taskService";
import { Task } from "@prisma/client";
import {
  createTaskSchema,
  updateTaskSchema,
  getTasksSchema,
  idParamSchema,
} from "../schemas";

const taskController = {
  createTask: async (req: Request, res: Response): Promise<Response> => {
    try {
      const validatedData = createTaskSchema.parse({
        ...req.body,
        category_id: req.body.category_id ? Number(req.body.category_id) : null,
        user_id: Number(req.body.user_id),
      });

      const resultado = await taskService.createTask(
        validatedData.task,
        validatedData.category_id ?? null,
        validatedData.user_id
      );

      if ("error" in resultado || !resultado) {
        return res.status(400).json({ error: resultado.error });
      }

      return res.status(201).json(resultado);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: "Dados de entrada inválidos",
          details: error.issues.map((err: any) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        });
      }
      return res.status(500).json({ error: error.message });
    }
  },
  timelineTasks: async (req: Request, res: Response): Promise<Response> => {
    try {
      const validatedData = getTasksSchema.parse(req.query);

      const resultado: Task[] | object = await taskService.timelineTasks(
        validatedData.user_id,
        validatedData.order_by
      );

      if ("error" in resultado)
        return res.status(400).json({ error: resultado.error });

      return res.status(200).json(resultado);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: "Parâmetros de consulta inválidos",
          details: error.issues.map((err: any) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        });
      }
      return res.status(500).json({ error: error.message });
    }
  },
  editTask: async (req: Request, res: Response): Promise<Response> => {
    try {
      const validatedParams = idParamSchema.parse(req.params);
      const validatedData = updateTaskSchema.parse({
        ...req.body,
        category_id: req.body.category_id ? Number(req.body.category_id) : null,
      });

      const resultado: Task | object = await taskService.editTask(
        validatedParams.id,
        validatedData.task,
        validatedData.category_id ?? null
      );

      if ("error" in resultado)
        return res.status(400).json({ error: resultado.error });

      return res.status(200).json(resultado);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: "Dados de entrada inválidos",
          details: error.issues.map((err: any) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        });
      }
      return res.status(500).json({ error: error.message });
    }
  },
  editCompleted: async (req: Request, res: Response): Promise<Response> => {
    try {
      const validatedParams = idParamSchema.parse(req.params);

      const resultado: Task | object = await taskService.editCompleted(
        validatedParams.id
      );

      if ("error" in resultado)
        return res.status(400).json({ error: resultado.error });

      return res.status(200).json(resultado);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: "ID inválido",
          details: error.issues.map((err: any) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        });
      }
      return res.status(500).json({ error: error.message });
    }
  },
  deleteTask: async (req: Request, res: Response): Promise<Response> => {
    try {
      const validatedParams = idParamSchema.parse(req.params);

      const resultado: Task | object = await taskService.deleteTask(
        validatedParams.id
      );

      if ("error" in resultado)
        return res.status(400).json({ error: resultado.error });

      return res.status(200).json(resultado);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: "ID inválido",
          details: error.issues.map((err: any) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        });
      }
      return res.status(500).json({ error: error.message });
    }
  },
};
export default taskController;
