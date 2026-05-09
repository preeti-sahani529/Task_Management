import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import TaskListPage from "./pages/TaskListPage";
import ShowTask from "./pages/ShowTask";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="/task-list" element={<TaskListPage />} />
          <Route path="/show-task/:taskid" element={<ShowTask />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;