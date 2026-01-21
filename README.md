# 📋 FSC Task Manager

Um gerenciador de tarefas moderno e responsivo construído com React, criado para ajudar na organização e gestão eficiente de suas atividades diárias.

---



### Página Home - Dashboard

<img width="1908" height="902" alt="image" src="https://github.com/user-attachments/assets/d884f664-368b-44d9-9113-d6189a969631" />
_Visualização do dashboard com resumo das tarefas e estatísticas_

### Página de Detalhes da Tarefa

<img width="1905" height="899" alt="image" src="https://github.com/user-attachments/assets/dcf9c354-c2f9-428d-a676-a5d732f14169" />
_Página para editar e gerenciar detalhes de uma tarefa específica_

---

## 🛠️ Tecnologias Utilizadas

### Frontend

- **[React 19.2.0](https://react.dev/)** - Biblioteca JavaScript para construção de interfaces de usuário
- **[React Router DOM 7.12.0](https://reactrouter.com/)** - Roteamento declarativo e navegação dinâmica
- **[React Hook Form 7.71.1](https://react-hook-form.com/)** - Gerenciamento eficiente de formulários com validação
- **[React Query (@tanstack/react-query 5.90.19)](https://tanstack.com/query/latest)** - Gerenciamento de estado assíncrono e cache de dados

### Estilização

- **[Tailwind CSS 4.1.18](https://tailwindcss.com/)** - Framework CSS utility-first para design responsivo
- **[Tailwind Merge](https://github.com/dcastil/tailwind-merge)** - Merging inteligente de classes Tailwind
- **[Tailwind Variants 3.2.2](https://www.tailwind-variants.org/)** - Sistema de variantes para componentes reutilizáveis

### HTTP & API

- **[Axios 1.13.2](https://axios-http.com/)** - Cliente HTTP para requisições a APIs
- **[JSON Server 1.0.0-beta.3](https://github.com/typicode/json-server)** - Servidor fake para prototipagem e desenvolvimento

### Notificações & UX

- **[Sonner 2.0.7](https://sonner.emilkowal.ski/)** - Toast notifications elegantes e modernas

### Ícones & Assets

- **[Vite Plugin SVGR 4.5.0](https://github.com/pd4d10/vite-plugin-svgr)** - Importação de SVGs como componentes React

### Utilitários

- **[UUID 13.0.0](https://github.com/uuidjs/uuid)** - Geração de IDs únicos
- **[React Transition Group 4.4.5](https://reactcommunity.org/react-transition-group/)** - Animações e transições de componentes

### Qualidade de Código

- **[ESLint 9.39.1](https://eslint.org/)** - Linter JavaScript para manutenção de padrões de código
- **[Prettier 3.7.4](https://prettier.io/)** - Formatador de código automático
- **[Husky 9.1.7](https://typicode.github.io/husky/)** - Git hooks para validação pré-commit
- **[Lint Staged 16.2.7](https://github.com/okonet/lint-staged)** - Executa linters em arquivos staged

### Build & Development

- **[Vite 7.2.4](https://vitejs.dev/)** - Build tool ultra-rápido e servidor de desenvolvimento
- **[@vitejs/plugin-react 5.1.1](https://github.com/vitejs/vite-plugin-react)** - Plugin React para Vite com HMR rápido

---

## 🚀 Como Iniciar

### Pré-requisitos

- Node.js (versão 14+)
- npm ou yarn

### Instalação

1. Clone o repositório:

```bash
git clone <seu-repositorio>
cd fsc-task-manager
```

2. Instale as dependências:

```bash
npm install
```

### Desenvolvimento

1. Inicie o servidor fake (em um terminal):

```bash
npx json-server db.json
```

2. Inicie o servidor de desenvolvimento (em outro terminal):

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

### Build para Produção

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`

### Preview da Build

```bash
npm run preview
```

### Lint de Código

```bash
npm run lint
```

---

## 📁 Estrutura do Projeto

```
src/
├── pages/                 # Páginas da aplicação
│   ├── Home.jsx          # Dashboard principal
│   ├── Tasks.jsx         # Página de tarefas
│   └── TaskDetails.jsx   # Detalhes de uma tarefa
├── components/           # Componentes reutilizáveis
│   ├── Header.jsx
│   ├── Sidebar.jsx
│   ├── TaskForm.jsx
│   ├── TaskItem.jsx
│   └── ...
├── hooks/                # Custom hooks
│   └── data/             # Hooks de gerenciamento de dados
│       ├── use-get-tasks.js
│       ├── use-get-task.js
│       ├── use-add-task.js
│       ├── use-update-task.js
│       └── use-delete-task.js
├── keys/                 # Query keys do React Query
│   └── queries.js
├── lib/                  # Bibliotecas e utilitários
│   └── axios.js          # Configuração do Axios
├── assets/               # Ícones e fontes
└── main.jsx              # Entrada da aplicação
```

---

## 🎯 Funcionalidades

✅ **Criar tarefas** - Adicione novas tarefas com título, descrição e horário  
✅ **Editar tarefas** - Modifique os detalhes de tarefas existentes  
✅ **Deletar tarefas** - Remova tarefas que não são mais necessárias  
✅ **Dashboard** - Visualize estatísticas e resumo das tarefas  
✅ **Formulários validados** - Validação robusta com React Hook Form  
✅ **Cache inteligente** - React Query mantém dados sincronizados  
✅ **Notificações** - Feedback visual com Sonner Toast

---

## 📝 Licença

Este projeto está licenciado sob a licença MIT.

---

## 👤 Autor

**André Santos**  
Desenvolvedor Full Stack


