import { useEffect, useState } from "react";
import { Box, Button, Typography, Paper } from "@mui/material";
import { type Categoria } from "../types/categoria";
import { getCategorias, deleteCategoria } from "../services/categoriaService";
import { CategoriasTable } from "../components/categorias/CategoriasTable";
import { CategoriaModal } from "../components/categorias/CategoriaModal";

export const CategoriasPage = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [editingCategoria, setEditingCategoria] = useState<Categoria | null>(null);

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
    if (confirm("Tem certeza? Produtos nesta categoria podem ficar sem referência.")) {
      await deleteCategoria(id);
      carregar();
    }
  };

  return (
    <Box p={3}>
      <Paper sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4">Categorias</Typography>
          <Button variant="contained" onClick={handleOpenCreate}>Nova Categoria</Button>
        </Box>
        
        <CategoriasTable 
          categorias={categorias} 
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