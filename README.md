# Kanban Task

![Kanban Task Project Image](public/og-image.webp)

A Kanban-style task management application, developed with Next.js, React, Zustand, TailwindCSS, and Radix UI.

## ✨ Features

- Create, edit, and delete boards
- Add, move, and delete tasks
- Modal to create and edit tasks
- Sidebar with theme switching (light/dark)
- Drag and drop with react-dnd
- Responsive and modern interface

## 🚀 Technologies Used

- [Next.js](https://nextjs.org/) 15
- [React](https://react.dev/) 19
- [Zustand](https://zustand-demo.pmnd.rs/)
- [TailwindCSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Lucide React](https://lucide.dev/)
- [React Hook Form](https://react-hook-form.com/)
- [nanoid](https://github.com/ai/nanoid)

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/SamuelOliveiraa/kanban-task.git
   cd kanban-task
   ```
2. Install the dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Run the project in development mode:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

Access [http://localhost:3000](http://localhost:3000) to view the app.

## 🗂 Folder Structure

```
src/
  app/           # Next.js pages and layouts
  components/    # Reusable components (UI, modals, sidebar, etc)
  hooks/         # Custom hooks
  layout/        # Layout components (Header, Sidebar, Board)
  lib/           # Utility functions
  types/         # TypeScript types
```

## 📝 Scripts

- `npm run dev` — Starts the development server
- `npm run build` — Generates the production build
- `npm start` — Starts the production server
- `npm run lint` — Runs the linter

## 📄 License

This project is open-source and is under the MIT license.
