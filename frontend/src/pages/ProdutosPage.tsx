import { useEffect, useState } from "react";
import { Box, Paper, Typography, Button, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { type Produto } from "../types/produto";
import { getProdutos, deleteProduto } from "../services/produtoService";
import ProdutosTable from "../components/produtos/ProdutosTable";
import { ProdutoFormModal } from "../components/produtos/ProdutoFormModal"; 
import { useNotification } from "../contexts/NotificationContext";

export const ProdutosPage = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [editingProduto, setEditingProduto] = useState<Produto | null>(null);
  const { showNotification } = useNotification();

  useEffect(() => { carregarProdutos(); }, []);

  const carregarProdutos = async () => {
    try {
      const data = await getProdutos();
      setProdutos(data);
    } catch (error) { console.error(error); }
  };

  // Abrir modal para CRIAR
  const handleOpenCreate = () => {
    setEditingProduto(null);
    setOpenModal(true);
  };

  // Abrir modal para EDITAR
  const handleOpenEdit = (prod: Produto) => {
    setEditingProduto(prod);
    setOpenModal(true);
  };

  const handleDelete = async (id: number) => {
    if(!confirm("Excluir produto?")) return;
    setDeletingId(id);
    try {
      await deleteProduto(id);
      showNotification("Produto excluído!", "success");
      
      setProdutos(prev => prev.filter(p => p.id !== id));
      
    } catch (error: any) {
       const msg = error.response?.data?.message || "Erro ao excluir produto.";
       showNotification(msg, "error");
    } finally { 
      setDeletingId(null); 
    }
  };

  const filtered = produtos.filter(p => p.nome.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <Box p={3}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" mb={3}>Produtos</Typography>
        
        <Box display="flex" justifyContent="space-between" mb={2}>
           <TextField 
             size="small" 
             placeholder="Buscar..." 
             value={searchTerm} 
             onChange={e => setSearchTerm(e.target.value)}
             InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon/></InputAdornment> }}
           />
           <Button variant="contained" onClick={handleOpenCreate}>Novo Produto</Button>
        </Box>

        <ProdutosTable 
          produtos={filtered} 
          deletingId={deletingId}
          onDelete={handleDelete}
          onEdit={handleOpenEdit}
        />

        <ProdutoFormModal 
          open={openModal} 
          onClose={() => setOpenModal(false)}
          onSuccess={carregarProdutos}
          produtoParaEditar={editingProduto}
        />
      </Paper>
    </Box>
  );
};