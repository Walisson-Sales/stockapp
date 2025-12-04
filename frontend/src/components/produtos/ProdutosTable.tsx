import React from "react";
import { type Produto } from "../../types/produto";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Chip
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";

interface ProdutosTableProps {
  produtos: Produto[];
  deletingId: number | null;
  onDelete: (id: number) => void;
  onEdit: (produto: Produto) => void;
}

const ProdutosTable: React.FC<ProdutosTableProps> = ({
  produtos,
  deletingId,
  onDelete,
  onEdit,
}) => {
  const navigate = useNavigate();

  const colunas = ["ID", "Nome", "Categoria", "Preço Custo", "Preço Venda", "Estoque", "Status", "Ações"];

  return (
    <TableContainer sx={{ mt: 4, borderRadius: 2, boxShadow: 1 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: "primary.main" }}>
            {colunas.map((col) => (
              <TableCell key={col} align="center" sx={{ color: "white", fontWeight: "bold" }}>
                {col}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {produtos.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                Nenhum produto encontrado.
              </TableCell>
            </TableRow>
          ) : (
            produtos.map((produto) => (
              <TableRow key={produto.id} hover>
                <TableCell align="center">{produto.id}</TableCell>
                <TableCell align="center">{produto.nome}</TableCell>
                <TableCell align="center">{produto.categoria?.nome || "-"}</TableCell>
                <TableCell align="center">R$ {Number(produto.precoCusto).toFixed(2)}</TableCell>
                <TableCell align="center">R$ {Number(produto.precoVenda).toFixed(2)}</TableCell>
                <TableCell align="center">{produto.estoque?.quantidadeAtual || 0}</TableCell>
                <TableCell align="center">
                  <Chip 
                    label={produto.estoque?.status || "Indefinido"} 
                    color={produto.estoque?.status === "Disponivel" ? "success" : "error"} 
                    size="small" 
                  />
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="Ver Detalhes">
                    <IconButton color="primary" onClick={() => navigate(`/produtos/${produto.id}`)}>
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Editar">
                    <IconButton color="primary" onClick={() => onEdit(produto)}>
                        <EditIcon />
                    </IconButton>
                   </Tooltip>
                  <Tooltip title="Excluir">
                    <IconButton 
                      color="error" 
                      onClick={() => onDelete(produto.id)}
                      disabled={deletingId === produto.id}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProdutosTable;