import { Router } from "express";
import estoqueController from "../controllers/estoqueController";
import { authenticate } from '../middlewares/auth';
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Estoque
 *   description: Gerenciamento do estoque.
 */

/**
 * @swagger
 * /estoque:
 *   get:
 *     summary: Lista todos os produtos com informações de estoque
 *     tags: [Estoque]
 *     responses:
 *       200:
 *         description: Lista de produtos com seus respectivos dados de estoque
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   nome:
 *                     type: string
 *                     example: "Conjunto de cozinha com 7 peças"
 *                   quantidadeAtual:
 *                     type: integer
 *                     example: 100
 *                   quantidadeMinima:
 *                     type: integer
 *                     example: 20
 *                   idProduto:
 *                     type: integer
 *                     example: 5
 *       500:
 *         description: Erro interno ao buscar o estoque
 */
router.get("/estoque", estoqueController.listarEstoque);
// ADICIONAR O authenticate DEPOIS
export default router;