import React from "react";
import { useUser } from "@clerk/clerk-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

import {
  Play,
  TrendingUp,
  CheckCircle2,
  Award
} from "lucide-react";

import { motion } from "motion/react";

/* =========================
   Simulated User Data
   (Later replace with API)
========================= */

const mockInterviews = [
  {
    id: 1,
    score: 85,
    date: "Mon"
  },
  {
    id: 2,
    score: 78,
    date: "Tue"
  },
  {
    id: 3,
    score: 92,
    date: "Wed"
  }
];

export default function Dashboard() {
  const { user } = useUser();

  // Change this to [] to simulate new user
  const interviews = mockInterviews;

  const totalInterviews = interviews.length;
  const averageScore =
    totalInterviews > 0
      ? Math.round(
          interviews.reduce((acc, curr) => acc + curr.score, 0) /
            totalInterviews
        )
      : 0;

  /* ========================
     CASE 1: NO INTERVIEWS
  ======================== */

  if (totalInterviews === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold mb-4">
          Welcome, {user?.firstName || "User"} 👋
        </h1>

        <p className="text-slate-500 mb-8">
          You haven't attempted any mock interviews yet.
        </p>

        <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 mx-auto">
          <Play className="w-4 h-4 fill-current" />
          Start Your First Interview
        </button>
      </div>
    );
  }

  /* ========================
     CASE 2: HAS INTERVIEWS
  ======================== */

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold">
          Welcome back, {user?.firstName} 👋
        </h1>
        <p className="text-slate-500">
          Here’s your performance overview.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Interviews Attempted"
          value={totalInterviews}
          icon={CheckCircle2}
        />

        <StatCard
          title="Average Score"
          value={`${averageScore}%`}
          icon={TrendingUp}
        />

        <StatCard
          title="Performance Level"
          value={
            averageScore >= 85
              ? "Excellent"
              : averageScore >= 70
              ? "Good"
              : "Needs Improvement"
          }
          icon={Award}
        />
      </div>

      {/* Graph */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border">
        <h2 className="font-bold mb-6">Performance Trend</h2>

        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={interviews}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="score"
                stroke="#4f46e5"
                fill="#4f46e5"
                fillOpacity={0.2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

/* ========================
   Reusable StatCard
======================== */

function StatCard({ title, value, icon: Icon }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-2xl border shadow-sm"
    >
      <Icon className="w-6 h-6 mb-3 text-indigo-600" />
      <p className="text-sm text-slate-500">{title}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
    </motion.div>
  );
}










// import React from "react";
// import { useUser, UserButton } from "@clerk/clerk-react";
// import {
//   ResponsiveContainer,
//   AreaChart,
//   Area,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip
// } from "recharts";

// import {
//   LayoutDashboard,
//   MessageSquare,
//   History,
//   Settings,
//   TrendingUp,
//   Clock,
//   Award,
//   ChevronRight,
//   Play,
//   CheckCircle2,
//   AlertCircle,
//   MoreVertical,
//   Search,
//   Bell
// } from "lucide-react";

// import { motion } from "motion/react";
// import { cn } from "../utils/cn";

// const performanceData = [
//   { name: "Mon", score: 65 },
//   { name: "Tue", score: 72 },
//   { name: "Wed", score: 68 },
//   { name: "Thu", score: 85 },
//   { name: "Fri", score: 78 },
//   { name: "Sat", score: 92 },
//   { name: "Sun", score: 88 }
// ];

// const StatCard = ({ title, value, icon: Icon, trend, color }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 20 }}
//     animate={{ opacity: 1, y: 0 }}
//     className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
//   >
//     <div className="flex justify-between items-start mb-4">
//       <div className={cn("p-2 rounded-xl", color)}>
//         <Icon className="w-6 h-6 text-white" />
//       </div>

//       {trend !== undefined && (
//         <span
//           className={cn(
//             "text-xs font-medium px-2 py-1 rounded-full",
//             trend > 0
//               ? "bg-emerald-50 text-emerald-600"
//               : "bg-rose-50 text-rose-600"
//           )}
//         >
//           {trend > 0 ? "+" : ""}
//           {trend}%
//         </span>
//       )}
//     </div>

//     <p className="text-sm font-medium text-slate-500">{title}</p>
//     <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
//   </motion.div>
// );

// export default function Dashboard() {
//   const { user } = useUser();

//   return (
//     <div className="min-h-screen flex bg-slate-50">
//       {/* Sidebar */}
//       <aside className="w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col">
//         <div className="p-6">
//           <div className="flex items-center gap-2 mb-8">
//             <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
//               <Award className="text-white w-5 h-5" />
//             </div>
//             <span className="font-bold text-xl tracking-tight">
//               InterviewMind
//             </span>
//           </div>

//           <nav className="space-y-1">
//             <a className="flex items-center gap-3 px-3 py-2 text-indigo-600 bg-indigo-50 rounded-lg font-medium">
//               <LayoutDashboard className="w-5 h-5" />
//               Dashboard
//             </a>
//           </nav>
//         </div>

//         <div className="mt-auto p-6 border-t border-slate-200">
//           <a className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">
//             <Settings className="w-5 h-5" />
//             Settings
//           </a>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 overflow-y-auto">
//         {/* Header */}
//         <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
//           <h2 className="text-lg font-semibold text-slate-900">
//             Welcome back, {user?.firstName || "User"} 👋
//           </h2>

//           <UserButton afterSignOutUrl="/" />
//         </header>

//         <div className="p-8 max-w-7xl mx-auto">
//           {/* Stats */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//             <StatCard
//               title="Interviews Completed"
//               value="42"
//               icon={CheckCircle2}
//               trend={12}
//               color="bg-indigo-500"
//             />

//             <StatCard
//               title="Avg. Performance"
//               value="84%"
//               icon={TrendingUp}
//               trend={5}
//               color="bg-emerald-500"
//             />

//             <StatCard
//               title="Hours Practiced"
//               value="28.5h"
//               icon={Clock}
//               trend={-2}
//               color="bg-amber-500"
//             />

//             <StatCard
//               title="Improvement Rate"
//               value="+15%"
//               icon={Award}
//               trend={8}
//               color="bg-rose-500"
//             />
//           </div>

//           {/* Chart */}
//           <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
//             <h3 className="font-bold text-lg text-slate-900 mb-6">
//               Performance Trend
//             </h3>

//             <div className="h-[300px] w-full">
//               <ResponsiveContainer width="100%" height="100%">
//                 <AreaChart data={performanceData}>
//                   <CartesianGrid strokeDasharray="3 3" vertical={false} />
//                   <XAxis dataKey="name" />
//                   <YAxis />
//                   <Tooltip />
//                   <Area
//                     type="monotone"
//                     dataKey="score"
//                     stroke="#4f46e5"
//                     fill="#4f46e5"
//                     fillOpacity={0.1}
//                   />
//                 </AreaChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }