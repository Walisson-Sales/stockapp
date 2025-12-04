import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Box,
  Alert,
} from "@mui/material";
import api from "../api";
import { movementSchema } from "../schemas/movementSchema";
import { z } from "zod";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  defaultUserId?: number;
};

type Product = { id: number; nome: string; quantidade: number };

const MovementModal: React.FC<Props> = ({
  open,
  onClose,
  onSuccess,
  defaultUserId,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    productId: 0,
    type: "entrada",
    quantity: 1,
    userId: defaultUserId || 0,
  });

  useEffect(() => {
    if (!open) return;

    const load = async () => {
      try {
        setLoadingProducts(true);
        const res = await api.get("/produtos");
        setProducts(res.data || []);
        setLoadingProducts(false);
      } catch {
        setLoadingProducts(false);
        setError("Erro ao carregar produtos.");
      }
    };

    load();
    setError(null);
    setForm((f) => ({ ...f, userId: defaultUserId || f.userId }));
  }, [open, defaultUserId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "quantity" || name === "userId" || name === "productId"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async () => {
    setError(null);

    // validação com safeParse
    const parsed = movementSchema.safeParse({
      type: form.type,
      quantity: form.quantity,
      productId: form.productId,
    });

    if (!parsed.success) {
      setError(parsed.error.issues.map((i: z.ZodIssue) => i.message).join("; "));
      return;
    }

    try {
      setSubmitting(true);
      // mapear para os nomes esperados pelo backend
      const payload = {
        idProduto: Number(parsed.data.productId),
        tipoMovimentacao: parsed.data.type === "entrada" ? "Entrada" : "Saída",
        quantidade: parsed.data.quantity,
        idUsuario: Number(form.userId),
      };

      await api.post("/movimentacoes", payload);
      setSubmitting(false);
      onSuccess?.();
      onClose();
    } catch (error: unknown) {
      setSubmitting(false);

      // Erro de validação Zod (se por algum motivo pipocar aqui)
      if (error instanceof z.ZodError) {
        const zErr = error as z.ZodError;
        setError(zErr.issues.map((issue: z.ZodIssue) => issue.message).join("; "));
        return;
      }

      // Erro do axios (response.data.message)
      const maybeMsg = (error as any)?.response?.data?.message;
      if (maybeMsg && typeof maybeMsg === "string") {
        setError(maybeMsg);
        return;
      }

      // fallback
      const fallback = error instanceof Error ? error.message : String(error);
      setError(fallback || "Erro ao registrar movimentação.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Registrar Movimentação</DialogTitle>

      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField
            select
            label="Produto"
            name="productId"
            value={form.productId}
            onChange={handleChange}
            disabled={loadingProducts}
          >
            <MenuItem value="">Selecione um produto</MenuItem>
            {products.map((p) => (
              <MenuItem key={p.id} value={p.id}>
                {p.nome} — estoque: {p.quantidade}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Tipo"
            name="type"
            value={form.type}
            onChange={handleChange}
          >
            <MenuItem value="entrada">Entrada</MenuItem>
            <MenuItem value="saida">Saída</MenuItem>
          </TextField>

          <TextField
            label="Quantidade"
            name="quantity"
            type="number"
            value={form.quantity}
            onChange={handleChange}
            inputProps={{ min: 1 }}
          />

          <TextField
            label="ID do Usuário"
            name="userId"
            type="number"
            value={form.userId}
            onChange={handleChange}
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={submitting}>
          Cancelar
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting ? "Enviando..." : "Registrar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MovementModal;