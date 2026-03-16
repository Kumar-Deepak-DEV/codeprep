import { NavLink } from "react-router-dom";
import {
  FiGrid,
  FiBook,
  FiRefreshCw,
  FiTarget,
  FiBarChart2,
  FiUser
} from "react-icons/fi";

function Sidebar() {

  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: <FiGrid /> },
    { name: "Problems", path: "/problems", icon: <FiBook /> },
    { name: "Revision", path: "/revision", icon: <FiRefreshCw /> },
    { name: "Goals", path: "/goals", icon: <FiTarget /> },
    { name: "Analytics", path: "/analytics", icon: <FiBarChart2 /> },
    { name: "Profile", path: "/profile", icon: <FiUser /> }
  ];

  return (

    <div className="w-64 min-h-screen bg-[#0f172a] border-r border-white/10 flex flex-col">

      {/* Logo */}

      <div className="p-6 text-xl font-bold text-white">
        Code<span className="text-blue-400">Prep</span>
      </div>


      {/* Menu */}

      <div className="flex flex-col gap-2 px-3">

        {menu.map((item) => (

          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg text-gray-300 hover:bg-blue-500/10 hover:text-white transition ${
                isActive ? "bg-blue-500/20 text-white" : ""
              }`
            }
          >

            <span className="text-lg">{item.icon}</span>

            <span>{item.name}</span>

          </NavLink>

        ))}

      </div>

    </div>

  );
}

export default Sidebar;