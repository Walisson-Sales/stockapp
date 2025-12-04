import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Paper, Typography, Button, Divider } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Interface para tipar o objeto (simulando dados que viriam da API)
interface Product {
  id: number;
  nome: string;
  categoria: string;
  quantidade: number;
  preco: number;
  descricao: string;
}

const ProductDetails: React.FC = () => {
  const { id, nome } = useParams(); // Pega o ID da URL (ex: /produto/1)
  const navigate = useNavigate();

  // Simulação de busca de dados (depois substituiremos pela chamada à API)
  // Aqui estamos fingindo que buscamos o produto com o ID tal
  const product: Product = {
    id: Number(id),
    nome: String(nome),
    categoria: 'Cama',
    quantidade: 15,
    preco: 89.90,
    descricao: 'Lençol 100% algodão, 200 fios, cor branca.'
  };

  return (
    <Box sx={{ p: 4, maxWidth: 800, margin: 'auto' }}>
      <Button 
        startIcon={<ArrowBackIcon />} 
        onClick={() => navigate('/inventory')}
        sx={{ mb: 2 }}
      >
        Voltar para o Estoque
      </Button>

      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          {product.nome}
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Typography variant="overline" sx={{ fontSize: 14, bgcolor: '#e0e0e0', p: 0.5, borderRadius: 1 }}>
                ID: {product.id}
            </Typography>
            <Typography variant="overline" sx={{ fontSize: 14, bgcolor: '#e3f2fd', p: 0.5, borderRadius: 1 }}>
                Categoria: {product.categoria}
            </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Detalhes Financeiros</Typography>
          <Typography variant="body1">Preço Unitário: <strong>R$ {product.preco.toFixed(2)}</strong></Typography>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Situação do Estoque</Typography>
          <Typography variant="body1" color={product.quantidade < 5 ? 'error' : 'success.main'}>
            Quantidade Atual: <strong>{product.quantidade} unidades</strong>
          </Typography>
        </Box>

        <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Descrição</Typography>
            <Typography variant="body2" color="text.secondary">
                {product.descricao}
            </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default ProductDetails;