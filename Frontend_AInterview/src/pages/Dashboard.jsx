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

// const mockInterviews = [
//   {
//     id: 1,
//     score: 85,
//     date: "Mon"
//   },
//   {
//     id: 2,
//     score: 78,
//     date: "Tue"
//   },
//   {
//     id: 3,
//     score: 92,
//     date: "Wed"
//   }
// ];

export default function Dashboard() {
  const { user } = useUser();


  const interviews = mockInterviews;

  const totalInterviews = interviews.length;
  const averageScore =
    totalInterviews > 0
      ? Math.round(
          interviews.reduce((acc, curr) => acc + curr.score, 0) /
            totalInterviews
        )
      : 0;

  
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

 
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold">
          Welcome back, {user?.firstName} 👋
        </h1>
        <p className="text-slate-500">
          Here's your performance overview.
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