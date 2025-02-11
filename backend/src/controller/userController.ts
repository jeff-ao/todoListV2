import { Request, Response } from "express";
import userService from "../service/userService";

const userController = {
  register: async (req: Request, res: Response): Promise<Response> => {
    try {
      const name: string = req.body.name;
      const email: string = req.body.email;
      const password: string = req.body.password;

      if (!name || !email || !password)
        res
          .status(401)
          .json({ error: "preencha todos com campos obrigatorios" });
      const response = await userService.register(name, email, password);

      if ("error" in response)
        return res.status(400).json({ error: response.error });
      return res.status(204).json({ STATUS: "OK", usuario: response });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  },
  login: async (req: Request, res: Response): Promise<Response> => {
    try {
      const { email, password } = req.body;

      const response = await userService.login(email, password);

      if ("error" in response)
        return res.status(400).json({ error: response.error });

      return res.status(204).json({ STATUS: "OK", usuario: response });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  },
};

export default userController;
