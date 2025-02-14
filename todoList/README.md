# To-Do List - Full Stack

Este projeto é uma aplicação full stack de uma To-Do List, desenvolvida com **Prisma, TypeScript e Express** no backend e **Next.js e TypeScript** no frontend. O banco de dados utilizado é **SQLite**, rodando em um ambiente **WSL**.

## 📁 Estrutura do Projeto

### Backend

📂 **backend/**

- 📂 `src/`
  - 📂 `controller/` - Controladores da aplicação
  - 📂 `router/` - Definição das rotas
  - 📂 `service/` - Lógica de negócios e serviços
  - 📄 `app.ts` - Configuração principal do servidor
  - 📄 `swaggerConfig.ts` - Configuração do Swagger para documentação
- 📂 `prisma/` - Configuração do Prisma
- 📄 `.env` - Variáveis de ambiente
- 📄 `dev.db` - Banco de dados SQLite
- 📄 `package.json` - Dependências e scripts
- 📄 `tsconfig.json` - Configuração do TypeScript

### Frontend

📂 **frontend/**

- 📂 `src/`
  - 📂 `app/`
    - 📂 `home/` - Página principal
    - 📂 `register/` - Página de cadastro
  - 📂 `components/` - Componentes reutilizáveis
    - 📂 `AddTask/` - Componente de adição de tarefas
    - 📂 `AlertModal/` - Modal de alerta
    - 📂 `TaskList/` - Lista de tarefas
    - 📂 `ui/` - Componentes da interface
      - 📄 `theme-provider.tsx` - Configuração de tema claro/escuro 🌗
  - 📂 `lib/` - Utilitários
  - 📂 `service/` - Serviços para requisições HTTP
  - 📂 `types/` - Definições de tipos TypeScript
  - 📄 `layout.tsx` - Layout base da aplicação
  - 📄 `globals.css` - Estilos globais

## 🚀 Tecnologias Utilizadas

### Backend

- **Node.js** com **Express**
- **TypeScript**
- **Prisma ORM**
- **Swagger** para documentação
- **Cors** para segurança

### Frontend

- **Next.js** com **React**
- **TypeScript**
- **Tailwind CSS** para estilos
- **Radix UI** para componentes acessíveis
- **ShadCN UI**
- **Axios** para requisições HTTP
- **Lucide React** para ícones
- **Validação com Validator.js**
- **Modo claro/escuro integrado** 🌗

## 📜 Como Rodar o Projeto

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Acesse o frontend em **http://localhost:3000** e o backend em **http://localhost:5000**.

---

💡 _Projeto em desenvolvimento! Novas funcionalidades em breve!_
