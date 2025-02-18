# API de Usuários em Node.js

Uma API simples para gerenciar informações de usuários. Você pode criar, ver, atualizar e deletar usuários.

## O que ela faz?

Esta API permite que você faça o seguinte com informações de usuários:

*   **Ver** a lista de todos os usuários
*   **Criar** novos usuários
*   **Ver** os detalhes de um usuário específico
*   **Atualizar** as informações de um usuário
*   **Deletar** um usuário

## Tecnologias que usei

*   **Node.js**: Para fazer a API funcionar.
*   **Express.js**: Para organizar a API.
*   **PostgreSQL**: Para guardar os dados dos usuários.

## Como usar?

Para usar esta API, você precisa ter o seguinte instalado:

*   **Node.js** (e o `npm` que vem com ele)
*   **Docker** (se quiser usar a forma mais fácil de rodar)

### Usando Docker (mais fácil)

1.  **Baixe o projeto:**

    ```bash
    git clone https://github.com/tafarelyan/javascript_study
    cd javascript_study
    ```

2.  **Comece a API com Docker:**

    ```bash
    docker-compose up --build
    ```

    A API vai começar a rodar.

## Como usar a API (comandos básicos)

Você pode usar programas como Postman ou Insomnia para testar a API. Aqui estão os comandos principais:

### Para usuários (`/users`)

*   **Criar um usuário (POST /users)** - Envie um "pedido" com informações como nome, email e senha para criar um novo usuário.

    **Exemplo de pedido (JSON):**

    ```json
    {
        "nome": "Nome do Usuário",
        "email": "[endereço de e-mail removido]",
        "senha": "senha123"
    }
    ```

*   **Ver lista de usuários (GET /users)** - "Peça" para ver a lista de todos os usuários.

    **Exemplo de pedido:**

    ```
    GET /users
    ```

*   **Ver um usuário (GET /users/ID)** - "Peça" para ver um usuário específico, usando o número de ID dele. Exemplo: `GET /users/1` para ver o usuário com ID 1.

    **Exemplo de pedido:**

    ```
    GET /users/1
    ```

*   **Atualizar um usuário (PUT /users/ID)** - Envie um "pedido" para mudar as informações de um usuário, usando o número de ID dele e as novas informações (nome, email, senha). Exemplo: `PUT /users/1`.

    **Exemplo de pedido (JSON):**

    ```json
    {
        "nome": "Novo Nome",
        "email": "[endereço de e-mail removido]"
    }
    ```

*   **Deletar um usuário (DELETE /users/ID)** - "Peça" para deletar um usuário, usando o número de ID dele. Exemplo: `DELETE /users/1`.

    **Exemplo de pedido:**

    ```
    DELETE /users/1
    ```