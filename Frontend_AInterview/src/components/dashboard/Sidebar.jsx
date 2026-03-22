import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, History, TrendingUp,
  FileText, ArrowLeft, LogOut, Brain,
} from "lucide-react";

const NAV_ITEMS = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard", end: true },
  { to: "/dashboard/history", icon: History, label: "History" },
  { to: "/dashboard/analytics", icon: TrendingUp, label: "Analytics" },
  { to: "/dashboard/resume", icon: FileText, label: "Resume" },
];

export default function Sidebar({ open, onClose }) {
  const navigate = useNavigate();

  return (
    <aside
      className={`
        fixed top-0 left-0 h-screen z-30
        w-64 flex flex-col
        bg-[#0e0e10] border-r border-white/[0.06]
        transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-white/[0.06]">
        <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
          <Brain size={16} className="text-indigo-400" />
        </div>
        <span className="text-white font-semibold text-[15px] tracking-tight">
          InterviewMind
        </span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-white/25 px-3 mb-3">
          Menu
        </p>

        {NAV_ITEMS.map(({ to, icon: Icon, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
               transition-all duration-150 border focus:outline-none focus:ring-0
               ${isActive
                 ? "bg-indigo-500/15 text-indigo-300 border-indigo-500/20"
                 : "text-white/50 hover:text-white/90 hover:bg-white/[0.05] border-transparent"
               }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  size={17}
                  className={`shrink-0 transition-colors ${
                    isActive ? "text-indigo-400" : "text-white/40 group-hover:text-white/70"
                  }`}
                />
                {label}
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-white/[0.06] space-y-0.5">
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-3 w-full px-3 py-2.5 rounded-lg
                     text-sm font-medium text-white/40 hover:text-white/80
                     hover:bg-white/[0.05] border border-transparent
                     transition-all duration-150
                     focus:outline-none focus:ring-0"
        >
          <ArrowLeft size={17} className="shrink-0 group-hover:-translate-x-0.5 transition-transform" />
          Go Back
        </button>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/", { replace: true });
          }}
          className="group flex items-center gap-3 w-full px-3 py-2.5 rounded-lg
                     text-sm font-medium text-red-400/70 hover:text-red-400
                     hover:bg-red-500/10 border border-transparent hover:border-red-500/15
                     transition-all duration-150
                     focus:outline-none focus:ring-0"
        >
          <LogOut size={17} className="shrink-0" />
          Logout
        </button>
      </div>
    </aside>
  );
}








// import { NavLink, useNavigate } from "react-router-dom";
// import {
//   LayoutDashboard, History, TrendingUp,
//   FileText, ArrowLeft, LogOut, Brain,
// } from "lucide-react";

// const NAV_ITEMS = [
//   { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard", end: true },
//   { to: "/dashboard/history", icon: History, label: "History" },
//   { to: "/dashboard/analytics", icon: TrendingUp, label: "Analytics" },
//   { to: "/dashboard/resume", icon: FileText, label: "Resume" },
// ];

// export default function Sidebar({ open, onClose }) {
//   const navigate = useNavigate();

//   return (
//     <aside
//       className={`
//         fixed top-0 left-0 h-screen z-30
//         w-64 flex flex-col
//         bg-[#0e0e10] border-r border-white/[0.06]
//         transition-transform duration-300 ease-in-out
//         ${open ? "translate-x-0" : "-translate-x-full"}
//       `}
//     >
//       <div className="flex items-center gap-2.5 px-5 py-5 border-b border-white/[0.06]">
//         <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
//           <Brain size={16} className="text-indigo-400" />
//         </div>
//         <span className="text-white font-semibold text-[15px] tracking-tight">
//           InterviewMind
//         </span>
//       </div>

//       <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
//         <p className="text-[10px] font-semibold uppercase tracking-widest text-white/25 px-3 mb-3">
//           Menu
//         </p>

//         {NAV_ITEMS.map(({ to, icon: Icon, label, end }) => (
//           <NavLink
//             key={to}
//             to={to}
//             end={end}
//             className={({ isActive }) =>
//               `group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
//                transition-all duration-150 border
//                ${isActive
//                  ? "bg-indigo-500/15 text-indigo-300 border-indigo-500/20"
//                  : "text-white/50 hover:text-white/90 hover:bg-white/[0.05] border-transparent"
//                }`
//             }
//           >
//             {({ isActive }) => (
//               <>
//                 <Icon
//                   size={17}
//                   className={`shrink-0 transition-colors ${
//                     isActive ? "text-indigo-400" : "text-white/40 group-hover:text-white/70"
//                   }`}
//                 />
//                 {label}
//                 {isActive && (
//                   <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400" />
//                 )}
//               </>
//             )}
//           </NavLink>
//         ))}
//       </nav>

//       <div className="px-3 py-4 border-t border-white/[0.06] space-y-0.5">
//         <button
//           onClick={() => navigate(-1)}
//           className="group flex items-center gap-3 w-full px-3 py-2.5 rounded-lg
//                      text-sm font-medium text-white/40 hover:text-white/80
//                      hover:bg-white/[0.05] border border-transparent
//                      transition-all duration-150"
//         >
//           <ArrowLeft size={17} className="shrink-0 group-hover:-translate-x-0.5 transition-transform" />
//           Go Back
//         </button>

//         <button
//           onClick={() => {
//             localStorage.removeItem("token");
//             navigate("/", { replace: true });
//           }}
//           className="group flex items-center gap-3 w-full px-3 py-2.5 rounded-lg
//                      text-sm font-medium text-red-400/70 hover:text-red-400
//                      hover:bg-red-500/10 border border-transparent hover:border-red-500/15
//                      transition-all duration-150"
//         >
//           <LogOut size={17} className="shrink-0" />
//           Logout
//         </button>
//       </div>
//     </aside>
//   );
// }