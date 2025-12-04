export interface Categoria {
  id: number;
  nome: string;
  descricao?: string | null;
}

export interface CategoriaCreateData {
  nome: string;
  descricao?: string;
}
