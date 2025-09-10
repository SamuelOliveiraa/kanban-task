import SwitchSidebar from "@/components/SwitchSidebar";
import Board from "@/layout/Board";
import Header from "@/layout/Header";
import SideBar from "@/layout/SideBar";

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen w-full transition-colors duration-300 flex flex-col overflow-hidden">
      <Header />
      <SwitchSidebar />
      <main className="flex flex-1 transition-colors duration-300 bg-gray-neutral">
        <SideBar />
        <Board />
      </main>
    </div>
  );
}
