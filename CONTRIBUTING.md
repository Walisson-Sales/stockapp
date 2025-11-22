# 🤝 Guia de Contribuição do StockApp

Obrigado pelo seu interesse em contribuir! Para manter o projeto organizado e o trabalho em equipe eficiente, pedimos que todos sigam as diretrizes abaixo.

## 💻 Fluxo de Trabalho com Git

**Regra de Ouro:** Nunca trabalhe diretamente na branch `main`. Todo o desenvolvimento ativo acontece nas branches `dev` (para novas funcionalidades) e `bugfix` (para correções).

---
### Para Novas Funcionalidades (usando a branch `dev`)

1.  **Mude para a branch `dev`:**
    ```bash
    git checkout dev
    ```

2.  **Sincronize com o Repositório (Passo MAIS Importante):**
    Baixe as alterações mais recentes que seus colegas fizeram para evitar conflitos.
    ```bash
    git pull origin dev
    ```

3.  **Faça seu Trabalho:**
    Crie e edite seu código diretamente na branch `dev`.

4.  **Salve e Envie suas Alterações:**
    ```bash
    # Adicione os arquivos que você modificou
    git add .

    # Crie o commit com uma mensagem clara
    git commit -m "feat: Descreva a nova funcionalidade"

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

> **Aviso:** Se ao dar `push` você receber um erro, provavelmente significa que alguém enviou código novo enquanto você trabalhava. Você precisará rodar `git pull` novamente, resolver os possíveis conflitos, e então tentar o `push` de novo.

# 🛠️ Guia de Instalação do Ambiente de Desenvolvimento

Para rodar o projeto **StockApp** na sua máquina local, você não precisa instalar o banco de dados PostgreSQL diretamente. Nós usamos o **Docker** para isso, o que facilita muito a configuração e garante que todos da equipe usem a mesma versão.

Abaixo estão os **4 softwares obrigatórios** que você precisa baixar e instalar antes de começar a codificar.

---

## Checklist Rápido

Estes são os itens que você precisará ter instalados. Os detalhes de cada um estão logo abaixo.

1.  ✅ **Node.js (Versão LTS)** - Para rodar o JavaScript/TypeScript.
2.  ✅ **Git** - Para clonar (baixar) o repositório.
3.  ✅ **Docker Desktop** - Para rodar o banco de dados sem complicações.
4.  ✅ **Visual Studio Code** - O nosso editor de código.

---

## Passo a Passo Detalhado

Siga a ordem abaixo para evitar problemas de configuração.

### 1. Node.js (O Motor do Projeto)

O Node.js é o ambiente que permite rodar JavaScript fora do navegador. Sem ele, o servidor do nosso projeto não funciona.

* **Onde baixar:** [https://nodejs.org/](https://nodejs.org/)
* **Qual versão escolher:** Sempre escolha a versão marcada como **LTS (Long Term Support)**. Ela é a mais estável e recomendada. Atualmente, são as versões 20.x ou 18.x.
* **Como instalar:** Baixe o instalador para seu sistema operacional e vá clicando em "Next" até finalizar. As opções padrão já são suficientes.

### 2. Git (Para Baixar o Código)

O Git é o sistema que usamos para controlar as versões do nosso código e para baixar o projeto do GitHub para sua máquina.

* **Onde baixar:** [https://git-scm.com/downloads](https://git-scm.com/downloads)
* **Como instalar:** Baixe a versão para seu sistema operacional e execute o instalador.
    * *Nota para Windows:* Durante a instalação, haverá muitas telas com opções técnicas. Pode aceitar as opções padrão em todas elas clicando em "Next".

### 3. Docker Desktop (O Banco de Dados Portátil)

Esta é a parte mais importante para que todos tenham o mesmo banco de dados rodando sem precisar configurar portas e usuários manualmente no Windows, Mac ou Linux. O Docker cria um "container" isolado onde nosso banco PostgreSQL vai rodar.

* **Onde baixar:** [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)
* **Como instalar:** Baixe e execute o instalador apropriado para seu sistema (Windows, Mac com chip Intel, ou Mac com chip Apple).
* ⚠️ **ATENÇÃO (Usuários de Windows):** O Docker no Windows geralmente pede para instalar ou atualizar o **WSL 2** (Windows Subsystem for Linux). Se ele pedir durante a instalação, aceite e siga as instruções da Microsoft. Isso é normal e necessário para o desempenho.
* **Pós-instalação (Obrigatório):** Após terminar a instalação, **abra o aplicativo "Docker Desktop"** no seu computador. Você verá um ícone de baleia na sua barra de tarefas (perto do relógio). **Ele precisa estar rodando (ícone verde ou branco fixo)** para que você consiga subir o projeto depois.

### 4. Visual Studio Code (O Editor)

Se você ainda não tem, este é o editor de código padrão que usaremos no projeto.

* **Onde baixar:** [https://code.visualstudio.com/](https://code.visualstudio.com/)
* **Como instalar:** Instalação padrão ("Next", "Next", "Finish").

---

## ✅ Verificando se deu tudo certo

Após instalar tudo, abra o terminal do seu computador (Prompt de Comando no Windows, Terminal no Mac/Linux) e digite os comandos abaixo um por um para verificar as versões.

Se aparecerem números de versão como resposta, significa que está tudo pronto!

```bash
# 1. Verifica a versão do Node (deve ser v18 ou superior)
node -v
# Exemplo de saída esperada: v20.11.0

# 2. Verifica a versão do Git
git --version
# Exemplo de saída esperada: git version 2.43.0

# 3. Verifica se o Docker está respondendo
# (IMPORTANTE: O aplicativo Docker Desktop deve estar aberto!)
docker --version
# Exemplo de saída esperada: Docker version 25.0.3, build 4debf41
```

## 🗣️ Comunicação

Para evitar conflitos, sempre avise no nosso grupo de comunicação (WhatsApp/Discord) antes de começar a trabalhar em uma funcionalidade grande ou de fazer um `push` com muitas alterações. Uma boa comunicação é a chave para o sucesso do time!