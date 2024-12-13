# To-Do List API

## Sobre o Projeto

Esta é uma API de gerenciamento de tarefas. A aplicação permite a realização de operações de CRUD (Criar, Ler, Atualizar e Excluir) para tarefas e autenticar usuários

### Funcionalidades

**Gerenciamento de Usuários:**

* Criar usuários.
* Logar usuários.


**Gerenciamento de Tarefas:**

* Criar novas tarefas.
* Listar tarefas.
* Atualizar o status e descrição de tarefas.
* Excluir tarefas.

### Autenticação e Autorização:

* Autenticação baseada em JWT (JSON Web Token).
* Controle de acesso para garantir que os usuários gerenciem apenas suas próprias tarefas.

## Tecnologias Utilizadas

* Linguagem: Node.js (TypeScript)

* Framework: Express.js

* Banco de Dados: PostgreSQL (com Prisma ORM)

* Autenticação: JWT


## Rotas da API

**Usuários**

* POST /users/register - Criar um novo usuário.

**Tarefas**

* POST /tasks - Criar uma nova tarefa.
* GET /tasks - Listar todas as tarefas.
* GET /tasks/:id - Listar uma tarefa.
* PUT /tasks/:id - Atualizar uma tarefa.
* DELETE /tasks/:id - Excluir uma tarefa.

**Autenticação**

* POST /users/login - Autenticar um usuário e obter um token JWT.
