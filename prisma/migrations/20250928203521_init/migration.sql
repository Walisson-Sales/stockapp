/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."users";

-- CreateTable
CREATE TABLE "public"."Usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "nomeEmpresa" TEXT NOT NULL,
    "tipoComercio" TEXT NOT NULL,
    "cpfCnpj" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Produto" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cor" TEXT,
    "tamanho" TEXT,
    "precoCusto" DECIMAL(65,30) NOT NULL,
    "precoVenda" DECIMAL(65,30) NOT NULL,
    "idCategoria" INTEGER NOT NULL,
    "idUsuario" INTEGER NOT NULL,

    CONSTRAINT "Produto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Estoque" (
    "id" SERIAL NOT NULL,
    "quantidadeAtual" INTEGER NOT NULL,
    "quantidadeMinima" INTEGER NOT NULL,
    "localProduto" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Disponivel',
    "idProduto" INTEGER NOT NULL,

    CONSTRAINT "Estoque_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Categoria" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Movimentacao" (
    "id" SERIAL NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "tipoMovimentacao" TEXT NOT NULL,
    "descricao" TEXT,
    "dataMovimentacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "idUsuario" INTEGER NOT NULL,
    "idProduto" INTEGER NOT NULL,

    CONSTRAINT "Movimentacao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Estoque_idProduto_key" ON "public"."Estoque"("idProduto");

-- AddForeignKey
ALTER TABLE "public"."Produto" ADD CONSTRAINT "Produto_idCategoria_fkey" FOREIGN KEY ("idCategoria") REFERENCES "public"."Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Produto" ADD CONSTRAINT "Produto_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Estoque" ADD CONSTRAINT "Estoque_idProduto_fkey" FOREIGN KEY ("idProduto") REFERENCES "public"."Produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Movimentacao" ADD CONSTRAINT "Movimentacao_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Movimentacao" ADD CONSTRAINT "Movimentacao_idProduto_fkey" FOREIGN KEY ("idProduto") REFERENCES "public"."Produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
