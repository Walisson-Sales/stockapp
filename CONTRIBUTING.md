# 🚀 Guia de Contribuição - StockApp

Bem-vindo ao time! Este guia contém tudo que você precisa para configurar seu ambiente e começar a contribuir com o projeto.

## 1. Conectando o Firebase Studio ao GitHub

Para que você possa enviar (`push`) e receber (`pull`) o código do projeto, você precisa autorizar o Firebase Studio (IDX) a se conectar com sua conta do GitHub.

1.  **Acesse o Ambiente de Trabalho (Workspace)**
    Use o link do workspace compartilhado para abrir o projeto no Firebase Studio.

2.  **Abra o Terminal**
    Dentro do ambiente, abra um novo terminal (geralmente no menu superior `Terminal > New Terminal`).

3.  **Inicie a Autenticação**
    No terminal, digite o seguinte comando para tentar baixar as últimas atualizações. Isso forçará o pedido de autenticação.
    ```bash
    git pull
    ```

4.  **Clique na Notificação de Login**
    O IDX mostrará um pop-up ou uma notificação com um botão **`Sign in with GitHub`** (Entrar com o GitHub). Clique nesse botão.

5.  **Autorize no Site do GitHub**
    Seu navegador abrirá uma nova aba. Faça login no GitHub, se necessário, e digite a senha que você já copiou automaticamente quando foi para a outra página e clique para confirmar.

6.  **Confirme a Conexão**
    Após autorizar, você será redirecionado de volta para o Firebase Studio. A conexão estará completa e o comando `git pull` agora deve funcionar.

## 2. Fluxo de Trabalho (subindo o seu código)

Para garantir a organização do projeto, todo o desenvolvimento será feito nas branches `dev` e `bugfix`. A branch `main` será usada apenas para a versão estável e final.

### Regra de Ouro
**Sempre sincronize (`git pull`) antes de começar a trabalhar** e salve (`commit` e `push`) suas alterações com frequência para evitar conflitos grandes.

---
### Para Novas Funcionalidades (usando a branch `dev`)

1.  **Mude para a branch `dev` (Certifique-se de estar na branch certa!!):**
    ```bash
    git checkout dev
    ```

2.  **Sincronize com o Repositório (Passo MAIS Importante):**
    Baixe as alterações mais recentes que seus colegas fizeram para evitar conflitos.
    ```bash
    git pull origin dev
    ```
    (faça isso antes de começar a trabalhar no código)

3.  **Faça seu Trabalho:**
    Crie e edite seu código diretamente na branch `dev`.

4.  **Salve e Envie suas Alterações:**
    ```bash
    # Adicione os arquivos que você modificou
    git add .

    # Crie o commit com uma mensagem clara (ex: "Adiciona tela de login")
    git commit -m "Descreva a nova funcionalidade"

    # Envie suas alterações para o GitHub
    git push origin dev
    ```
---
### Para Correção de Bugs (usando a branch `bugfix`)

O processo é o mesmo, mas usando a branch `bugfix`.

1.  **Mude para a branch `bugfix`:**
    ```bash
    git checkout bugfix
    ```

2.  **Sincronize com o Repositório:**
    ```bash
    git pull origin bugfix
    ```

3.  **Codifique a Correção.**

4.  **Salve e Envie suas Alterações:**
    ```bash
    git add .
    git commit -m "fix: Descreve o bug que foi corrigido"
    git push origin bugfix
    ```
(essa branch bugfix serve para você mandar o código com problema e eu possa ajudar a resolver)

> **Aviso:** Se ao dar `push` você receber um erro, provavelmente significa que alguém enviou código novo enquanto você trabalhava. Você precisará rodar `git pull` novamente, resolver os possíveis conflitos, e então tentar o `push` de novo.