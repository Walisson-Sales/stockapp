import { Request, Response } from "express";
import usuarioService from "../services/usuarioService";
import { Usuario } from "../generated/prisma";

const usuarioController = {
    async criarUsuario(req: Request, res: Response){
        try{
            const usuario: Usuario = await usuarioService.criarUsuario(req.body);
            res.status(201).json(usuario);
        } catch(error:any){
            return res.status(500).json({ message: error.message });
        }
    },
    async listarTodosUsuarios(req: Request, res: Response){
        try {
            const usuarios: Usuario[] = await usuarioService.listarTodosUsuarios();
        res.json(usuarios)
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    },
    async pegarUsuarioPorId(req: Request, res: Response){
        try {
            const id: number = parseInt(req.params.id)
            const usuario: Usuario | null = await usuarioService.pegarUsuarioPorId(id);
            if (!usuario) res.status(404).json("usuario não encontrado");
            res.json(usuario);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    },
    async atualizarUsuario(req: Request, res: Response){
        try {
            const id: number = parseInt(req.params.id);
            const usuario: Usuario = await usuarioService.atualizarUsuario(id, req.body);
            res.json(usuario);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    },
    async deletarUsuario(req: Request, res: Response){
        try {
            const id: number = parseInt(req.params.id);
            await usuarioService.deletarUsuario(id);
            res.status(204).end();
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export default usuarioController;