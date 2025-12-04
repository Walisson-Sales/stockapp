import { Request, Response, NextFunction } from 'express';
import authService from "../services/authService"

const authController = {
  // Esta função lida com a requisição POST /login
  async login(req: Request, res: Response) {
    try {
      // Extrai email e senha do corpo da requisição (JSON)
      const { email, senha } = req.body;

      // Validação básica: verifica se email e senha foram enviados
      if (!email || !senha) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios' });
      }

      // Chama o serviço de autenticação para realizar o login
      // const resultado = await authService.login(email, senha);

      // Se tudo der certo, retorna status 200 (OK) com o token e dados do usuário
      // return res.status(200).json(resultado);
      console.log("Login chamado com:", email, senha);

    } catch (error: any) {
      // Se o serviço lançar um erro (ex: "Credenciais inválidas")
      if (error.message === 'Credenciais inválidas') {
        // Retorna status 401 (Não Autorizado)
        return res.status(401).json({ message: error.message });
      }
      
      // Para outros erros inesperados, retorna status 500 (Erro Interno do Servidor)
      console.error('Erro no login:', error); // Loga o erro no terminal para debug
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  },
};

export default authController;