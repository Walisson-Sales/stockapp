import prisma from "../database/prisma";

const estoqueService = {
    async listarEstoque() {
        return prisma.estoque.findMany({
            include: { produto: true },
        });
    },

    async atualizarQuantidade(idProduto: number, novaQuantidade: number) {
        const existente = await prisma.estoque.findUnique({ where: { idProduto } });

        if (existente) {
            return prisma.estoque.update({
                where: { idProduto },
                data: { quantidadeAtual: novaQuantidade },
            });
        } else {
            return prisma.estoque.create({
                data: {
                    idProduto,
                    quantidadeAtual: novaQuantidade,
                    quantidadeMinima: 0,
                    status: "Disponivel",
                },
            });
        }
    },
};

export default estoqueService;