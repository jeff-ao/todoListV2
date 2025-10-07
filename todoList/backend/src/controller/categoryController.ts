import { Request, Response } from "express";

import categoryService from "../service/categoryService";
import { Category } from "@prisma/client";

const categoryController = {
  createCategory: async (req: Request, res: Response): Promise<Response> => {
    try {
      const name = req.body.name;
      const color = req.body.color;
      const user_id = Number(req.body.user_id);

      if (!name || !user_id) {
        return res
          .status(400)
          .json({ error: "preencha todos com campos obrigatorios" });
      }

      const resultado = await categoryService.createCategory(
        name,
        color,
        user_id
      );

      if ("error" in resultado || !resultado) {
        return res.status(400).json({ error: resultado.error });
      }

      return res.status(201).json(resultado);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  },

  getCategoriesByUserId: async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const user_id = Number(req.query.user_id);

      if (!user_id) {
        return res.status(400).json({ error: "envie o user_id" });
      }

      const resultado: Category[] | object =
        await categoryService.getCategoriesByUserId(user_id);

      if ("error" in resultado) {
        return res.status(400).json({ error: resultado.error });
      }

      return res.status(200).json(resultado);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  },

  editCategory: async (req: Request, res: Response): Promise<Response> => {
    try {
      const id = Number(req.params.id);
      const name = req.body.name;
      const color = req.body.color;

      if (!id || !name) {
        return res
          .status(400)
          .json({ error: "preencha todos com campos obrigatorios" });
      }

      const resultado: Category | object = await categoryService.editCategory(
        id,
        name,
        color
      );

      if ("error" in resultado) {
        return res.status(400).json({ error: resultado.error });
      }

      return res.status(200).json(resultado);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  },

  deleteCategory: async (req: Request, res: Response): Promise<Response> => {
    try {
      const id = Number(req.params.id);

      if (!id) {
        return res
          .status(400)
          .json({ error: "preencha todos com campos obrigatorios" });
      }

      const resultado: object = await categoryService.deleteCategory(id);

      if ("error" in resultado) {
        return res.status(400).json({ error: resultado.error });
      }

      return res.status(200).json(resultado);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  },
};

export default categoryController;
