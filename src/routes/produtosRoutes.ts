import { Router } from "express";
import produtosController from "../controllers/produtosController";

const router: Router = Router();

/**
 * @swagger
 * tags:
 *   name: Produtos
 *   description: API para gerenciamento de produtos.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Produto:
 *       type: object
 *       required:
 *         - nome
 *         - descricao
 *         - preco
 *         - estoque
 *         - categoria
 *         - usuarioId
 *       properties:
 *         id:
 *           type: integer
 *           description: O ID do produto.
 *         nome:
 *           type: string
 *           description: O nome do produto.
 *         descricao:
 *           type: string
 *           description: A descrição do produto.
 *         preco:
 *           type: number
 *           description: O preço do produto.
 *         estoque:
 *           type: integer
 *           description: A quantidade em estoque.
 *         categoria:
 *           type: string
 *           description: A categoria do produto.
 *         usuarioId:
 *           type: integer
 *           description: O ID do usuário que cadastrou o produto.
 *       example:
 *         id: 1
 *         nome: "Camiseta"
 *         descricao: "Camiseta de algodão"
 *         preco: 49.99
 *         estoque: 100
 *         categoria: "Vestuário"
 *         usuarioId: 1
 */

/**
 * @swagger
 * /produtos:
 *   get:
 *     summary: Lista todos os produtos
 *     tags: [Produtos]
 *     responses:
 *       200:
 *         description: A lista de produtos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Produto'
 */
router.get("/produtos", produtosController.listarTodosProdutos);

/**
 * @swagger
 * /produtos/{id}:
 *   get:
 *     summary: Pega um produto pelo ID
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: O ID do produto
 *     responses:
 *       200:
 *         description: O produto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *       404:
 *         description: Produto não encontrado
 */
router.get("/produtos/:id", produtosController.pegarProdutoPorId);

/**
 * @swagger
 * /produtos:
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Produtos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Produto'
 *     responses:
 *       201:
 *         description: O produto foi criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *       400:
 *         description: Erro de validação
 */
router.post("/produtos", produtosController.criarProduto);

/**
 * @swagger
 * /produtos/{id}:
 *   put:
 *     summary: Atualiza um produto existente
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: O ID do produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Produto'
 *     responses:
 *       200:
 *         description: O produto foi atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *       400:
 *         description: Erro de validação
 *       404:
 *         description: Produto não encontrado
 */
router.put("/produtos/:id", produtosController.atualizarProduto);

/**
 * @swagger
 * /produtos/{id}:
 *   delete:
 *     summary: Deleta um produto existente
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: O ID do produto
 *     responses:
 *       204:
 *         description: O produto foi deletado com sucesso
 *       404:
 *         description: Produto não encontrado
 */
router.delete("/produtos/:id", produtosController.deletarProduto);

export default router;
