import { Request, Response } from "express";
import movimentacaoService from "../services/movimentacaoService";

const movimentacaoController = {
    async registrarMovimentacao(req: Request, res: Response) {
        try {
            const { idProduto, tipoMovimentacao, quantidade, idUsuario } = req.body;

            if (!idProduto || !tipoMovimentacao || !quantidade || !idUsuario) {
                return res.status(400).json({
                    message: "Campos obrigatórios: idProduto, tipoMovimentacao, quantidade, idUsuario.",
                });
            }

            const resultado = await movimentacaoService.registrarMovimentacao({
                idProduto,
                tipoMovimentacao,
                quantidade,
                idUsuario,
            });

            res.status(201).json(resultado);
        } catch (error: any) {
            res.status(400).json({ message: error.message || "Erro ao registrar movimentação." });
        }
    },

    async listarMovimentacoes(req: Request, res: Response) {
        try {
            const lista = await movimentacaoService.listarMovimentacoes();
            res.json(lista);
        } catch (error) {
            res.status(500).json({ error: "Erro ao listar movimentações." });
        }
    },

    async alterarMovimentacao(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const { quantidade } = req.body;

            if (!quantidade) {
                return res.status(400).json({ message: "Quantidade é um campo obrigatório." });
            }

            const resultado = await movimentacaoService.alterarMovimentacao(id, { quantidade });
            res.json(resultado);
        } catch (error: any) {
            res.status(400).json({ message: error.message || "Erro ao alterar movimentação." });
        }
    },

    async deletarMovimentacao(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const resultado = await movimentacaoService.deletarMovimentacao(id);
            res.json(resultado);
        } catch (error: any) {
            res.status(400).json({ message: error.message || "Erro ao deletar movimentação." });
        }
    },
};

export default movimentacaoController;