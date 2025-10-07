import { Router } from "express";
import movimentacaoController from "../controllers/movimentacaoController";

const router = Router();

/**
 * @swagger
 * /movimentacoes:
 *   post:
 *     summary: Registrar uma nova movimentação (entrada/saída)
 *     tags:
 *       - Movimentacoes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MovimentacaoInput'
 *           example:
 *             idProduto: 123
 *             tipoMovimentacao: "entrada"
 *             quantidade: 10
 *             idUsuario: 42
 *             descricao: "Reposição de estoque"
 *     responses:
 *       '201':
 *         description: Movimentação registrada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movimentacao'
 *       '400':
 *         description: Dados de entrada inválidos.
 *       '500':
 *         description: Erro interno do servidor.
 */
router.post("/", movimentacaoController.registrarMovimentacao);

/**
 * @swagger
 * /movimentacoes:
 *   get:
 *     summary: Listar movimentações
 *     tags:
 *       - Movimentacoes
 *     description: Retorna uma lista de movimentações. Pode filtrar por `produtoId` e `tipo`.
 *     parameters:
 *       - in: query
 *         name: produtoId
 *         schema:
 *           type: integer
 *         required: false
 *         description: Filtrar por id do produto.
 *       - in: query
 *         name: tipo
 *         schema:
 *           type: string
 *           enum: [entrada, saida]
 *         required: false
 *         description: Filtrar por tipo de movimentação.
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *     responses:
 *       '200':
 *         description: Lista de movimentações retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movimentacao'
 *       '500':
 *         description: Erro interno do servidor.
 */
router.get("/", movimentacaoController.listarMovimentacoes);

export default router;