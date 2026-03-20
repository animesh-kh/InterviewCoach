import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import { getCurrentUser } from "../utils/api";
import { useTheme } from "../context/ThemeContext";
import ThemeToggle from "../context/ThemeToggle";
import { ArrowLeft } from "lucide-react";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("User");
  const { isDark } = useTheme();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await getCurrentUser();
        if (user?.full_name) {
          setUserName(user.full_name);
        }
      } catch (error) {
        console.error(error);
      }
    };
    loadUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className={`dashboard-layout min-h-screen flex ${isDark ? "dark" : ""}`}>
      <Sidebar />

      <main className="flex-1 overflow-y-auto relative">

        <div className="flex justify-end gap-4 p-6 items-center">

          <ThemeToggle />

          <button
            onClick={goBack}
            className="bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-white text-slate-800 px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <ArrowLeft size={16}/> Back
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>

        </div>

        <div className="px-8 pb-8 max-w-7xl mx-auto">
          <Outlet />
        </div>

      </main>
    </div>
  );
}