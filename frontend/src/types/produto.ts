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
    precoCusto: number;
    precoVenda: number;
    idCategoria: number;
    idUsuario: number;
    categoria?: Categoria;
    estoque?: Estoque;
  }
  
  export interface ProdutoCreateData {
    nome: string;
    cor?: string;
    tamanho?: string;
    precoCusto: number;
    precoVenda: number;
    idCategoria: number;
    idUsuario: number;
    estoque: {
      quantidadeAtual: number;
      quantidadeMinima: number;
    };
  }