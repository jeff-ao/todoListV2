import { Request, Response } from "express";
import { z } from "zod";
import categoryService from "../service/categoryService";
import { Category } from "@prisma/client";
import {
  createCategorySchema,
  updateCategorySchema,
  getCategoriesSchema,
  idParamSchema,
} from "../schemas";

const categoryController = {
  createCategory: async (req: Request, res: Response): Promise<Response> => {
    try {
      const validatedData = createCategorySchema.parse({
        ...req.body,
        user_id: Number(req.body.user_id),
      });

      const resultado = await categoryService.createCategory(
        validatedData.name,
        validatedData.color,
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

  getCategoriesByUserId: async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const validatedData = getCategoriesSchema.parse(req.query);

      const resultado: Category[] | object =
        await categoryService.getCategoriesByUserId(validatedData.user_id);

      if ("error" in resultado) {
        return res.status(400).json({ error: resultado.error });
      }

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

  editCategory: async (req: Request, res: Response): Promise<Response> => {
    try {
      const validatedParams = idParamSchema.parse(req.params);
      const validatedData = updateCategorySchema.parse(req.body);

      const resultado: Category | object = await categoryService.editCategory(
        validatedParams.id,
        validatedData.name,
        validatedData.color
      );

      if ("error" in resultado) {
        return res.status(400).json({ error: resultado.error });
      }

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

  deleteCategory: async (req: Request, res: Response): Promise<Response> => {
    try {
      const validatedParams = idParamSchema.parse(req.params);

      const resultado: object = await categoryService.deleteCategory(
        validatedParams.id
      );

      if ("error" in resultado) {
        return res.status(400).json({ error: resultado.error });
      }

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

export default categoryController;
