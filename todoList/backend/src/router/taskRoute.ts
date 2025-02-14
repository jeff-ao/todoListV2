import Router, { Request, Response } from "express";
import taskController from "../controller/taskController";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Gerenciamento de tarefas
 */

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Cria uma nova tarefa
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               task:
 *                 type: string
 *               category:
 *                 type: string
 *               user_id:
 *                 type: number
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso
 *       400:
 *         description: Erro ao criar tarefa
 */
router.post("/", (req: Request, res: Response) => {
  taskController.createTask(req, res);
});

/**
 * @swagger
 * /tasks/timeline:
 *   get:
 *     summary: Obtém a linha do tempo de tarefas do usuário
 *     tags: [Tasks]
 *     parameters:
 *       - in: query
 *         name: user_id
 *         required: true
 *         schema:
 *           type: number
 *       - in: query
 *         name: order_by
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *     responses:
 *       200:
 *         description: Lista de tarefas do usuário
 *       400:
 *         description: Erro ao buscar tarefas
 */
router.get("/timeline", (req: Request, res: Response) => {
  taskController.timelineTasks(req, res);
});

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Edita uma tarefa
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               task:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tarefa editada com sucesso
 *       400:
 *         description: Erro ao editar tarefa
 */
router.put("/:id", (req: Request, res: Response) => {
  taskController.editTask(req, res);
});

/**
 * @swagger
 * /tasks/{id}/completed:
 *   put:
 *     summary: Altera o status de conclusão de uma tarefa
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Status atualizado com sucesso
 *       400:
 *         description: Erro ao atualizar status
 */
router.put("/:id/completed", (req: Request, res: Response) => {
  taskController.editCompleted(req, res);
});

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Deleta uma tarefa
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Tarefa deletada com sucesso
 *       400:
 *         description: Erro ao deletar tarefa
 */
router.delete("/:id", (req: Request, res: Response) => {
  taskController.deleteTask(req, res);
});

export default router;
