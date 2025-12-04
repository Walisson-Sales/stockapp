import { api } from "../config/api";
import { type Categoria, type CategoriaCreateData } from "../types/categoria";

export const getCategorias = async (): Promise<Categoria[]> => {
  const response = await api.get('/categorias');
  return response.data;
};

export const createCategoria = async (data: CategoriaCreateData): Promise<Categoria> => {
  const response = await api.post('/categorias', data);
  return response.data;
};

export const updateCategoria = async (id: number, data: CategoriaCreateData): Promise<Categoria> => {
  const response = await api.put(`/categorias/${id}`, data);
  return response.data;
};

export const deleteCategoria = async (id: number): Promise<void> => {
  await api.delete(`/categorias/${id}`);
};