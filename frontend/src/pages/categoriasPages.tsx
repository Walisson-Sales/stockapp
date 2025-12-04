import { useEffect, useState } from "react";
import { 
  Box, Button, Typography, Paper, TextField, InputAdornment 
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { type Categoria } from "../types/categoria";
import { getCategorias, deleteCategoria } from "../services/categoriaService";
import { CategoriasTable } from "../components/categorias/CategoriasTable";
import { CategoriaModal } from "../components/categorias/CategoriaModal";
import { useNotification } from "../contexts/NotificationContext";

export const CategoriasPage = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [editingCategoria, setEditingCategoria] = useState<Categoria | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { showNotification } = useNotification(); 

  const carregar = async () => {
    try {
      const data = await getCategorias();
      setCategorias(data);
    } catch (error) {
      console.error("Erro ao carregar categorias", error);
    }
  };

  useEffect(() => { carregar(); }, []);

  const handleOpenCreate = () => {
    setEditingCategoria(null);
    setOpenModal(true);
  };

  const handleOpenEdit = (cat: Categoria) => {
    setEditingCategoria(cat);
    setOpenModal(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Tem certeza que deseja excluir esta categoria?")) {
      try {
        await deleteCategoria(id);      
        showNotification("Categoria excluída com sucesso!", "success");     
        await carregar();        
      } catch (error: any) {
        const msg = error.response?.data?.message || "Erro ao excluir categoria.";
        showNotification(msg, "error");
      }
    }
  };

  const filteredCategorias = categorias.filter(cat => 
    cat.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box p={3}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" mb={3}>Categorias</Typography>

        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <TextField
            size="small"
            placeholder="Buscar categoria..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
            sx={{ width: 300 }}
          />
          <Button variant="contained" onClick={handleOpenCreate}>Nova Categoria</Button>
        </Box>
        
        <CategoriasTable 
          categorias={filteredCategorias} 
          onEdit={handleOpenEdit} 
          onDelete={handleDelete} 
        />
        
        <CategoriaModal 
          open={openModal} 
          onClose={() => setOpenModal(false)} 
          onSuccess={carregar}
          categoriaParaEditar={editingCategoria}
        />
      </Paper>
    </Box>
  );
};