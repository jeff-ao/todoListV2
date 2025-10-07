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
 *             $ref: '#/components/schemas/CreateTaskRequest'
 *           examples:
 *             with_category:
 *               summary: Tarefa com categoria
 *               value:
 *                 task: "Estudar TypeScript"
 *                 category_id: 1
 *                 user_id: 1
 *             without_category:
 *               summary: Tarefa sem categoria
 *               value:
 *                 task: "Fazer compras"
 *                 category_id: null
 *                 user_id: 1
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Erro ao criar tarefa
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
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
 *           type: integer
 *         description: ID do usuário
 *         example: 1
 *       - in: query
 *         name: order_by
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Ordem de classificação por data de criação
 *         example: desc
 *     responses:
 *       200:
 *         description: Lista de tarefas do usuário com categorias incluídas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       400:
 *         description: Erro ao buscar tarefas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
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
 *           type: integer
 *         description: ID da tarefa
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTaskRequest'
 *           examples:
 *             update_with_category:
 *               summary: Atualizar tarefa com categoria
 *               value:
 *                 task: "Estudar TypeScript avançado"
 *                 category_id: 2
 *             update_remove_category:
 *               summary: Remover categoria da tarefa
 *               value:
 *                 task: "Estudar programação"
 *                 category_id: null
 *     responses:
 *       200:
 *         description: Tarefa editada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Erro ao editar tarefa
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
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
 *           type: integer
 *         description: ID da tarefa
 *         example: 1
 *     responses:
 *       200:
 *         description: Status atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Erro ao atualizar status
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
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
 *           type: integer
 *         description: ID da tarefa
 *         example: 1
 *     responses:
 *       200:
 *         description: Tarefa deletada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessMessage'
 *       400:
 *         description: Erro ao deletar tarefa
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete("/:id", (req: Request, res: Response) => {
  taskController.deleteTask(req, res);
});

export default router;
