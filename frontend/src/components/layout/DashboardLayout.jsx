import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function DashboardLayout({ children, title }) {
  return (
    <div className="flex bg-[#030604] text-[#e2fced] min-h-screen font-sans selection:bg-[#00FF66]/30 selection:text-[#00FF66] matrix-grid-bg">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <Topbar title={title} />

        <main className="p-6 md:p-8 flex-1 max-w-7xl w-full mx-auto">
          {children}
        </main>

        <footer className="w-full text-center py-5 border-t border-[#00FF66]/15 text-[#6ee7b7]/60 text-xs mt-auto bg-[#020504]/60 font-mono">
          CodePrep &bull; Matrix DSA Engine &bull; Track &bull; Analyze &bull; Conquer
        </footer>
      </div>
    </div>
  );
}

export default DashboardLayout;