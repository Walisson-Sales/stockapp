import { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box, MenuItem, FormControl, InputLabel, Select, CircularProgress } from "@mui/material";
import { type ProdutoCreateData, type Produto } from "../../types/produto";
import { type Categoria } from "../../types/categoria";
import { createProduto, updateProduto } from "../../services/produtoService";
import { getCategorias } from "../../services/categoriaService";
import { useNotification } from "../../contexts/NotificationContext";

interface ProdutoFormModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  produtoParaEditar: Produto | null;
}

export const ProdutoFormModal = ({ open, onClose, onSuccess, produtoParaEditar }: ProdutoFormModalProps) => {
    const INITIAL_DATA: ProdutoCreateData = {
        nome: "",
        cor: "",
        tamanho: "",
        precoCusto: 0,
        precoVenda: 0,
        idCategoria: 0, // Será preenchido pelo Select
        idUsuario: 1,   // Fixo por enquanto
        estoque: { quantidadeAtual: 0, quantidadeMinima: 5 }
    };

    const [formData, setFormData] = useState<ProdutoCreateData>(INITIAL_DATA);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [loading, setLoading] = useState(false);
    const { showNotification } = useNotification();

    // Carrega categorias ao abrir
    useEffect(() => {
        if (open) {
        getCategorias().then(setCategorias).catch(console.error);
        }
    }, [open]);

    // Preenche dados se for edição
    useEffect(() => {
        if (produtoParaEditar && open) {
        setFormData({
            nome: produtoParaEditar.nome,
            cor: produtoParaEditar.cor || "",
            tamanho: produtoParaEditar.tamanho || "",
            precoCusto: Number(produtoParaEditar.precoCusto),
            precoVenda: Number(produtoParaEditar.precoVenda),
            idCategoria: produtoParaEditar.idCategoria,
            idUsuario: produtoParaEditar.idUsuario,
            estoque: {
            quantidadeAtual: produtoParaEditar.estoque?.quantidadeAtual || 0,
            quantidadeMinima: produtoParaEditar.estoque?.quantidadeMinima || 0
            }
        });
        } else {
        setFormData(INITIAL_DATA);
        }
    }, [produtoParaEditar, open]);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prev => ({
        ...prev,
        [name]: (name.includes("preco") || name === "idCategoria") ? Number(value) : value
        }));
    };

    const handleEstoqueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
        ...prev,
        estoque: { ...prev.estoque, [name]: Number(value) }
        }));
    };

    const handleSave = async () => {
        if (formData.idCategoria === 0) {
        alert("Selecione uma categoria!");
        return;
        }

        setLoading(true);
        try {
            if (produtoParaEditar) {
                const { estoque, ...dadosProduto } = formData;
                await updateProduto(produtoParaEditar.id, dadosProduto);
        } else {
            await createProduto(formData);
        }
            showNotification("Produto salvo com sucesso!", "success");
            onSuccess();
            onClose();
        } catch (error: any) {
            console.log("ERRO:", error.response?.data); 

            let mensagemFinal = "Erro desconhecido.";

            if (error.response?.data?.detalhes) {
                const primeiroErro = error.response.data.detalhes[0];
                mensagemFinal = `${primeiroErro.campo}: ${primeiroErro.mensagem}`;
            }
            else if (error.response?.data?.message) {
                mensagemFinal = error.response.data.message;
            } 
            else if (error.response?.data?.mensagem) {
                mensagemFinal = error.response.data.mensagem;
            }
            else {
                mensagemFinal = "Erro de conexão ou servidor.";
            }

            showNotification(mensagemFinal, "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>{produtoParaEditar ? "Editar Produto" : "Novo Produto"}</DialogTitle>
        <DialogContent>
            <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField label="Nome" name="nome" fullWidth value={formData.nome} onChange={handleChange} />
            
            <Box display="flex" gap={2}>
                <FormControl fullWidth>
                <InputLabel>Categoria</InputLabel>
                <Select
                    name="idCategoria"
                    value={formData.idCategoria || ""}
                    label="Categoria"
                    onChange={handleChange}
                >
                    {categorias.map(cat => (
                    <MenuItem key={cat.id} value={cat.id}>{cat.nome}</MenuItem>
                    ))}
                </Select>
                </FormControl>
                <TextField label="Cor" name="cor" fullWidth value={formData.cor} onChange={handleChange} />
                <TextField label="Tamanho" name="tamanho" fullWidth value={formData.tamanho} onChange={handleChange} />
            </Box>

            <Box display="flex" gap={2}>
                <TextField label="Preço Custo" name="precoCusto" type="number" fullWidth value={formData.precoCusto} onChange={handleChange} />
                <TextField label="Preço Venda" name="precoVenda" type="number" fullWidth value={formData.precoVenda} onChange={handleChange} />
            </Box>
            
            {!produtoParaEditar && (
                <Box display="flex" gap={2}>
                <TextField label="Estoque Inicial" name="quantidadeAtual" type="number" fullWidth value={formData.estoque.quantidadeAtual} onChange={handleEstoqueChange} />
                <TextField label="Mínimo" name="quantidadeMinima" type="number" fullWidth value={formData.estoque.quantidadeMinima} onChange={handleEstoqueChange} />
                </Box>
            )}
            </Box>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Cancelar</Button>
            <Button variant="contained" onClick={handleSave} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Salvar"}
            </Button>
        </DialogActions>
        </Dialog>
    );
};