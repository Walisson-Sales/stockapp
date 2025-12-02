import { Router } from "express";
import produtosController from "../controllers/produtosController";
import { validateBody, validateParams } from '../middlewares/validation';
import { updateProdutoSchema, idParamSchema, createProdutoSchema } from '../schemas/validation';
import { authenticate } from '../middlewares/auth';

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
 *         - cor
 *         - tamanho
 *         - precoCusto
 *         - precoVenda
 *         - idCategoria
 *         - idUsuario
 *         - estoque
 *       properties:
 *         nome:
 *           type: string
 *           description: Nome do produto.
 *           example: "Camiseta"
 *         cor:
 *           type: string
 *           description: Cor do produto.
 *           example: "Vermelho"
 *         tamanho:
 *           type: string
 *           description: Tamanho do produto.
 *           example: "Grande"
 *         precoCusto:
 *           type: number
 *           format: float
 *           description: Preço de custo do produto.
 *           example: 30.00
 *         precoVenda:
 *           type: number
 *           format: float
 *           description: Preço de venda do produto.
 *           example: 59.99
 *         idCategoria:
 *           type: integer
 *           description: ID da categoria do produto.
 *           example: 1
 *         idUsuario:
 *           type: integer
 *           description: ID do usuário que cadastrou o produto.
 *           example: 1
 *         estoque:
 *           type: object
 *           description: Informações sobre o estoque do produto.
 *           properties:
 *             quantidadeAtual:
 *               type: integer
 *               description: Quantidade atual em estoque.
 *               example: 100
 *             quantidadeMinima:
 *               type: integer
 *               description: Quantidade mínima antes de precisar repor.
 *               example: 20
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
router.get("/produtos", authenticate, produtosController.listarTodosProdutos);

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
router.get("/produtos/:id", authenticate, validateParams(idParamSchema), produtosController.pegarProdutoPorId);

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
router.post("/produtos", authenticate, validateBody(createProdutoSchema), produtosController.criarProduto);

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
router.put("/produtos/:id", authenticate, validateParams(idParamSchema), validateBody(updateProdutoSchema), produtosController.atualizarProduto);

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
router.delete("/produtos/:id", authenticate, validateParams(idParamSchema), produtosController.deletarProduto);

export default router;
