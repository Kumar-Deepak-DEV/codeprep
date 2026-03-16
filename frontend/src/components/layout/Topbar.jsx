import { FiBell, FiHelpCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function Topbar({ title }) {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (

    <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#020617]">

      {/* Page Title */}

      <h1 className="text-xl font-semibold text-white">
        {title}
      </h1>


      {/* Right icons */}

      <div className="flex items-center gap-5 text-gray-300 text-lg">

        <FiBell className="cursor-pointer hover:text-white" />

        <FiHelpCircle className="cursor-pointer hover:text-white" />
        
        <button 
          onClick={handleLogout}
          className="ml-4 px-4 py-1.5 text-sm bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 rounded-lg transition"
        >
          Logout
        </button>

      </div>

    </div>

  );
}

export default Topbar;