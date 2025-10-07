# Kanban Task

Um aplicativo de gerenciamento de tarefas estilo Kanban, desenvolvido com Next.js, React, Zustand, TailwindCSS e Radix UI.

## ✨ Funcionalidades

- Criação, edição e exclusão de quadros (boards)
- Adição, movimentação e exclusão de tarefas
- Modal para criar e editar tarefas
- Sidebar com alternância de tema (claro/escuro)
- Drag and drop com react-dnd
- Interface responsiva e moderna

## 🚀 Tecnologias Utilizadas

- [Next.js](https://nextjs.org/) 15
- [React](https://react.dev/) 19
- [Zustand](https://zustand-demo.pmnd.rs/)
- [TailwindCSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Lucide React](https://lucide.dev/)
- [React Hook Form](https://react-hook-form.com/)
- [nanoid](https://github.com/ai/nanoid)

## 📦 Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/SamuelOliveiraa/kanban-task.git
   cd kanban-task
   ```
2. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn install
   ```
3. Rode o projeto em modo desenvolvimento:
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

Acesse [http://localhost:3000](http://localhost:3000) para visualizar o app.

## 🗂 Estrutura de Pastas

```
src/
  app/           # Páginas e layouts do Next.js
  components/    # Componentes reutilizáveis (UI, modais, sidebar, etc)
  hooks/         # Hooks customizados
  layout/        # Componentes de layout (Header, Sidebar, Board)
  lib/           # Funções utilitárias
  types/         # Tipagens TypeScript
```

## 📝 Scripts

- `npm run dev` — Inicia o servidor de desenvolvimento
- `npm run build` — Gera a build de produção
- `npm start` — Inicia o servidor em produção
- `npm run lint` — Executa o linter

## 📄 Licença

Este projeto é open-source e está sob a licença MIT.
