import express from "express";
import { Express, Request, Response } from "express"
import {Prisma, PrismaClient, User} from "./generated/prisma"

// MODELO BASE FEITO NA AULA - para testes/consultas

const app: Express = express();
const port: number = 3000;
const prisma = new PrismaClient();

app.use(express.json());

app.get("/users", async(req: Request, res: Response) => {
    const users: User[] = await prisma.user.findMany();
    //findMany() pega todas as linhas
    res.json(users);
});

//Pega o usuário pelo id
app.get("/users/:id", async(req: Request, res: Response) => {
    //Tem que passar o id que é string para number
    const id: number = parseInt(req.params.id);

    if (isNaN(id) || id <= 0) res.status(404).json("Id Inválido");
    
    // const usuarioProcurado: Usuario | undefined = users.find(user => user.id == id);
    const user: User | null = await prisma.user.findUnique({
        where: { id }
    });
    // (argumentos) => {corpo da função}
    //Por ter só 1 argumento e só 1 linha na função, não precisa de () e {}
    if (!user){ // == undefined
        res.status(404).json("Usuário não encontrado");
    } 
    res.json(user);
    // Geralmente o else não precisa pq o res é tipo um return
});

app.post("/users", async(req, res) => {
    const {nome, idade} = req.body;
    if (typeof nome != "string" || nome.trim() == ""){
        res.status(400).json("Nome inválido")
    }

    if (typeof idade != "number" || idade <= 0 || !Number.isInteger(idade)){
        res.status(400).json("Idade inválida")
    }
    try{
        const user: User = await prisma.user.create({
            data: { nome, idade }
        });
        res.status(201).json(user);
    } catch (error){
        res.status(500).json("Erro ao criar usuário");
    }
    
});

app.put("/users/:id", async(req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    // Validando id
    if (isNaN(id) || id <= 0) res.status(404).json("Id Inválido");

    const {nome, idade} = req.body;
    const updateData: {nome?: string, idade?: number} = {} //essa ? diz que é opcional
    if (nome){
        if (typeof nome != "string" || nome.trim() == ""){
            res.status(400).json("Nome inválido")
        }
        updateData.nome = nome;
    }
    if (idade){
        if (typeof idade != "number" || idade <= 0 || !Number.isInteger(idade)){
            res.status(400).json("Idade inválida")
        }
        updateData.idade = idade;
    }

    try{
        const updateUser: User = await prisma.user.update({
            where: {id},
            data: updateData
        })
        res.json(updateUser);
    } catch (error){
        res.status(404).json("Usuário não encontrado")
    }
    
});

app.delete("/users/:id", async(req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    // Validando id
    if (isNaN(id) || id <= 0) res.status(404).json("Id Inválido");

    try{
        await prisma.user.delete({
            where: { id }
        })
    } catch(error){
        res.status(404).json("Usuário não encontrado")
    }
});

app.listen(port, () => {
    console.log(`A api subiu na porta ${port}`)
});