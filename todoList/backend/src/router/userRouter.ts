import Router from "express";
import userController from "../controller/userController";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Rotas de usuários
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: "João Silva"
 *               email:
 *                 type: string
 *                 example: "joao@email.com"
 *               password:
 *                 type: string
 *                 example: "SenhaSegura123!"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Erro na requisição
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/", (req, res) => {
  userController.register(req, res);
});

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Realiza login do usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "joao@email.com"
 *               password:
 *                 type: string
 *                 example: "SenhaSegura123!"
 *     responses:
 *       201:
 *         description: Login realizado com sucesso
 *       400:
 *         description: Dados incorretos
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/login", (req, res) => {
  userController.login(req, res);
});

export default router;
