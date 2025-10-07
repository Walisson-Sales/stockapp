import prisma from "../database/prisma";
import estoqueService from "./estoqueService";

const movimentacaoService = {
    async registrarMovimentacao(data: { idProduto: number; tipoMovimentacao: "Entrada" | "Saída"; quantidade: number; idUsuario: number }) {
        const { idProduto, tipoMovimentacao, quantidade, idUsuario } = data;

        // Verifica se o produto existe
        const produto = await prisma.produto.findUnique({ where: { id: idProduto } });
        if (!produto) {
            throw new Error("Produto não encontrado.");
        }

        // Busca ou cria o estoque do produto
        let estoque = await prisma.estoque.findUnique({ where: { idProduto } });
        if (!estoque) {
            estoque = await prisma.estoque.create({
                data: { idProduto, quantidadeAtual: 0, quantidadeMinima: 0, status: "Disponivel" },
            });
        }

        // Calcula nova quantidade
        let novaQuantidade = estoque.quantidadeAtual;

        if (tipoMovimentacao.toLowerCase() === "entrada") {
            novaQuantidade += quantidade;
        } else if (tipoMovimentacao.toLowerCase() === "saída" || tipoMovimentacao.toLowerCase() === "saida") {
            if (quantidade > estoque.quantidadeAtual) {
                throw new Error("Estoque insuficiente para saída.");
            }
            novaQuantidade -= quantidade;
        } else {
            throw new Error("Tipo de movimentação inválido. Use 'Entrada' ou 'Saída'.");
        }

        // Atualiza o estoque
        await estoqueService.atualizarQuantidade(idProduto, novaQuantidade);

        // Registra a movimentação
        const movimentacao = await prisma.movimentacao.create({
            data: {
                idProduto,
                idUsuario,
                tipoMovimentacao,
                quantidade,
                descricao: tipoMovimentacao.toLowerCase() === "entrada" ? "Entrada de produto" : "Saída de produto",
            },
        });

        return { movimentacao, novaQuantidade };
    },

    async listarMovimentacoes() {
        return prisma.movimentacao.findMany({
            include: { produto: true, usuario: true },
            orderBy: { dataMovimentacao: "desc" },
        });
    },

    async alterarMovimentacao(id: number, data: { quantidade: number }) {
        const movimentacao = await prisma.movimentacao.findUnique({ where: { id } });
        if (!movimentacao) {
            throw new Error("Movimentação não encontrada.");
        }

        const { idProduto, tipoMovimentacao, quantidade } = movimentacao;
        const novaQuantidade = tipoMovimentacao === "Entrada" ? quantidade + data.quantidade : quantidade - data.quantidade;

        // Verifica se a nova quantidade é válida
        if (novaQuantidade < 0) {
            throw new Error("Nova quantidade não pode ser negativa.");
        }

        // Atualiza o estoque
        await estoqueService.atualizarQuantidade(idProduto, novaQuantidade);

        // Atualiza a movimentação
        return prisma.movimentacao.update({
            where: { id },
            data: { quantidade: novaQuantidade },
        });
    },
    async deletarMovimentacao(id: number) {
        const movimentacao = await prisma.movimentacao.findUnique({ where: { id } });
        if (!movimentacao) {
            throw new Error("Movimentação não encontrada.");
        }

        const { idProduto, quantidade } = movimentacao;

        // Atualiza o estoque
        await estoqueService.atualizarQuantidade(idProduto, quantidade);

        // Deleta a movimentação
        return prisma.movimentacao.delete({ where: { id } });
    },
};

export default movimentacaoService;