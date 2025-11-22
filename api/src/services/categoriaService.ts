import path from "path";
import prisma from "../database/prisma";
import { Categoria } from "../generated/prisma";

const categoriaService = {
    async criarCategoria(data: {nome: string, descricao: string}){
        const novaCategoria: Categoria = await prisma.categoria.create({
            data
        });
        return novaCategoria;
    },
    async listarTodasCategorias(){
        return prisma.categoria.findMany();
    },
    async pegarCategoriaPorId(id: number){
        return prisma.categoria.findUnique({
            where: {id}
        });
    },
    async atualizarCategoria(id: number, data: {nome: string, descricao: string}){
        return prisma.categoria.update({
            where: {id},
            data
        })
    },
    async deletarCategoria(id: number){
        return prisma.categoria.delete({
            where: {id}
        })
    }
}

export default categoriaService;