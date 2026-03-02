import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  History,
  TrendingUp,
  Award
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Award className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight">
            InterviewMind
          </span>
        </div>

        <nav className="space-y-1">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg font-medium ${
                isActive
                  ? "text-indigo-600 bg-indigo-50"
                  : "text-slate-600 hover:bg-slate-50"
              }`
            }
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </NavLink>

          <NavLink
            to="/dashboard/history"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg ${
                isActive
                  ? "text-indigo-600 bg-indigo-50"
                  : "text-slate-600 hover:bg-slate-50"
              }`
            }
          >
            <History className="w-5 h-5" />
            History
          </NavLink>

          <NavLink
            to="/dashboard/analytics"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg ${
                isActive
                  ? "text-indigo-600 bg-indigo-50"
                  : "text-slate-600 hover:bg-slate-50"
              }`
            }
          >
            <TrendingUp className="w-5 h-5" />
            Analytics
          </NavLink>
        </nav>
      </div>
    </aside>
  );
}