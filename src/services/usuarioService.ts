import prisma from "../database/prisma";
import { Usuario } from "../generated/prisma";

const usuarioService = {
    async listarTodosUsuarios(): Promise<Usuario[]> {
        return prisma.usuario.findMany({
            include: {
                movimentacoes: { select: { tipoMovimentacao: true, quantidade: true, dataMovimentacao: true } },
                produtos: true,
            }
        });
    },

    async pegarUsuarioPorId(id: number): Promise<Usuario | null> {
        return prisma.usuario.findUnique({ where: { id } });
    },

    async criarUsuario(data: { nome: string; email: string; senha: string; nomeEmpresa: string; tipoComercio: string; cpfCnpj: string }): Promise<Usuario> {
        const novoUsuario: Usuario = await prisma.usuario.create({
            data,
        });
        return novoUsuario;
    },

    async atualizarUsuario(id: number, data: { nome?: string; email?: string; senha?: string; nomeEmpresa?: string; tipoComercio?: string; cpfCnpj?: string }): Promise<Usuario> {
        return prisma.usuario.update({
            where: { id },
            data,
        });
    },

    async deletarUsuario(id: number): Promise<void> {
        await prisma.usuario.delete({ where: { id } });
    },
};

export default usuarioService;