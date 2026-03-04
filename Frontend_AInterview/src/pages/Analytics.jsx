import { useInterview } from "../context/InterviewContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function Analytics() {
  const { interviews } = useInterview();

  const completed = interviews
    .filter((i) => i.status === "completed")
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  if (completed.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-2">
          No Analytics Yet
        </h2>
        <p className="text-slate-500">
          Complete interviews to see performance analytics.
        </p>
      </div>
    );
  }

  const total = completed.length;

  const avgScore = Math.round(
    completed.reduce((sum, i) => sum + i.score, 0) / total
  );

  const highestScore = Math.max(
    ...completed.map((i) => i.score)
  );

  const chartData = completed.map((i, index) => ({
    name: `#${index + 1}`,
    score: i.score
  }));

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold">
        Performance Analytics
      </h1>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <StatCard title="Total Interviews" value={total} />
        <StatCard title="Average Score" value={`${avgScore}%`} />
        <StatCard title="Highest Score" value={`${highestScore}%`} />
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-2xl border shadow-sm h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#6366f1"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-2xl border shadow-sm">
      <p className="text-sm text-slate-500">{title}</p>
      <h3 className="text-2xl font-bold mt-2">{value}</h3>
    </div>
  );
}