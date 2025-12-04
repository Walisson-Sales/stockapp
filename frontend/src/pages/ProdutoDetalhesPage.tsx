import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProdutoById } from "../services/produtoService";
import { type Produto } from "../types/produto";
import { Box, Paper, Typography, Button, Divider, Chip } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const ProdutoDetalhesPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [produto, setProduto] = useState<Produto | null>(null);

  useEffect(() => {
    if (id) {
      getProdutoById(Number(id))
        .then(setProduto)
        .catch(err => console.error(err));
    }
  }, [id]);

  if (!produto) return <Typography>Carregando...</Typography>;

  // componente auxiliar para exibir linha de informação
  const InfoRow = ({ label, value }: { label: string, value: string | number }) => (
    <Box sx={{ flex: 1, minWidth: '200px', mb: 2 }}>
      <Typography variant="subtitle2" color="textSecondary">{label}</Typography>
      <Typography variant="h6">{value}</Typography>
    </Box>
  );

  return (
    <Box p={4} display="flex" justifyContent="center" bgcolor="#f5f5f5" minHeight="100vh">
      <Paper sx={{ maxWidth: 800, width: "100%", p: 4 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate("/produtos")} sx={{ mb: 2 }}>
          Voltar
        </Button>
        
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4" fontWeight="bold">{produto.nome}</Typography>
          <Chip 
            label={produto.estoque?.status || "Indisponível"} 
            color={produto.estoque?.status === "Disponivel" ? "success" : "error"} 
          />
        </Box>
        
        <Divider sx={{ mb: 3 }} />

        <Box display="flex" flexWrap="wrap" gap={2}>
          <InfoRow label="Preço de Venda" value={`R$ ${Number(produto.precoVenda).toFixed(2)}`} />
          <InfoRow label="Preço de Custo" value={`R$ ${Number(produto.precoCusto).toFixed(2)}`} />
          
          <Box width="100%" height={0} /> 

          <InfoRow label="Categoria" value={produto.categoria?.nome || "Sem Categoria"} />
          <InfoRow label="Estoque Atual" value={`${produto.estoque?.quantidadeAtual} unidades`} />
          
          <Box width="100%" height={0} />

          <InfoRow label="Cor" value={produto.cor || "-"} />
          <InfoRow label="Tamanho" value={produto.tamanho || "-"} />
        </Box>
      </Paper>
    </Box>
  );
};