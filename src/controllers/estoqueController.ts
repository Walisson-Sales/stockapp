import { Request, Response } from "express";
import estoqueService from "../services/estoqueService";

const estoqueController = {
    async listarEstoque(req: Request, res: Response) {
        try {
            const lista = await estoqueService.listarEstoque();
            res.json(lista);
        } catch (error) {
            res.status(500).json({ error: "Erro ao listar estoque." });
        }
    },
};

export default estoqueController;