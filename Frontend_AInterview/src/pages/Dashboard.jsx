import { useState } from "react";
import ThemeToggle from "../../context/ThemeToggle";
import {
  Code2, GitMerge, Cpu, Bug,
  Network, Globe, Database, Cloud,
  Binary, FlaskConical, Layers, Braces,
  Mic, Users, Briefcase, FileText,
} from "lucide-react";

const ALL_ROUNDS = [
  {
    category: "Technical Core",
    items: [
      { icon: Code2,       title: "Coding Round",        sub: "Technical Core" },
      { icon: GitMerge,    title: "DSA Round",            sub: "Technical Core" },
      { icon: Cpu,         title: "Advanced Algorithms",  sub: "Technical Core" },
      { icon: Bug,         title: "Debugging Round",      sub: "Technical Core" },
    ],
  },
  {
    category: "System Design",
    items: [
      { icon: Network,     title: "System Architecture",  sub: "System Design" },
      { icon: Globe,       title: "API Design",           sub: "System Design" },
      { icon: Database,    title: "Database Design",      sub: "System Design" },
      { icon: Cloud,       title: "Cloud Infrastructure", sub: "System Design" },
    ],
  },
  {
    category: "Computer Science",
    items: [
      { icon: Binary,      title: "OS Concepts",          sub: "Computer Science" },
      { icon: FlaskConical,title: "Networking",           sub: "Computer Science" },
      { icon: Layers,      title: "Compiler Design",      sub: "Computer Science" },
      { icon: Braces,      title: "Theory of Computation",sub: "Computer Science" },
    ],
  },
  {
    category: "Soft Skills",
    items: [
      { icon: Mic,         title: "Communication Round",  sub: "Soft Skills" },
      { icon: Users,       title: "Team Collaboration",   sub: "Soft Skills" },
      { icon: Briefcase,   title: "Leadership Round",     sub: "Soft Skills" },
      { icon: FileText,    title: "Case Study Round",     sub: "Soft Skills" },
    ],
  },
];

const FILTERS = ["All", "Technical Core", "System Design", "Computer Science", "Soft Skills", "Specialized", "Professional"];

export default function Dashboard() {
  const [search, setSearch]           = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = ALL_ROUNDS
    .map((section) => ({
      ...section,
      items: section.items.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((section) =>
      (activeFilter === "All" || section.category === activeFilter) &&
      section.items.length > 0
    );

  return (
    <div className="pt-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Hello MSD 👋
          </h1>
          <p className="text-sm mt-1 text-slate-500 dark:text-white/40">
            Select an interview round and start practicing.
          </p>
        </div>

        <div className="flex items-center gap-4 flex-shrink-0">
          <div className="flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-white/50">
            🏆 <span>0 Completed</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-white/50">
            🔥 <span>25 Rounds</span>
          </div>
          <ThemeToggle />
        </div>
      </div>

      <div className="mb-4">
        <div className="relative w-full max-w-sm">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/30 text-sm">
            🔍
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search interview rounds..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm
                       bg-white dark:bg-white/5
                       border border-slate-200 dark:border-white/8
                       text-slate-800 dark:text-white/80
                       placeholder:text-slate-400 dark:placeholder:text-white/25
                       focus:outline-none focus:ring-2 focus:ring-indigo-500/40
                       transition-all duration-150"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap mb-8">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-150 border
              ${activeFilter === f
                ? "bg-indigo-600 text-white border-indigo-600 shadow-sm shadow-indigo-500/20"
                : "bg-white dark:bg-transparent text-slate-500 dark:text-white/40 border-slate-200 dark:border-white/10 hover:border-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300"
              }`}
          >
            {f}
          </button>
        ))}
      </div>

      {filtered.map((section) => (
        <div key={section.category} className="mb-10">
          <h2 className="text-base font-semibold mb-4 text-slate-800 dark:text-white/80">
            {section.category}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {section.items.map(({ icon: Icon, title, sub }) => (
              <div
                key={title}
                className="flex flex-col gap-4 p-5 rounded-2xl
                           bg-white dark:bg-white/4
                           border border-slate-200 dark:border-white/7
                           hover:border-indigo-400/40 dark:hover:border-indigo-500/30
                           hover:shadow-md hover:shadow-indigo-500/5
                           transition-all duration-200 cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl
                               bg-indigo-50 dark:bg-indigo-500/10
                               border border-indigo-100 dark:border-indigo-500/20
                               flex items-center justify-center">
                  <Icon size={18} className="text-indigo-500 dark:text-indigo-400" />
                </div>

                <div>
                  <p className="font-semibold text-sm text-slate-800 dark:text-white/85">
                    {title}
                  </p>
                  <p className="text-xs text-slate-400 dark:text-white/30 mt-0.5">
                    {sub}
                  </p>
                </div>

                <button
                  className="mt-auto flex items-center justify-between w-full
                             px-4 py-2.5 rounded-xl text-sm font-medium
                             bg-slate-50 dark:bg-white/4
                             border border-slate-200 dark:border-white/8
                             text-slate-600 dark:text-white/50
                             hover:bg-indigo-50 dark:hover:bg-indigo-500/10
                             hover:border-indigo-300 dark:hover:border-indigo-500/30
                             hover:text-indigo-600 dark:hover:text-indigo-300
                             transition-all duration-150"
                >
                  Start Session
                  <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

    </div>
  );
}