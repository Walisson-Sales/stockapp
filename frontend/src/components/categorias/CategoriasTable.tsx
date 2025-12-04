import React from "react";
import { type Categoria } from "../../types/categoria";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton, Tooltip, Paper
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface CategoriasTableProps {
  categorias: Categoria[];
  onEdit: (categoria: Categoria) => void;
  onDelete: (id: number) => void;
}

export const CategoriasTable: React.FC<CategoriasTableProps> = ({ categorias, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: "primary.main" }}>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>ID</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Nome</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Descrição</TableCell>
            <TableCell align="center" sx={{ color: "white", fontWeight: "bold" }}>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categorias.map((cat) => (
            <TableRow key={cat.id}>
              <TableCell>{cat.id}</TableCell>
              <TableCell>{cat.nome}</TableCell>
              <TableCell>{cat.descricao || "-"}</TableCell>
              <TableCell align="center">
                <Tooltip title="Editar">
                  <IconButton color="primary" onClick={() => onEdit(cat)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Excluir">
                  <IconButton color="error" onClick={() => onDelete(cat.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
          {categorias.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} align="center">Nenhuma categoria encontrada.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};