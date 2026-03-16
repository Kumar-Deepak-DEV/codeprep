import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function DashboardLayout({ children, title }) {

  return (

    <div className="flex bg-[#020617] min-h-screen">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <Topbar title={title} />

        <div className="p-6 flex-1">

          {children}

        </div>

        <footer className="w-full text-center p-4 border-t border-white/10 text-gray-500 text-sm mt-auto bg-[#020617]">
          &copy; {new Date().getFullYear()} CodePrep. All rights reserved. Let's conquer algorithms together!
        </footer>

      </div>

    </div>

  );
}

export default DashboardLayout;