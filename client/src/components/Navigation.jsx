// import React from "react";
// import { NavLink } from "react-router-dom";
// import { RouteIndex, RouteTaskList } from "../helper/RouteName";

// const Navigation = () => {
//   const baseClass =
//     "px-6 py-3 rounded-2xl font-medium text-sm transition-all duration-300";

//   const activeClass =
//     "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30";

//   const inactiveClass =
//     "bg-white/10 text-gray-300 border border-white/10 hover:bg-white/20 hover:text-white";

//   return (
//     <div className="flex gap-4 mb-8 border-b border-white/10 pb-6 flex-wrap">
//       <NavLink
//         to={RouteIndex}
//         className={({ isActive }) =>
//           `${baseClass} ${isActive ? activeClass : inactiveClass}`
//         }
//       >
//         Add Task
//       </NavLink>

//       <NavLink
//         to={RouteTaskList}
//         className={({ isActive }) =>
//           `${baseClass} ${isActive ? activeClass : inactiveClass}`
//         }
//       >
//         My Tasks
//       </NavLink>
//     </div>
//   );
// };

// export default Navigation;


import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { RouteIndex, RouteTaskList } from "../helper/RouteName";

const Navigation = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const baseClass =
    "px-6 py-3 rounded-2xl font-medium text-sm transition-all duration-300";

  const activeClass =
    "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30";

  const inactiveClass =
    "bg-white/10 text-gray-300 border border-white/10 hover:bg-white/20 hover:text-white";

  return (
    <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-6 flex-wrap gap-4">
      <div className="flex gap-4 flex-wrap">
        <NavLink
          to={RouteIndex}
          className={({ isActive }) =>
            `${baseClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          Add Task
        </NavLink>

        <NavLink
          to={RouteTaskList}
          className={({ isActive }) =>
            `${baseClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          My Tasks
        </NavLink>
      </div>

      <button
        onClick={logout}
        className="px-6 py-3 rounded-2xl bg-red-500/80 text-white font-medium hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Navigation;