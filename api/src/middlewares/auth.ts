import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  id: number;
  iat?: number;
  exp?: number;
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ erro: 'Token de autorização ausente' });
  }

  const token = authHeader.slice(7).trim(); // remove "Bearer "
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error('ERRO FATAL: JWT_SECRET não está no .env do middleware.');
    return res.status(500).json({ erro: 'Configuração do servidor inválida' });
  }

  try {
    const decoded = jwt.verify(token, secret) as JwtPayload;
    // Anexar o id do usuário ao request para uso posterior
    (req as any).userId = decoded.id;
    next();
  } catch (err) {
    console.error('--- FIM DO MIDDLEWARE (ERRO) ---'); // LOG 8
    // Vamos ver o erro exato que o jwt.verify lançou
    // console.error('6. Erro na verificação:', err, '-', err);
    return res.status(401).json({ erro: 'Token inválido ou expirado' });
  }
};