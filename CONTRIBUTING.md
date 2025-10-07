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

## 🗣️ Comunicação

Para evitar conflitos, sempre avise no nosso grupo de comunicação (WhatsApp/Discord) antes de começar a trabalhar em uma funcionalidade grande ou de fazer um `push` com muitas alterações. Uma boa comunicação é a chave para o sucesso do time!