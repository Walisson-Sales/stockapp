import { Router } from "express";
import categoriaController from "../controllers/categoriaController";
import { validateBody, validateParams } from '../middlewares/validation';
import { createCategoriaSchema, updateCategoriaSchema, idParamSchema } from '../schemas/validation';
const router: Router = Router();

/**
 * @swagger
 * tags:
 *   name: Categorias
 *   description: Gerenciamento de categorias.
 */

/**
 * @swagger
 * /categorias:
 *   post:
 *     summary: Cria uma nova categoria
 *     tags: [Categorias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: O nome da nova categoria.
 *                 example: "Toalhas de Banho"
 *               descricao:
 *                 type: string
 *                 description: Uma descrição opcional para a categoria.
 *                 example: "Toalhas grandes e macias para o corpo."
 *             required:
 *               - nome
 *     responses:
 *       '201':
 *         description: Categoria criada com sucesso.
 *       '400':
 *         description: Dados de entrada inválidos.
 */
router.post("/categorias", validateBody(createCategoriaSchema), categoriaController.criarCategoria);

/**
 * @swagger
 * /categorias:
 *   get:
 *     summary: Listar todas as categorias
 *     tags:
 *       - Categorias
 *     responses:
 *       '200':
 *         description: Lista de categorias retornada com sucesso.
 *       '500':
 *         description: Erro interno do servidor.
 */
router.get("/categorias", categoriaController.listarTodasCategorias);

/**
 * @swagger
 * /categorias/{id}:
 *   get:
 *     summary: Retorna a categoria com o id fornecido
 *     tags:
 *       - Categorias
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Id da categoria
 *     responses:
 *       '200':
 *         description: Categoria encontrada com sucesso.
 *       '400':
 *         description: Id inválido.
 *       '404':
 *         description: Categoria não encontrada.
 */
router.get("/categorias/:id", validateParams(idParamSchema), categoriaController.pegarCategoriaPorId);

/**
 * @swagger
 * /categoria/{id}:
 *   put:
 *     summary: Atualiza uma categoria existente
 *     tags:
 *       - Categorias
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Id da categoria a ser atualizada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: O novo nome da categoria.
 *                 example: "Toalhas de Banho"
 *               descricao:
 *                 type: string
 *                 description: Uma nova descrição para a categoria.
 *                 example: "Toalhas grandes e macias para o corpo."
 *             required:
 *               - nome
 *     responses:
 *       '200':
 *         description: Categoria atualizada com sucesso.
 *       '400':
 *         description: Dados de entrada inválidos.
 *       '404':
 *         description: Categoria não encontrada.
 */
router.put("/categorias/:id", validateParams(idParamSchema), validateBody(updateCategoriaSchema), categoriaController.atualizarCategoria);

/**
 * @swagger
 * /categoria/{id}:
 *   delete:
 *     summary: Deleta uma categoria existente
 *     tags:
 *       - Categorias
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Id da categoria a ser deletada
 *     responses:
 *       '204':
 *         description: Categoria deletada com sucesso.
 *       '404':
 *         description: Categoria não encontrada.
 */
router.delete("/categorias/:id", validateParams(idParamSchema), categoriaController.deletarCategoria);

export default router;
