import { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box } from "@mui/material";
import { type Categoria, type CategoriaCreateData } from "../../types/categoria";
import { createCategoria, updateCategoria } from "../../services/categoriaService";
import { useNotification } from "../../contexts/NotificationContext";

interface CategoriaModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  categoriaParaEditar: Categoria | null; // Se vier preenchido, é Edição
}

export const CategoriaModal = ({ open, onClose, onSuccess, categoriaParaEditar }: CategoriaModalProps) => {
  const { showNotification } = useNotification();
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

  // Dentro de CategoriaModal.tsx

  const handleSave = async () => {
    try {
        if (categoriaParaEditar) {
            await updateCategoria(categoriaParaEditar.id, formData);
            showNotification("Categoria atualizada!", "success");
        } else {
            await createCategoria(formData);
            showNotification("Categoria criada!", "success");
        }
        onSuccess();
        onClose();
    } catch (error: any) {
        console.error(error);
      
        // Lógica robusta para pegar qualquer tipo de erro
        let msg = "Erro ao salvar categoria.";
        if (error.response?.data?.message) msg = error.response.data.message;
        else if (error.response?.data?.detalhes?.[0]) msg = error.response.data.detalhes[0].mensagem;

        showNotification(msg, "error");
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