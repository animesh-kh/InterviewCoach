import React, { useEffect, useState } from "react";
import { useInterview } from "../context/InterviewContext";
import { getCurrentUser } from "../utils/api";

import {
  Code2,
  Cpu,
  Users,
  Brain,
  Play,
  Binary,
  Network,
  Layout,
  Database,
  BrainCircuit,
  Settings,
  FolderGit2,
  Briefcase,
  Star,
  UserCog
} from "lucide-react";

export default function Overview() {

  const { interviews } = useInterview();
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await getCurrentUser();
        if (user?.full_name) {
          setUserName(user.full_name);
        }
      } catch (err) {
        console.error(err);
      }
    };

    loadUser();
  }, []);

  const completed = interviews.filter((i) => i.status === "completed");
  const totalCompleted = completed.length;

  const roundTypes = [
    { title: "Coding Round", icon: Code2, bg: "bg-blue-100", text: "text-blue-600" },
    { title: "Technical Round", icon: Cpu, bg: "bg-purple-100", text: "text-purple-600" },
    { title: "HR Round", icon: Users, bg: "bg-emerald-100", text: "text-emerald-600" },
    { title: "Behavioral Round", icon: Brain, bg: "bg-rose-100", text: "text-rose-600" },
    { title: "DSA Round", icon: Binary, bg: "bg-cyan-100", text: "text-cyan-700" },
    { title: "System Design", icon: Network, bg: "bg-indigo-100", text: "text-indigo-700" },
    { title: "Frontend Round", icon: Layout, bg: "bg-pink-100", text: "text-pink-700" },
    { title: "Backend Round", icon: Database, bg: "bg-amber-100", text: "text-amber-700" },
    { title: "Machine Learning", icon: BrainCircuit, bg: "bg-violet-100", text: "text-violet-700" },
    { title: "DevOps / SRE", icon: Settings, bg: "bg-teal-100", text: "text-teal-700" },
    { title: "Project Deep Dive", icon: FolderGit2, bg: "bg-orange-100", text: "text-orange-700" },
    { title: "Leadership Round", icon: Briefcase, bg: "bg-lime-100", text: "text-lime-700" },
    { title: "Bar Raiser", icon: Star, bg: "bg-yellow-100", text: "text-yellow-700" },
    { title: "Hiring Manager", icon: UserCog, bg: "bg-gray-100", text: "text-gray-700" }
  ];

  return (
    <div className="space-y-12">

      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-3xl font-bold">
            Welcome back, {userName} 👋
          </h1>

          <p className="text-slate-500 mt-2">
            You've completed {totalCompleted} mock interviews.
          </p>
        </div>

        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300">
          <Play className="w-4 h-4 fill-current" />
          Start New Mock
        </button>

      </div>

      <div>

        <h2 className="text-xl font-bold mb-6">
          Select Interview Round
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {roundTypes.map((round, index) => (

            <div
              key={index}
              className="group bg-white p-6 rounded-2xl border shadow-sm 
              hover:shadow-[0_15px_35px_rgba(99,102,241,0.25)]
              hover:-translate-y-2
              transition-all duration-300 ease-in-out
              cursor-pointer"
            >

              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4
                ${round.bg}
                group-hover:bg-indigo-600
                transition-colors duration-300`}
              >

                <round.icon
                  className={`w-6 h-6 ${round.text}
                  group-hover:text-white
                  transition-colors duration-300`}
                />

              </div>

              <h3 className="font-semibold mb-4
              group-hover:text-indigo-600
              transition-colors duration-300">

                {round.title}

              </h3>

              <button
                className="w-full bg-slate-100
                group-hover:bg-indigo-600
                group-hover:text-white
                text-sm py-2 rounded-lg
                flex items-center justify-center gap-2
                transition-all duration-300
                hover:scale-105 hover:shadow-lg"
              >

                <Play className="w-3 h-3 fill-current" />
                Start Session

              </button>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}












// import React from "react";
// import { useInterview } from "../context/InterviewContext";
// import { useUser } from "@clerk/clerk-react";
// import StatCard from "../components/dashboard/StatCard";

// import {
//   Code2,
//   Cpu,
//   Users,
//   Brain,
//   Play,
//   CheckCircle2,
//   TrendingUp,
//   Clock,
//   Award,
//   Binary,
//   Network,
//   Layout,
//   Database,
//   BrainCircuit,
//   Settings,
//   FolderGit2,
//   Briefcase,
//   Star,
//   UserCog
// } from "lucide-react";

// export default function Overview() {
//   const { user } = useUser();
//   const { interviews } = useInterview();

//   const completed = interviews.filter(
//     (i) => i.status === "completed"
//   );


//   const totalCompleted = completed.length;

//   const averageScore =
//     totalCompleted > 0
//       ? Math.round(
//           completed.reduce((sum, i) => sum + i.score, 0) /
//             totalCompleted
//         )
//       : 0;

//   const totalMinutes = completed.reduce(
//     (sum, i) => sum + (i.duration || 0),
//     0
//   );

//   const totalHours = (totalMinutes / 60).toFixed(1);

//   const improvementRate =
//     totalCompleted > 1
//       ? completed[totalCompleted - 1].score -
//         completed[0].score
//       : 0;


//   const roundTypes = [
//     { title: "Coding Round", icon: Code2, bg: "bg-blue-100", text: "text-blue-600" },
//     { title: "Technical Round", icon: Cpu, bg: "bg-purple-100", text: "text-purple-600" },
//     { title: "HR Round", icon: Users, bg: "bg-emerald-100", text: "text-emerald-600" },
//     { title: "Behavioral Round", icon: Brain, bg: "bg-rose-100", text: "text-rose-600" },
//     { title: "DSA Round", icon: Binary, bg: "bg-cyan-100", text: "text-cyan-700" },
//     { title: "System Design", icon: Network, bg: "bg-indigo-100", text: "text-indigo-700" },
//     { title: "Frontend Round", icon: Layout, bg: "bg-pink-100", text: "text-pink-700" },
//     { title: "Backend Round", icon: Database, bg: "bg-amber-100", text: "text-amber-700" },
//     { title: "Machine Learning", icon: BrainCircuit, bg: "bg-violet-100", text: "text-violet-700" },
//     { title: "DevOps / SRE", icon: Settings, bg: "bg-teal-100", text: "text-teal-700" },
//     { title: "Project Deep Dive", icon: FolderGit2, bg: "bg-orange-100", text: "text-orange-700" },
//     { title: "Leadership Round", icon: Briefcase, bg: "bg-lime-100", text: "text-lime-700" },
//     { title: "Bar Raiser", icon: Star, bg: "bg-yellow-100", text: "text-yellow-700" },
//     { title: "Hiring Manager", icon: UserCog, bg: "bg-gray-100", text: "text-gray-700" }
//   ];

//   return (
//     <div className="space-y-12">

//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold">
//             Welcome back, {user?.firstName || "User"} 👋
//           </h1>
//           <p className="text-slate-500 mt-2">
//             You've completed {totalCompleted} mock interviews.
//           </p>
//         </div>

//         <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300">
//           <Play className="w-4 h-4 fill-current" />
//           Start New Mock
//         </button>
//       </div>

//       <div>
//         <h2 className="text-xl font-bold mb-6">
//           Select Interview Round
//         </h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {roundTypes.map((round, index) => (
//             <div
//               key={index}
//               className="group bg-white p-6 rounded-2xl border shadow-sm 
//                          hover:shadow-[0_15px_35px_rgba(99,102,241,0.25)] 
//                          hover:-translate-y-2 
//                          transition-all duration-300 ease-in-out 
//                          cursor-pointer"
//             >
//               {/* ICON */}
//               <div
//                 className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 
//                             ${round.bg} 
//                             group-hover:bg-indigo-600 
//                             transition-colors duration-300`}
//               >
//                 <round.icon
//                   className={`w-6 h-6 ${round.text} 
//                               group-hover:text-white 
//                               transition-colors duration-300`}
//                 />
//               </div>

//               {/* TITLE */}
//               <h3 className="font-semibold mb-4 
//                              group-hover:text-indigo-600 
//                              transition-colors duration-300">
//                 {round.title}
//               </h3>

//               {/* BUTTON */}
//               <button
//                 className="w-full bg-slate-100 
//                            group-hover:bg-indigo-600 
//                            group-hover:text-white 
//                            text-sm py-2 rounded-lg 
//                            flex items-center justify-center gap-2 
//                            transition-all duration-300 
//                            hover:scale-105 hover:shadow-lg"
//               >
//                 <Play className="w-3 h-3 fill-current" />
//                 Start Session
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>     
//     </div>
//   );
// }