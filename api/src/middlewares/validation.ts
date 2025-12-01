import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

/**
 * Middleware para validar o corpo (body) da requisição.
 * Usado geralmente em rotas POST e PUT para validar os dados enviados em JSON.
 */
export const validateBody = (schema: z.ZodType<any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Usa parseAsync para permitir validações assíncronas se necessário
      const validatedData = await schema.parseAsync(req.body);
      
      // Substitui o req.body pelos dados validados e tipados
      req.body = validatedData;
      next();
    } catch (error: unknown) {
      handleZodError(error, res, "Dados de entrada inválidos no corpo da requisição");
      if (!(error instanceof ZodError)) next(error);
    }
  };
};

/**
 * Middleware para validar parâmetros de rota (URL params).
 * Ex: /produtos/:id -> valida o ":id"
 * Útil para garantir que IDs sejam números positivos, por exemplo.
 */
export const validateParams = (schema: z.ZodType<any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedParams = await schema.parseAsync(req.params);
      // (req as any) é usado porque o Zod pode transformar tipos (ex: string "1" vira number 1),
      // e precisamos forçar o TypeScript a aceitar essa mudança nos params do Express.
      (req as any).params = validatedParams;
      next();
    } catch (error: unknown) {
      handleZodError(error, res, "Parâmetros de rota inválidos");
      if (!(error instanceof ZodError)) next(error);
    }
  };
};

/**
 * Middleware para validar parâmetros de consulta (Query params).
 * Ex: /produtos?filtro=nome&pagina=2 -> valida o "?filtro=..."
 */
export const validateQuery = (schema: z.ZodType<any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedQuery = await schema.parseAsync(req.query);
      (req as any).query = validatedQuery;
      next();
    } catch (error: unknown) {
      handleZodError(error, res, "Parâmetros de consulta inválidos");
      if (!(error instanceof ZodError)) next(error);
    }
  };
};

/**
 * Função auxiliar interna para formatar e retornar os erros do Zod.
 * Evita repetição de código nos middlewares acima.
 */
const handleZodError = (error: unknown, res: Response, defaultMessage: string) => {
  if (error instanceof ZodError) {
    return res.status(400).json({
      erro: "Erro de Validação",
      mensagem: defaultMessage,
      detalhes: error.issues.map((issue) => ({
        campo: issue.path.join("."), // Mostra o caminho do campo (ex: "endereco.rua")
        mensagem: issue.message,     // A mensagem definida no schema (ex: "Rua obrigatória")
      })),
    });
  }
  // Se não for erro do Zod, não faz nada aqui e deixa o 'next(error)' lidar com isso.
};