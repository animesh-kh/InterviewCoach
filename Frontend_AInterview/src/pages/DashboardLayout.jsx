import { Outlet } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";
import Sidebar from "../components/dashboard/Sidebar";

export default function DashboardLayout() {
  const { user } = useUser();

  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <h2 className="text-lg font-semibold text-slate-900">
            Welcome back, {user?.firstName || "User"} 👋
          </h2>

          <UserButton afterSignOutUrl="/" />
        </header>

        {/* Page Content */}
        <div className="p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}