import { SidebarProvider } from "@/components/ui/sidebar";
import { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const PlusJakart = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"]
});

export const metadata: Metadata = {
  title: "Kanban Task",
  description:
    "Organize suas tarefas com nosso Kanban Task Online. Visualize, arraste e acompanhe o progresso de um ou mais projetos de forma simples e intuitiva.",
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={PlusJakart.className}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider attribute="class" enableSystem>
          <SidebarProvider className="flex">{children}</SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
