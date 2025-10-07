# StockApp 📦

![Status do Projeto](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![Linguagem](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Banco de Dados](https://img.shields.io/badge/PostgreSQL-316192?logo=postgresql&logoColor=white)

Um sistema de gerenciamento de estoque simples e moderno, projetado para pequenos comerciantes.

## 🎯 Sobre o Projeto

O StockApp foi criado para ser uma ferramenta intuitiva e poderosa, ajudando pequenos comerciantes (como os do ramo de cama, mesa e banho) a gerenciar seu inventário de forma eficiente e sem complicações. O projeto foca na simplicidade de uso e na automação de tarefas, com planos de utilizar QR Codes para agilizar o registro de entradas e saídas de produtos.

---

## ✨ Funcionalidades

- ✔️ **Gestão de Catálogo:** Cadastro completo de Produtos e Categorias.
- ✔️ **Controle de Usuários:** Gerenciamento de usuários do sistema.
- ✔️ **Controle de Estoque:** Visão em tempo real da quantidade de cada produto.
- ✔️ **Lógica de Negócio:** Atualização automática do estoque a cada nova movimentação.
- ✔️ **Histórico Completo:** Log detalhado de todas as entradas e saídas.
- ✔️ **Alertas Inteligentes:** Configuração de estoque mínimo para evitar falta de produtos.
- 💡 **Planejado para o Futuro:** Geração e leitura de QR Codes para agilizar as operações.

---

## 💻 Tecnologias Utilizadas

Este projeto está sendo construído utilizando um ecossistema moderno e robusto:

* **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
* **Ambiente de Execução:** [Node.js](https://nodejs.org/)
* **Framework da API:** [Express.js](https://expressjs.com/pt-br/)
* **Banco de Dados:** [PostgreSQL](https://www.postgresql.org/) (via [Docker](https://www.docker.com/))
* **ORM:** [Prisma](https://www.prisma.io/)
* **Documentação da API:** [Swagger](https://swagger.io/)

---

## 🚀 Como Começar (Ambiente de Desenvolvimento)

Siga os passos abaixo para configurar e rodar o projeto localmente.

### Pré-requisitos
* [Git](https://git-scm.com/)
* [Node.js (LTS)](https://nodejs.org/)
* [Docker](https://www.docker.com/products/docker-desktop/)

### Guia de Instalação

1.  **Clone o Repositório**
    ```bash
    git clone [https://github.com/Walisson-Sales/stockapp](https://github.com/Walisson-Sales/stockapp)
    cd stockapp
    ```

2.  **Configure as Variáveis de Ambiente**
    * Crie um arquivo chamado `.env` na raiz do projeto.
    * Copie o conteúdo do arquivo `.env.example` (se existir) ou use o modelo abaixo:
    ```env
    # .env

    # Configurações para o Prisma se conectar ao banco
    DATABASE_URL="postgresql://user:mypassword@localhost:5432/stockapp?sslmode=disable"

    # Configurações para o Docker criar o banco
    POSTGRES_USER=user
    POSTGRES_PASSWORD=mypassword
    POSTGRES_DB=stockapp
    ```

3.  **Inicie o Banco de Dados com Docker**
    Este comando vai criar e iniciar o container do PostgreSQL em segundo plano.
    ```bash
    docker-compose up -d
    ```

4.  **Instale as Dependências do Projeto**
    ```bash
    npm install
    ```

5.  **Aplique as Migrações do Banco de Dados**
    Este comando irá ler o `schema.prisma` e criar todas as tabelas no seu banco de dados Docker.
    ```bash
    npx prisma migrate dev
    ```

6.  **Rode o Projeto**
    ```bash
    npm run dev
    ```
    * 🚀 Sua API estará rodando em `http://localhost:3000`.
    * 📚 A documentação do Swagger estará disponível em `http://localhost:3000/api-docs`.

---

## 🤝 Como Contribuir

Este é um projeto de equipe e toda contribuição é bem-vinda! Para garantir que o projeto continue organizado e consistente, por favor, leia nosso **[Guia de Contribuição](CONTRIBUTING.md)** antes de começar.