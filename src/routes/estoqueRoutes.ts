import { Router } from "express";
import estoqueController from "../controllers/estoqueController";

const router = Router();

router.get("/", estoqueController.listarEstoque);

export default router;