# ✅ Task Manager - Sistema de Gerenciamento de Tarefas

Um sistema completo de gerenciamento de tarefas com autenticação JWT, desenvolvido com React no frontend e Node.js no backend. Projeto desenvolvido para demonstrar habilidades em desenvolvimento fullstack.

## 🎯 Sobre o Projeto

Task Manager é uma aplicação fullstack que permite usuários gerenciarem suas tarefas de forma simples e intuitiva. O sistema conta com autenticação segura (JWT), operações CRUD completas e uma interface moderna e responsiva.

**Objetivo:** Demonstrar habilidades em desenvolvimento web com as principais tecnologias do mercado.

## ⚙️ Funcionalidades

### 🔐 Autenticação
- [x] Cadastro de novos usuários
- [x] Login com email e senha
- [x] Senhas criptografadas com bcrypt
- [x] Tokens JWT para autenticação
- [x] Proteção de rotas privadas

### 📝 Gerenciamento de Tarefas
- [x] Criar novas tarefas
- [x] Listar tarefas do usuário logado
- [x] Marcar tarefas como concluídas
- [x] Editar título das tarefas
- [x] Deletar tarefas
- [x] Estatísticas (total, pendentes, concluídas)
- [x] Data de criação das tarefas

### 🎨 Interface
- [x] Design responsivo
- [x] Feedback visual para ações
- [x] Estados de loading
- [x] Mensagens de erro amigáveis
- [x] Indicadores de estatísticas
- [x] Página customizada de login/cadastro

## 🚀 Tecnologias Utilizadas

### Backend
- **Node.js** - Ambiente de execução JavaScript
- **Express** - Framework web
- **Prisma ORM** - Modelagem e migrations
- **PostgreSQL** - Banco de dados relacional
- **JWT** - Autenticação por tokens
- **Bcrypt** - Criptografia de senhas
- **Cors** - Compartilhamento de recursos

### Frontend
- **React** - Biblioteca para interfaces
- **Vite** - Build tool e desenvolvimento
- **React Router DOM** - Roteamento
- **Axios** - Requisições HTTP
- **Context API** - Gerenciamento de estado
- **CSS Modules** - Estilização

### Ferramentas
- **Postman** - Testes de API
- **Prisma Studio** - Visualização do banco
- **Nodemon** - Hot reload no backend
- **ESLint** - Padronização de código

## 🔧 Pré-requisitos

Antes de começar, você precisa ter instalado:

- **Node.js** (versão 18 ou superior)
- **PostgreSQL** (versão 14 ou superior)
- **Git**
- **NPM** 
- Um cliente HTTP para testes (Postman, Insomnia)

## 🏁 Instalação e Execução

### 1. Clone o repositório
```bash
git clone https://github.com/vtgabrielcastro/task-manager.git
cd task-manager

# Entrar na pasta do backend
cd backend

# Instalar dependências
npm install

# Configurar variáveis de ambiente
# Crie um arquivo .env baseado no .env.example
cp .env.example .env

#.env example 
PORT=3001
DATABASE_URL="postgresql://postgres:senha@localhost:5432/taskmanager"
JWT_SECRET="sua_chave_secreta_super_segura_2024"

# Executar as migrations do Prisma
npx prisma migrate dev --name init

# (Opcional) Abrir Prisma Studio para visualizar o banco
npx prisma studio

# Iniciar o servidor backend
npm run dev

# Em outro terminal, entrar na pasta do frontend
cd frontend

# Instalar dependências
npm install

# Iniciar o frontend
npm run dev

```

## Melhorias Futuras

- **Edição de tarefas**

- **Paginação**

- **Deploy em ambiente cloud**

- **Testes automatizados**

- **Refresh token**

## 👨‍💻 Autor

***Victor Gabriel***
*Desenvolvedor Full Stack em formação*