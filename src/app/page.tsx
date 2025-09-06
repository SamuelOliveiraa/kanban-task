import SwitchSidebar from "@/components/SwitchSidebar";
import Header from "@/layout/Header";
import SideBar from "@/layout/SideBar";

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen w-full transition-colors duration-300">
      <Header />
      <SideBar />
      <SwitchSidebar />
      {/*  <Board /> */}
    </div>
  );
}
