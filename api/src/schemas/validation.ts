import { z } from "zod";

// =========================================
// Schema para Usuário
// =========================================

// Validação para criar um novo usuário
export const createUsuarioSchema = z.object({
  nome: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres"),
  email: z
    .string()
    .email({ message: "Email deve ter um formato válido" })
    .max(255, "Email deve ter no máximo 255 caracteres"),
  senha: z
    .string()
    .min(6, "Senha deve ter pelo menos 6 caracteres")
    .max(100, "Senha deve ter no máximo 100 caracteres"),
  nomeEmpresa: z
    .string()
    .min(2, "Nome da empresa deve ter pelo menos 2 caracteres")
    .max(150)
    .optional(), // Opcional, dependendo da sua regra de negócio
});

// Validação específica para a rota de login
export const loginUsuarioSchema = z.object({
  email: z
    .string()
    .email({ message: "Formato de email inválido para login" }),
  senha: z
    .string()
    .min(1, "A senha é obrigatória"), // No login não precisamos validar requisitos de complexidade, apenas se foi enviada
});

// Para atualizar, usamos o schema de criação mas tornamos tudo opcional
export const updateUsuarioSchema = createUsuarioSchema.partial();

// =========================================
// Schema para Categoria
// =========================================

export const createCategoriaSchema = z.object({
  nome: z
    .string()
    .min(2, "O nome da categoria deve ter pelo menos 2 caracteres")
    .max(50, "O nome da categoria deve ter no máximo 50 caracteres")
    // Nota: Em uma API real, você talvez queira remover espaços em branco extras
    .trim(),
});

export const updateCategoriaSchema = createCategoriaSchema.partial();

// =========================================
// Schema para Produto
// =========================================

export const createProdutoSchema = z.object({
  nome: z
    .string()
    .min(2, "Nome do produto deve ter pelo menos 2 caracteres")
    .max(150, "Nome do produto muito longo")
    .trim(),
  descricao: z
    .string()
    .max(500, "A descrição não pode passar de 500 caracteres")
    .optional(),
  // Usamos number() estrito aqui. Se seu front-end envia strings que parecem números,
  // você pode precisar usar z.coerce.number() em vez disso.
  precoCusto: z
    .number({ message: "Preço de custo deve ser um número" })
    .positive("O preço de custo deve ser maior que zero"),
  precoVenda: z
    .number({ message: "Preço de venda deve ser um número" })
    .positive("O preço de venda deve ser maior que zero"),
  quantidade: z
    .number({ message: "A quantidade deve ser um número" })
    .int("A quantidade deve ser um número inteiro")
    .nonnegative("A quantidade não pode ser negativa"), // Permite 0
  // Validação de chaves estrangeiras (Foreign Keys)
  categoriaId: z
    .number({ message: "ID da categoria inválido" })
    .int()
    .positive("O ID da categoria deve ser positivo"),
  // Opcional: se o produto precisa estar atrelado a quem criou
  usuarioId: z
    .number({ message: "ID do usuário inválido" })
    .int()
    .positive()
    .optional(),
});

export const updateProdutoSchema = createProdutoSchema.partial();

// =========================================
// Schema Utilitário para validação de IDs na URL
// =========================================
// Exemplo de uso: rotas como GET /produtos/:id ou PUT /categorias/:id
export const idParamSchema = z.object({
  id: z
    .string()
    // Verifica se a string contém apenas dígitos
    .regex(/^\d+$/, "ID deve ser um número válido")
    // Converte a string da URL para número
    .transform(Number)
    // Garante que o número resultante seja válido como ID de banco de dados
    .refine((num: number) => num > 0, "O ID deve ser um número positivo"),
});

// =========================================
// Tipos TypeScript derivados dos schemas
// =========================================
// Isso ajuda a ter tipagem automática nos controllers baseada na validação

// Usuário
export type CreateUsuarioData = z.infer<typeof createUsuarioSchema>;
export type LoginUsuarioData = z.infer<typeof loginUsuarioSchema>;
export type UpdateUsuarioData = z.infer<typeof updateUsuarioSchema>;

// Categoria
export type CreateCategoriaData = z.infer<typeof createCategoriaSchema>;
export type UpdateCategoriaData = z.infer<typeof updateCategoriaSchema>;

// Produto
export type CreateProdutoData = z.infer<typeof createProdutoSchema>;
export type UpdateProdutoData = z.infer<typeof updateProdutoSchema>;

// Params
export type IdParam = z.infer<typeof idParamSchema>;