import { Router } from "express";
import movimentacaoController from "../controllers/movimentacaoController";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Movimentações
 *   description: Gerenciamento de movimentações no estoque.
 */

/**
 * @swagger
 * /movimentacoes:
 *   post:
 *     summary: Registrar uma nova movimentação (entrada/saída)
 *     tags: [Movimentações]
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
router.post("/movimentacoes", movimentacaoController.registrarMovimentacao);

/**
 * @swagger
 * /movimentacoes:
 *   get:
 *     summary: Listar movimentações
 *     tags: [Movimentações]
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
router.get("/movimentacoes", movimentacaoController.listarMovimentacoes);

/**
 * @swagger
 * /movimentacoes/{id}:
 *   put:
 *     summary: Atualiza uma movimentação existente
 *     tags: [Movimentações]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da movimentação a ser atualizada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tipoMovimentacao
 *               - quantidade
 *               - idUsuario
 *               - idProduto
 *             properties:
 *               tipoMovimentacao:
 *                 type: string
 *                 description: Tipo da movimentação (entrada ou saída)
 *                 example: "entrada"
 *               quantidade:
 *                 type: integer
 *                 description: Quantidade movimentada
 *                 example: 10
 *               idUsuario:
 *                 type: integer
 *                 description: ID do usuário responsável
 *                 example: 2
 *               idProduto:
 *                 type: integer
 *                 description: ID do produto movimentado
 *                 example: 5
 *     responses:
 *       200:
 *         description: Movimentação atualizada com sucesso
 *       404:
 *         description: Movimentação não encontrada
 *       400:
 *         description: Erro na validação dos dados enviados
 */
router.put("/:id", movimentacaoController.alterarMovimentacao);

/**
 * @swagger
 * /movimentacoes/{id}:
 *   delete:
 *     summary: Deleta uma movimentação pelo ID
 *     tags: [Movimentações]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da movimentação a ser deletada
 *     responses:
 *       200:
 *         description: Movimentação deletada com sucesso
 *       404:
 *         description: Movimentação não encontrada
 */
router.delete("/:id", movimentacaoController.deletarMovimentacao);

export default router;