import Board from "@/layout/Board";
import Header from "@/layout/Header";
import SideBar from "@/layout/SideBar";

export default function Home() {
  return (
    <div className="bg-gray-neutral min-h-screen w-full transition-colors duration-300 flex flex-col overflow-hidden">
      <Header />
      <main className="flex flex-1 transition-all duration-300">
        <SideBar />
        <Board />
      </main>
    </div>
  );
}
