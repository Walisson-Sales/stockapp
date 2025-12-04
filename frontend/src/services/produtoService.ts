import { api } from "../config/api";
import { type Produto, type ProdutoCreateData } from "../types/produto";

// ... mantenha os gets e create ...

// ADICIONE ISSO:
export const updateProduto = async (id: number, data: Partial<ProdutoCreateData>): Promise<Produto> => {
  const response = await api.put(`/produtos/${id}`, data);
  return response.data;
};

// ... mantenha o delete ...
// (Recomendo copiar o arquivo inteiro abaixo para garantir)

export const getProdutos = async (): Promise<Produto[]> => {
  const response = await api.get('/produtos');
  return response.data;
};

export const getProdutoById = async (id: number): Promise<Produto> => {
  const response = await api.get(`/produtos/${id}`);
  return response.data;
};

export const createProduto = async (data: ProdutoCreateData): Promise<Produto> => {
  const response = await api.post('/produtos', data);
  return response.data;
};

export const deleteProduto = async (id: number): Promise<void> => {
  await api.delete(`/produtos/${id}`);
};