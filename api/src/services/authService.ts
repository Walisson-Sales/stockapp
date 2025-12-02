import prisma from "../database/prisma";
import { Usuario } from "../generated/prisma";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const authService = {
  // Esta função recebe o email e senha do controller
  async login(email: string, senhaTextoPuro: string) {
    // --- VALIDAÇÃO DE USUÁRIO ---
    const usuarioEncontrado = await prisma.usuario.findFirst({
      where: {
        email: email,
      },
    });

    // Verificar se o usuário existe.
    if (!usuarioEncontrado) {
      throw new Error('Credenciais inválidas');
    }

    // Comparar a senha fornecida com o hash salvo no banco.
    // 'senhaTextoPuro': é o "123" que o usuário digitou, por exemplo.
    // 'usuarioEncontrado.senha': é o hash longo (ex: $2a$10$...) salvo no banco.
    // O bcrypt faz a matemática complexa para ver se batem.
    const senhaBate = await bcrypt.compare(senhaTextoPuro, usuarioEncontrado.senha);

    // Se a senha não bater, lança erro.
    if (!senhaBate) {
      throw new Error('Credenciais inválidas');
    }

    // --- GERAÇÃO DO TOKEN JWT ---
    // Pega o segredo do arquivo .env
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        // Erro crítico se a variável de ambiente não estiver configurada
        throw new Error('JWT_SECRET não configurado no .env');
    }

    // Cria o payload (dados) que vão dentro do token.
    // Geralmente colocamos o ID do usuário para identificá-lo depois.
    const payload = { id: usuarioEncontrado.id, email: usuarioEncontrado.email };

    // Gera o token assinado.
    // expiresIn: '1h' define que o token expira em 1 hora.
    const token = jwt.sign(payload, secret, { expiresIn: '1h' });

    // Retorna o token gerado e algumas informações do usuário (sem a senha!)
    return { 
        token, 
        usuario: { id: usuarioEncontrado.id, nome: usuarioEncontrado.nome, email: usuarioEncontrado.email } 
    };
  },
};

export default authService;