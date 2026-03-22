import React, { useEffect, useState, useMemo, useRef } from "react";
import { useInterview } from "../context/InterviewContext";
import { getCurrentUser } from "../utils/api";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../context/ThemeToggle";
import "../styles/overview.css";

import {
  Code2, Cpu, Users, Brain, Play, Binary, Network, Layout,
  Database, BrainCircuit, Settings, FolderGit2, Briefcase,
  Star, UserCog, Search, Trophy, Flame, ArrowRight, CheckCircle2, X
} from "lucide-react";

const CATEGORIES = [
  {
    label: "Technical Core",
    accent: "#6366f1",
    rounds: [
      { title: "Coding Round",         icon: Code2      },
      { title: "DSA Round",            icon: Binary     },
      { title: "Advanced Algorithms",  icon: Cpu        },
      { title: "Debugging Round",      icon: Cpu        },
      { title: "Code Optimization",    icon: Cpu        },
    ],
  },
  {
    label: "System Design",
    accent: "#22d3ee",
    rounds: [
      { title: "System Design",        icon: Network    },
      { title: "Low Level Design",     icon: Layout     },
      { title: "Architecture Design",  icon: Network    },
      { title: "Distributed Systems",  icon: Network    },
    ],
  },
  {
    label: "Computer Science",
    accent: "#fb923c",
    rounds: [
      { title: "Operating Systems",    icon: Cpu        },
      { title: "DBMS Round",           icon: Database   },
      { title: "Computer Networks",    icon: Network    },
      { title: "OOP Concepts",         icon: Layout     },
    ],
  },
  {
    label: "Specialized",
    accent: "#ec4899",
    rounds: [
      { title: "Frontend Round",       icon: Layout       },
      { title: "Backend Round",        icon: Database     },
      { title: "Machine Learning",     icon: BrainCircuit },
      { title: "DevOps / SRE",         icon: Settings     },
    ],
  },
  {
    label: "Soft Skills",
    accent: "#22c55e",
    rounds: [
      { title: "HR Round",             icon: Users      },
      { title: "Behavioral Round",     icon: Brain      },
      { title: "Leadership Round",     icon: Briefcase  },
      { title: "Hiring Manager",       icon: UserCog    },
    ],
  },
  {
    label: "Professional",
    accent: "#a855f7",
    rounds: [
      { title: "Bar Raiser",           icon: Star       },
      { title: "Project Deep Dive",    icon: FolderGit2 },
      { title: "Product Design",       icon: Layout     },
      { title: "Scalability Round",    icon: Network    },
    ],
  },
];

const ALL_ROUNDS = CATEGORIES.flatMap(c =>
  c.rounds.map(r => ({ ...r, type: c.label, accent: c.accent }))
);

function RoundCard({ round, selected, setSelected, start }) {
  const Icon = round.icon;
  const isSelected = selected === round.title;

  return (
    <div
      className={`ov-card ${isSelected ? "selected" : ""}`}
      style={{ "--accent": round.accent }}
      onClick={() => setSelected(round.title)}
    >
      {isSelected && (
        <div className="check">
          <CheckCircle2 size={16} />
        </div>
      )}

      <div className="icon" style={{ background: `${round.accent}20` }}>
        <Icon size={18} style={{ color: round.accent }} />
      </div>

      <div className="title">{round.title}</div>
      <div className="type">{round.type}</div>

      <button
        className="start"
        onClick={e => { e.stopPropagation(); start(round.title); }}
      >
        Start Session <ArrowRight size={14} />
      </button>
    </div>
  );
}

export default function Overview() {
  const { interviews } = useInterview();
  const navigate       = useNavigate();

  const [userName, setUserName] = useState("User");
  const [search,   setSearch]   = useState("");
  const [tab,      setTab]      = useState("All");
  const [selected, setSelected] = useState(null);

  const scrollRefs = useRef({});

  useEffect(() => {
    getCurrentUser()
      .then(u => { if (u?.full_name) setUserName(u.full_name); })
      .catch(console.error);
  }, []);

  const completed = interviews.filter(i => i.status === "completed").length;

  const startInterview = round => {
    navigate(`/dashboard/interview/setup?type=${encodeURIComponent(round)}`);
  };

  const tabs = ["All", ...CATEGORIES.map(c => c.label)];

  const filteredRounds = useMemo(() => {
    const q = search.toLowerCase();
    return ALL_ROUNDS.filter(
      r =>
        (!q || r.title.toLowerCase().includes(q) || r.type.toLowerCase().includes(q)) &&
        (tab === "All" || r.type === tab)
    );
  }, [search, tab]);

  const grouped =
    tab === "All"
      ? CATEGORIES.map(cat => ({
          ...cat,
          rounds: filteredRounds.filter(r => r.type === cat.label),
        })).filter(g => g.rounds.length > 0)
      : [{ ...CATEGORIES.find(c => c.label === tab), rounds: filteredRounds }];

  return (
    <div className="ov">

      <div className="hero">
        <div>
          <h1>Hello {userName.split(" ")[0]} 👋</h1>
          <p>Select an interview round and start practicing.</p>
        </div>

        <div className="hero-right">
          <div className="stats">
            <div><Trophy size={16} /> {completed} Completed</div>
            <div><Flame  size={16} /> {ALL_ROUNDS.length} Rounds</div>
          </div>
          <ThemeToggle />
        </div>
      </div>

      <div className="controls">
        <div className="search">
          <Search size={16} />
          <input
            placeholder="Search interview rounds..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="tabs">
          {tabs.map(t => (
            <button
              key={t}
              className={tab === t ? "active" : ""}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {filteredRounds.length === 0 && search ? (
        <div className="no-results">
          <p>No results for "<strong>{search}</strong>"</p>
        </div>
      ) : (
        grouped.map(cat => (
          <div key={cat.label}>
            <h3 className="section">{cat.label}</h3>

            <div className="row-wrapper">
              <button
                className="scroll-btn left"
                onClick={() =>
                  scrollRefs.current[cat.label].scrollBy({ left: -400, behavior: "smooth" })
                }
              >◀</button>

              <div
                ref={el => (scrollRefs.current[cat.label] = el)}
                className="scroll-container"
              >
                {cat.rounds.map(round => (
                  <RoundCard
                    key={round.title}
                    round={round}
                    selected={selected}
                    setSelected={setSelected}
                    start={startInterview}
                  />
                ))}
              </div>

              <button
                className="scroll-btn right"
                onClick={() =>
                  scrollRefs.current[cat.label].scrollBy({ left: 400, behavior: "smooth" })
                }
              >▶</button>
            </div>
          </div>
        ))
      )}

      {selected && (
        <div className="launcher">
          <div className="launcher-left">
            <span className="dot" />
            <span className="text">{selected}</span>
          </div>
          <div className="launcher-actions">
            <button className="launch-btn" onClick={() => startInterview(selected)}>
              <Play size={14} /> Start Session
            </button>
            <button className="close-btn" onClick={() => setSelected(null)}>
              <X size={16} />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}