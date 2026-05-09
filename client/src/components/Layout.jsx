// import React from "react";
// import { Outlet } from "react-router-dom";
// import Navigation from "./Navigation";
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// const Layout = () => {
//   return (
//     <div className="max-w-screen-sm mx-auto mt-10 p-5 shadow-sm border rounded">
//       <ToastContainer />
//       <Navigation />
//       <Outlet />
//     </div>
//   );
// };

// export default Layout;

import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <ToastContainer
        position="top-right"
        autoClose={2500}
        theme="dark"
      />

      <div className="w-full max-w-4xl rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl p-8 md:p-10">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            TaskFlow
          </h1>
          <p className="text-gray-300 mt-2 text-sm md:text-base">
            Organize, manage and track your tasks efficiently.
          </p>
        </div>

        <Navigation />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;