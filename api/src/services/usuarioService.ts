import prisma from "../database/prisma";
import { Usuario } from "../generated/prisma";
import bcrypt from "bcryptjs";

const usuarioService = {
  async listarTodosUsuarios(): Promise<Usuario[]> {
    return prisma.usuario.findMany({
      include: {
        movimentacoes: {
          select: {
            tipoMovimentacao: true,
            quantidade: true,
            dataMovimentacao: true,
          },
        },
        produtos: true,
      },
    });
  },

  async pegarUsuarioPorId(id: number): Promise<Usuario | null> {
    return prisma.usuario.findUnique({ where: { id } });
  },

  async criarUsuario(data: {
    nome: string;
    email: string;
    senha: string;
    nomeEmpresa: string;
    tipoComercio: string;
    cpfCnpj: string;
  }): Promise<Usuario> {
    // 1. Gerar o "salt" e fazer o hash da senha
    const salt = await bcrypt.genSalt(10);
    const senhaHasheada = await bcrypt.hash(data.senha, salt);

    // 2. Criar o usuário usando a senha hasheada
    const usuario = await prisma.usuario.create({
      data: {
        ...data,
        senha: senhaHasheada, // Substitui a senha em texto puro pelo hash
      },
    });
    return usuario;
  },

  async atualizarUsuario(
    id: number,
    data: {
      nome?: string;
      email?: string;
      senha?: string;
      nomeEmpresa?: string;
      tipoComercio?: string;
      cpfCnpj?: string;
    }
  ): Promise<Usuario> {
    return prisma.usuario.update({
      where: { id },
      data,
    });
  },

  async deletarUsuario(id: number): Promise<void> {
    await prisma.usuario.delete({ where: { id } });
  },
};
// adicionar função para buscar usuário por email (usada pelo fluxo de login)
// export const pegarUsuarioPorEmail = async (
//   email: string
// ): Promise<Usuario | null> => {
//   return prisma.usuario.findUnique({ where: { email } });
// };
export default usuarioService;
