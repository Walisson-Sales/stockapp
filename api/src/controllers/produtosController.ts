import { Request, Response } from "express";
import { produtosService } from "../services/produtosService"; // Correção no import

const produtosController = {
  async listarTodosProdutos(req: Request, res: Response) {
    try {
      const produtos = await produtosService.listarTodosProdutos();
      return res.status(200).json(produtos);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },

  async pegarProdutoPorId(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const produto = await produtosService.pegarProdutoPorId(id);
      return res.status(200).json(produto);
    } catch (error: any) {
      // Se o service lançar o erro, o controller o captura e retorna o status correto
      if (error.message === 'Produto não encontrado') {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ message: error.message });
    }
  },

  async criarProduto(req: Request, res: Response) {
    try {
      const produto = await produtosService.criarProduto(req.body);
      return res.status(201).json(produto);
    } catch (error: any) {
      return res.status(400).json({ message: "Dados inválidos: " + error.message });
    }
  },

  async atualizarProduto(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const produto = await produtosService.atualizarProduto(id, req.body);
      return res.status(200).json(produto);
    } catch (error: any) {
      if (error.message === 'Produto não encontrado') {
        return res.status(404).json({ message: error.message });
      }
      return res.status(400).json({ message: "Dados inválidos: " + error.message });
    }
  },

  async deletarProduto(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await produtosService.deletarProduto(id);
      // 204 No Content é a resposta correta para DELETE, sem corpo
      return res.status(204).send();
    } catch (error: any) {
      if (error.message === 'Produto não encontrado') {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ message: error.message });
    }
  },
};

export default produtosController;