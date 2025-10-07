import Router, { Request, Response } from "express";
import categoryController from "../controller/categoryController";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Gerenciamento de categorias
 */

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Cria uma nova categoria
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCategoryRequest'
 *           examples:
 *             with_color:
 *               summary: Categoria com cor personalizada
 *               value:
 *                 name: "Trabalho"
 *                 color: "#FF5722"
 *                 user_id: 1
 *             default_color:
 *               summary: Categoria com cor padrão
 *               value:
 *                 name: "Estudos"
 *                 user_id: 1
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: Erro ao criar categoria
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
  categoryController.createCategory(req, res);
});

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Obtém todas as categorias de um usuário
 *     tags: [Categories]
 *     parameters:
 *       - in: query
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *         example: 1
 *     responses:
 *       200:
 *         description: Lista de categorias do usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       400:
 *         description: Erro ao buscar categorias
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
router.get("/", (req: Request, res: Response) => {
  categoryController.getCategoriesByUserId(req, res);
});

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Edita uma categoria
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da categoria
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCategoryRequest'
 *           examples:
 *             update_name_and_color:
 *               summary: Atualizar nome e cor
 *               value:
 *                 name: "Trabalho Urgente"
 *                 color: "#F44336"
 *             update_name_only:
 *               summary: Atualizar apenas o nome
 *               value:
 *                 name: "Estudos Avançados"
 *     responses:
 *       200:
 *         description: Categoria editada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: Erro ao editar categoria
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
  categoryController.editCategory(req, res);
});

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Deleta uma categoria
 *     description: Remove uma categoria e remove a associação de todas as tarefas que usavam esta categoria
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da categoria
 *         example: 1
 *     responses:
 *       200:
 *         description: Categoria deletada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessMessage'
 *       400:
 *         description: Erro ao deletar categoria
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
  categoryController.deleteCategory(req, res);
});

export default router;
