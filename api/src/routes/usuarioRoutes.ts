import { Router } from "express";
import usuarioController from "../controllers/usuarioController";
import { validateBody, validateParams } from '../middlewares/validation';
import { createUsuarioSchema, updateUsuarioSchema, idParamSchema } from '../schemas/validation';
import { authenticate } from '../middlewares/auth';

const router: Router = Router();

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Gerenciamento de Usuarios
 */

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Retorna todos os usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/usuarios", authenticate, usuarioController.listarTodosUsuarios);

/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     summary: Retorna um usuario pelo ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Paciente encontrado
 *       404:
 *         description: Paciente não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/usuarios/:id", authenticate, validateParams(idParamSchema), usuarioController.pegarUsuarioPorId);

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Cria um novo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *               - senha
 *               - nomeEmpresa
 *               - tipoComercio
 *               - cpfCnpj
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *               nomeEmpresa:
 *                 type: string
 *               tipoComercio:
 *                 type: string
 *               cpfCnpj:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario criado com sucesso
 *       400:
 *         description: Erro na requisição
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/usuarios", validateBody(createUsuarioSchema), usuarioController.criarUsuario);

/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Atualiza um usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *               nomeEmpresa:
 *                 type: string
 *               tipoComercio:
 *                 type: string
 *               cpfCnpj:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario atualizado com sucesso
 *       400:
 *         description: Erro na requisição
 *       404:
 *         description: Usuario não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.put("/usuarios/:id", authenticate, validateParams(idParamSchema), validateBody(updateUsuarioSchema), usuarioController.atualizarUsuario);

/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Deleta um usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Usuario deletado com sucesso
 *       404:
 *         description: Usuario não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete("/usuarios/:id", authenticate, validateParams(idParamSchema), usuarioController.deletarUsuario);

export default router;