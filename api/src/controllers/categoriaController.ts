import { Request, Response } from "express";
import categoriaService from "../services/categoriaService";
import { Categoria } from "../generated/prisma";

const categoriaController = {
    async criarCategoria(req: Request, res: Response){
        const categoria: Categoria = await categoriaService.criarCategoria(req.body);
        res.status(201).json(categoria);
    },
    async listarTodasCategorias(req: Request, res: Response){
        const categorias: Categoria[] = await categoriaService.listarTodasCategorias();
        res.json(categorias)
    },
    async pegarCategoriaPorId(req: Request, res: Response){
        const id: number = parseInt(req.params.id)
        const categoria: Categoria | null = await categoriaService.pegarCategoriaPorId(id);
        if (!categoria) res.status(404).json("Categoria não encontrada");
        res.json(categoria);
    },
    async atualizarCategoria(req: Request, res: Response){
        const id: number = parseInt(req.params.id);
        const categoria: Categoria = await categoriaService.atualizarCategoria(id, req.body);
        res.json(categoria);
    },
    async deletarCategoria(req: Request, res: Response){
        const id: number = parseInt(req.params.id);
        await categoriaService.deletarCategoria(id);
        res.status(204).end();
    }
}

export default categoriaController;