import { z } from "zod";

export const movementSchema = z.object({
  type: z.union([
    z.literal("entrada"),
    z.literal("saida")
  ], {
    error: "O tipo é obrigatório"
  }),
  quantity: z.number().min(1, "Quantidade deve ser maior que zero"),
  productId: z.number().int().positive("ID do produto inválido")
});

export type MovementInput = z.infer<typeof movementSchema>;