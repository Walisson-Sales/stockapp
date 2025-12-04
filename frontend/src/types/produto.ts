export interface Estoque {
  id: number;
  quantidadeAtual: number;
  quantidadeMinima: number;
  status: string;
}

export interface Categoria {
  id: number;
  nome: string;
}

export interface Produto {
  id: number;
  nome: string;
  cor?: string | null;
  tamanho?: string | null;
  precoCusto: number; // O backend envia Decimal, mas no JSON vem string ou number
  precoVenda: number;
  idCategoria: number;
  idUsuario: number;
  categoria?: Categoria;
  estoque?: Estoque;
}

// Tipo para criação (payload do body)
export interface ProdutoCreateData {
  nome: string;
  cor?: string;
  tamanho?: string;
  precoCusto: number;
  precoVenda: number;
  idCategoria: number;
  idUsuario: number; // Em um app real, viria do contexto de auth
  estoque: {
    quantidadeAtual: number;
    quantidadeMinima: number;
  };
}
