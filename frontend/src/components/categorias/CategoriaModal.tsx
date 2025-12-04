import { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box } from "@mui/material";
import { type Categoria, type CategoriaCreateData } from "../../types/categoria";
import { createCategoria, updateCategoria } from "../../services/categoriaService";
// import { useNotification } from "../../contexts/NotificationContext";

interface CategoriaModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  categoriaParaEditar: Categoria | null; // Se vier preenchido, é Edição
}

export const CategoriaModal = ({ open, onClose, onSuccess, categoriaParaEditar }: CategoriaModalProps) => {
  const [formData, setFormData] = useState<CategoriaCreateData>({ nome: "", descricao: "" });

  // Preenche o formulário se for edição
  useEffect(() => {
    if (categoriaParaEditar) {
      setFormData({
        nome: categoriaParaEditar.nome,
        descricao: categoriaParaEditar.descricao || ""
      });
    } else {
      setFormData({ nome: "", descricao: "" });
    }
  }, [categoriaParaEditar, open]);

  const handleSave = async () => {
    try {
      if (categoriaParaEditar) {
        await updateCategoria(categoriaParaEditar.id, formData);
      } else {
        await createCategoria(formData);
      }
      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar categoria.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{categoriaParaEditar ? "Editar Categoria" : "Nova Categoria"}</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField 
            label="Nome" 
            fullWidth 
            value={formData.nome} 
            onChange={(e) => setFormData({...formData, nome: e.target.value})} 
          />
          <TextField 
            label="Descrição" 
            fullWidth 
            multiline rows={3}
            value={formData.descricao} 
            onChange={(e) => setFormData({...formData, descricao: e.target.value})} 
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleSave}>Salvar</Button>
      </DialogActions>
    </Dialog>
  );
};