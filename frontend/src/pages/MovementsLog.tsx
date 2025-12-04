import React, { useEffect, useState } from "react";
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import api from "../api";
import MovementModal from "../components/MovementModal";

type Mov = {
  id: number;
  produtoNome: string;
  tipoMovimentacao: string;
  quantidade: number;
  createdAt?: string;
  idUsuario?: number;
};

const MovementsLog: React.FC = () => {
  const [movs, setMovs] = useState<Mov[]>([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [openNew, setOpenNew] = useState(false);

  const [edit, setEdit] = useState<{ open: boolean; id?: number; quantidade?: number }>({ open: false });

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.get("/movimentacoes");
      // map para extrair nome do produto
      const list = (res.data || []).map((m: any) => ({
        id: m.id,
        produtoNome: m.produto?.nome || m.nomeProduto || `#${m.idProduto}`,
        tipoMovimentacao: m.tipoMovimentacao,
        quantidade: m.quantidade,
        createdAt: m.createdAt,
        idUsuario: m.idUsuario
      }));
      setMovs(list);
    } catch (err) {
      // console.error(err)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Deseja realmente deletar essa movimentação?")) return;
    try {
      await api.delete(`/movimentacoes/${id}`);
      load();
    } catch (err) {
      alert("Erro ao deletar.");
    }
  };

  const openEditDialog = (m: Mov) => {
    setEdit({ open: true, id: m.id, quantidade: m.quantidade });
  };

  const submitEdit = async () => {
    if (!edit.id) return;
    try {
      await api.put(`/movimentacoes/${edit.id}`, { quantidade: edit.quantidade });
      setEdit({ open: false });
      load();
    } catch (err) {
      alert("Erro ao alterar.");
    }
  };

  const filtered = movs.filter(m => m.produtoNome.toLowerCase().includes(filter.toLowerCase()) || String(m.id).includes(filter));

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <TextField label="Buscar (produto ou id)" value={filter} onChange={e => setFilter(e.target.value)} />
        <Box>
          <Button variant="contained" onClick={() => setOpenNew(true)}>Nova movimentação</Button>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Produto</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell align="right">Quantidade</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Usuário</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map(m => (
              <TableRow key={m.id}>
                <TableCell>{m.id}</TableCell>
                <TableCell>{m.produtoNome}</TableCell>
                <TableCell>{m.tipoMovimentacao}</TableCell>
                <TableCell align="right">{m.quantidade}</TableCell>
                <TableCell>{m.createdAt ? new Date(m.createdAt).toLocaleString() : "-"}</TableCell>
                <TableCell>{m.idUsuario ?? "-"}</TableCell>
                <TableCell>
                  <IconButton onClick={() => openEditDialog(m)}><Edit /></IconButton>
                  <IconButton onClick={() => handleDelete(m.id)}><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">{loading ? "Carregando..." : "Nenhuma movimentação encontrada."}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <MovementModal open={openNew} onClose={() => { setOpenNew(false); load(); }} onSuccess={() => load()} />

      <Dialog open={edit.open} onClose={() => setEdit({ open: false })}>
        <DialogTitle>Alterar Quantidade</DialogTitle>
        <DialogContent>
          <TextField
            label="Quantidade"
            type="number"
            value={edit.quantidade ?? ""}
            onChange={(e) => setEdit(s => ({ ...s, quantidade: Number(e.target.value) }))}
            inputProps={{ min: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEdit({ open: false })}>Cancelar</Button>
          <Button onClick={submitEdit} variant="contained">Salvar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MovementsLog;