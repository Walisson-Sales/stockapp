import prisma from "../database/prisma";
import { Produto } from "../generated/prisma";
// --- Tipos de Dados para a API ---

// Define o que é necessário para CRIAR um produto.
// Esta é a "forma" do JSON que o seu controller vai receber no body.
export type ProdutoCreateData = {
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
};

export type Produtomodificate = {
  nome?: string;
  cor?: string;
  tamanho?: string;
  precoCusto?: number;
  precoVenda?: number;
  idCategoria?: number;
};

// Define o que é permitido para ATUALIZAR um produto.
// Usamos Partial<> para tornar todos os campos opcionais.
// Omitimos 'estoque' e 'idUsuario', pois não devem ser atualizados por esta rota.
export type ProdutoUpdateData = Partial<Omit<ProdutoCreateData, 'estoque' | 'idUsuario'>>;


// --- Service com todas as funções CRUD ---

export const produtosService = {
  /**
   * Retorna todos os produtos com suas categorias e estoques.
   */
  async listarTodosProdutos(): Promise<Produto[]> {
    return prisma.produto.findMany({
      // "include" enriquece a resposta com os dados das tabelas relacionadas.
      include: {
        categoria: true,
        estoque: true,
      },
    });
  },

  /**
   * Busca um produto específico pelo seu ID.
   * Lança um erro se o produto não for encontrado.
   */
  async pegarProdutoPorId(id: number): Promise<Produto> {
    const produto = await prisma.produto.findUnique({
      where: { id },
      include: {
        categoria: true,
        estoque: true,
      },
    });

    // Boa prática: o service é responsável por garantir que o produto existe.
    if (!produto) {
      throw new Error('Produto não encontrado');
    }
    return produto;
  },

  /**
   * Cria um novo produto e seu registro de estoque inicial.
   */
  async criarProduto(data: ProdutoCreateData): Promise<Produto> {
    return prisma.produto.create({
      data: {
        nome: data.nome,
        cor: data.cor,
        tamanho: data.tamanho,
        precoCusto: data.precoCusto,
        precoVenda: data.precoVenda,
        
        // Conecta o produto a uma categoria e a um usuário existentes.
        categoria: {
          connect: { id: data.idCategoria },
        },
        usuario: {
          connect: { id: data.idUsuario },
        },
        
        // Cria o registro de estoque aninhado (em uma única transação).
        estoque: {
          create: {
            quantidadeAtual: data.estoque.quantidadeAtual,
            quantidadeMinima: data.estoque.quantidadeMinima,
          },
        },
      },
    });
  },

  /**
   * Atualiza os dados de um produto existente.
   */
  async atualizarProduto(id: number, data: Produtomodificate): Promise<Produto> {
    // Garante que o produto existe antes de tentar atualizar.
    await this.pegarProdutoPorId(id);

    return prisma.produto.update({
      where: { id },
      data: {
        nome: data.nome,
        cor: data.cor,
        tamanho: data.tamanho,
        precoCusto: data.precoCusto,
        precoVenda: data.precoVenda,

        ...(data.idCategoria && {
          categoria: {
            connect: { id: data.idCategoria },
          },
        }),
      },
    });
  },

  /**
   * Deleta um produto e seu estoque associado.
   */
  async deletarProduto(id: number): Promise<Produto> {
    // Garante que o produto existe antes de tentar deletar.
    await this.pegarProdutoPorId(id);
    
    // Usamos uma transação para garantir que ambas as operações (deletar estoque e produto)
    // funcionem ou falhem juntas, mantendo a integridade do banco.
    const transacaoDeletar = await prisma.$transaction([
      prisma.estoque.delete({ where: { idProduto: id } }),
      prisma.produto.delete({ where: { id } }),
    ]);

    // Retorna o produto que foi deletado (o segundo item da transação).
    return transacaoDeletar[1];
  },
};