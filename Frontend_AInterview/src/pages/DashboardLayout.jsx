import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import { useTheme } from "../context/ThemeContext";
import { Menu, X } from "lucide-react";

export default function DashboardLayout() {
  const { isDark } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="dashboard-layout min-h-screen overflow-x-hidden">

        <Sidebar open={open} onClose={() => setOpen(false)} />

        {open && (
          <div
            className="fixed inset-0 z-20 bg-black/30"
            onClick={() => setOpen(false)}
          />
        )}

        <main className="min-h-screen flex flex-col">
          <header className="navbar sticky top-0 z-10 flex items-center px-4 lg:px-6 py-3 shadow-sm">
            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-lg transition-all duration-150
                         text-slate-500 hover:text-slate-900 hover:bg-slate-100
                         dark:text-white/40 dark:hover:text-white dark:hover:bg-white/6"
              aria-label={open ? "Close sidebar" : "Open sidebar"}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </header>

          <div className="flex-1 w-full max-w-7xl mx-auto px-4 lg:px-8 py-0">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
}