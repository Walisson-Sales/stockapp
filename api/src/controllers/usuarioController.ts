import { Request, Response } from "express";
import usuarioService from "../services/usuarioService";
import { Usuario } from "../generated/prisma";

const usuarioController = {
  async criarUsuario(req: Request, res: Response) {
    try {
      const usuario: Usuario = await usuarioService.criarUsuario(req.body);
      res.status(201).json(usuario);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },
  // endpoint de login (implementação mínima — compara senha em texto)
  async loginUsuario(req: Request, res: Response) {
    try {
      const { email, senha } = req.body;
      // usa a função nomeada do service para buscar por email
      const usuario: Usuario | null = await pegarUsuarioPorEmail(email);
      // validação mínima: verifica existência e igualdade da senha (texto)
      if (!usuario || (usuario as any).senha !== senha) {
        return res.status(401).json({ message: "Credenciais inválidas" });
      }
      // remove a senha antes de retornar os dados do usuário
      const { senha: _, ...safeUser } = usuario as any;
      return res.status(200).json(safeUser);
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: error.message || "Erro no login" });
    }
  },
  async listarTodosUsuarios(req: Request, res: Response) {
    try {
      const usuarios: Usuario[] = await usuarioService.listarTodosUsuarios();
      res.json(usuarios);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },
  async pegarUsuarioPorId(req: Request, res: Response) {
    try {
      const id: number = parseInt(req.params.id);
      const usuario: Usuario | null = await usuarioService.pegarUsuarioPorId(
        id
      );
      if (!usuario) res.status(404).json("usuario não encontrado");
      res.json(usuario);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },
  async atualizarUsuario(req: Request, res: Response) {
    try {
      const id: number = parseInt(req.params.id);
      const usuario: Usuario = await usuarioService.atualizarUsuario(
        id,
        req.body
      );
      res.json(usuario);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },
  async deletarUsuario(req: Request, res: Response) {
    try {
      const id: number = parseInt(req.params.id);
      await usuarioService.deletarUsuario(id);
      res.status(204).end();
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },
};

export default usuarioController;
