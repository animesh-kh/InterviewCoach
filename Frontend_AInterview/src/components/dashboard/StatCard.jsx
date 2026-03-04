import React from "react";

export default function StatCard({ title, value, icon: Icon, color }) {
  return (
    <div className="bg-white p-6 rounded-2xl border shadow-sm hover:shadow-lg transition">
      <div
        className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center mb-4`}
      >
        <Icon className="text-white w-5 h-5" />
      </div>

      <p className="text-sm text-slate-500">{title}</p>
      <h3 className="text-2xl font-bold mt-1">{value}</h3>
    </div>
  );
}