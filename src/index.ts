// Nosso arquivo principal:
import express from "express";
import { Express } from "express";
import categoriaRoutes from "./routes/categoriaRoutes";
import estoqueRoutes from "./routes/estoqueRoutes";
import movimentacaoRoutes from "./routes/movimentacaoRoutes";
import produtosRoutes from "./routes/produtosRoutes";
import usuarioRoutes from "./routes/usuarioRoutes";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app: Express = express();
const port: number = 3000;

app.use(express.json());

app.use(categoriaRoutes);
app.use(estoqueRoutes);
app.use(movimentacaoRoutes);
app.use(produtosRoutes);
app.use(usuarioRoutes);

const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'StockApp API',
        version: '1.0.0',
        description: 'API para o sistema de gerenciamento de estoque StockApp',
      },
      servers: [
        {
          url: `http://localhost:${port}`,
        },
      ],
    },
    // Caminho para os arquivos que contêm a documentação da API (suas rotas)
    apis: ['./src/routes/*.ts'], 
  };
  
  const swaggerDocs = swaggerJSDoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  

  
app.listen(port, () => {
    console.log(`A API subiu na porta ${port}`);
    console.log(`📄 Documentação da API disponível em http://localhost:${port}/api-docs`);
});