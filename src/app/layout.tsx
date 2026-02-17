import { SidebarProvider } from "@/components/ui/sidebar";
import { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const PlusJakart = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta"
});

export const metadata: Metadata = {
  title: "Kanban Task",
  description:
    "Organize suas tarefas com nosso Kanban Task Online. Visualize, arraste e acompanhe o progresso de um ou mais projetos de forma simples e intuitiva.",
  robots: "index, follow",
  openGraph: {
    title: "Kanban Task",
    description: "Organize suas tarefas com nosso Kanban Task Online.",
    url: "https://kanban-task-samuel.vercel.app/",
    siteName: "Kanban Task",
    locale: "pt-BR",
    images: [
      {
        url: "https://kanban-task-samuel.vercel.app/og-image.webp",
        width: 800,
        height: 600,
        alt: "Kanban Task"
      }
    ]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={PlusJakart.variable} suppressHydrationWarning>
      <body className="font-sans">
        <ThemeProvider attribute="class" enableSystem>
          <SidebarProvider className="flex">{children}</SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
