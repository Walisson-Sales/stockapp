import { Request, Response } from "express";
import categoriaService from "../services/categoriaService";
import { Categoria } from "../generated/prisma";
import { createCategoriaSchema, updateCategoriaSchema } from "../schemas/validation";
import { ZodError } from "zod";

const categoriaController = {
    async criarCategoria(req: Request, res: Response){
        try{ 
            const dadosValidados = createCategoriaSchema.parse(req.body);
            const categoria: Categoria = await categoriaService.criarCategoria(dadosValidados as any);
            res.status(201).json(categoria);
        } catch (error: any){
            if (error instanceof ZodError) {
                const mensagens = error.issues
                  .map(issue => `${issue.path.join('.')}: ${issue.message}`)
                  .join(', ');
                return res.status(400).json({ message: `Erro de validação: ${mensagens}` });
            }
            return res.status(400).json({ message: "Erro ao criar categoria: " + error.message });
        }
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
        try {
            const id: number = parseInt(req.params.id);
            const dadosValidados = updateCategoriaSchema.parse(req.body);
            const categoria = await categoriaService.atualizarCategoria(id, dadosValidados as any);
            res.json(categoria);
        } catch(error: any) {
            if (error instanceof ZodError) {
                const mensagens = error.issues
                  .map(issue => `${issue.path.join('.')}: ${issue.message}`)
                  .join(', ');
                return res.status(400).json({ message: `Erro de validação: ${mensagens}` });
            }
            
            if (error.message?.includes("não encontrada") || error.code === 'P2025') {
                return res.status(404).json({ message: "Categoria não encontrada" });
            }

            return res.status(400).json({ message: "Erro ao atualizar: " + error.message });
        }
    },
    async deletarCategoria(req: Request, res: Response){
        try { 
            const id: number = parseInt(req.params.id);
            await categoriaService.deletarCategoria(id);
            res.status(204).end();
        } catch (error: any) {
            if (error.code === 'P2003') {
                return res.status(400).json({ 
                    message: "Não é possível excluir esta categoria pois ela possui produtos associados." 
                });
            }
            
            // P2025 = o registro para deletar não foi encontrado
            if (error.code === 'P2025') {
                return res.status(404).json({ message: "Categoria não encontrada." });
            }

            return res.status(500).json({ message: "Erro interno ao excluir categoria." });
        }
    }
}

export default categoriaController;