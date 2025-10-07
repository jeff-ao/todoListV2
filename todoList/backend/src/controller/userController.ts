import { Request, Response } from "express";
import { z } from "zod";
import userService from "../service/userService";
import {
  createUserSchema,
  loginUserSchema,
  updateUserSchema,
  idParamSchema,
} from "../schemas";

const userController = {
  register: async (req: Request, res: Response): Promise<Response> => {
    try {
      const validatedData = createUserSchema.parse(req.body);

      const response = await userService.register(
        validatedData.name,
        validatedData.email,
        validatedData.password
      );

      if ("error" in response)
        return res.status(400).json({ error: response.error });
      return res.status(201).json({ STATUS: "OK", usuario: response });
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
  login: async (req: Request, res: Response): Promise<Response> => {
    try {
      const validatedData = loginUserSchema.parse(req.body);

      const response = await userService.login(
        validatedData.email,
        validatedData.password
      );

      if ("error" in response)
        return res.status(400).json({ error: response.error });

      return res.status(201).json({ STATUS: "OK", usuario: response });
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

  getAllUsers: async (req: Request, res: Response): Promise<Response> => {
    try {
      const response = await userService.getAllUsers();

      if ("error" in response) {
        return res.status(400).json({ error: response.error });
      }

      return res.status(200).json({ STATUS: "OK", usuarios: response });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  },

  getUserById: async (req: Request, res: Response): Promise<Response> => {
    try {
      const validatedParams = idParamSchema.parse(req.params);

      const response = await userService.getUserById(validatedParams.id);

      if ("error" in response) {
        return res.status(404).json({ error: response.error });
      }

      return res.status(200).json({ STATUS: "OK", usuario: response });
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

  updateUser: async (req: Request, res: Response): Promise<Response> => {
    try {
      const validatedParams = idParamSchema.parse(req.params);
      const validatedData = updateUserSchema.parse(req.body);

      const response = await userService.updateUser(
        validatedParams.id,
        validatedData.name,
        validatedData.email,
        validatedData.password
      );

      if ("error" in response) {
        return res.status(400).json({ error: response.error });
      }

      return res.status(200).json({ STATUS: "OK", usuario: response });
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

  deleteUser: async (req: Request, res: Response): Promise<Response> => {
    try {
      const validatedParams = idParamSchema.parse(req.params);

      const response = await userService.deleteUser(validatedParams.id);

      if ("error" in response) {
        return res.status(404).json({ error: response.error });
      }

      return res.status(200).json({ message: "usuário deletado com sucesso" });
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

export default userController;
