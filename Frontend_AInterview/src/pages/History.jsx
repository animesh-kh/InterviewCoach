import { useInterview } from "../context/InterviewContext";
import { useUser } from "@clerk/clerk-react";
import {
  CheckCircle2,
  TrendingUp,
  Clock,
  Award,
} from "lucide-react";

/* ================= STAT CARD COMPONENT ================= */

function StatCard({ title, value, icon: Icon, color }) {
  return (
    <div className="bg-white p-6 rounded-2xl border shadow-sm flex items-center gap-4">
      <div className={`p-3 rounded-xl text-white ${color}`}>
        <Icon className="w-6 h-6" />
      </div>

      <div>
        <p className="text-sm text-slate-500">{title}</p>
        <h3 className="text-xl font-bold">{value}</h3>
      </div>
    </div>
  );
}

/* ================= HISTORY PAGE ================= */

export default function History() {
  const { user } = useUser();
  const { interviews } = useInterview();

  const completed = interviews
    .filter((i) => i.status === "completed")
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  /* ================= STATS CALCULATION ================= */

  const totalCompleted = completed.length;

  const averageScore =
    totalCompleted > 0
      ? Math.round(
          completed.reduce((acc, curr) => acc + curr.score, 0) /
            totalCompleted
        )
      : 0;

  const totalHours =
    totalCompleted > 0
      ? (
          completed.reduce((acc, curr) => acc + curr.duration, 0) /
          60
        ).toFixed(1)
      : 0;

  const improvementRate =
    totalCompleted >= 2
      ? completed[0].score - completed[totalCompleted - 1].score
      : 0;

  /* ================= EMPTY STATE ================= */

  if (totalCompleted === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-2">
          No Interviews Yet
        </h2>
        <p className="text-slate-500">
          Start your first mock interview to see history here.
        </p>
      </div>
    );
  }

  /* ================= MAIN UI ================= */

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">
        Interview History
      </h1>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Interviews Completed"
          value={totalCompleted}
          icon={CheckCircle2}
          color="bg-indigo-500"
        />

        <StatCard
          title="Avg. Performance"
          value={`${averageScore}%`}
          icon={TrendingUp}
          color="bg-emerald-500"
        />

        <StatCard
          title="Hours Practiced"
          value={`${totalHours}h`}
          icon={Clock}
          color="bg-amber-500"
        />

        <StatCard
          title="Improvement Rate"
          value={`${improvementRate > 0 ? "+" : ""}${improvementRate}%`}
          icon={Award}
          color="bg-rose-500"
        />
      </div>

      {/* ================= INTERVIEW LIST ================= */}
      <div className="space-y-6">
        {completed.map((interview) => (
          <div
            key={interview.id}
            className="bg-white p-6 rounded-2xl border shadow-sm"
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="font-bold text-lg">
                  {interview.roundType}
                </h3>
                <p className="text-sm text-slate-500">
                  {new Date(interview.date).toLocaleDateString()}
                </p>
              </div>

              <span className="flex items-center gap-2 text-emerald-600 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                Completed
              </span>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-slate-500">Score</p>
                <h4 className="text-xl font-bold">
                  {interview.score}%
                </h4>
              </div>

              <div>
                <p className="text-sm text-slate-500">Duration</p>
                <h4 className="text-xl font-bold">
                  {interview.duration} mins
                </h4>
              </div>

              <div>
                <p className="text-sm text-slate-500">Feedback</p>
                <h4 className="text-sm">
                  {interview.feedback}
                </h4>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}