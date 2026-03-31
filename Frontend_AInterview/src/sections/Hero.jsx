import { motion } from 'motion/react';
import { useNavigate } from "react-router-dom";
import { 
  Zap,
  ArrowRight,
  Play,
  CheckCircle2,
  Star 
} from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();
  const handleStartTrial = () => {
    const token = localStorage.getItem("token");
    if (token) navigate("/dashboard");
    else navigate("/signin");
  };

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100/50 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-100/50 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-6">
              <Zap className="w-3 h-3 fill-current" />
              <span>Next-Gen Interview Prep</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-display font-bold leading-[1.1] mb-8">
              Master your <span className="text-gradient">Interviews</span> with AI.
            </h1>

            <p className="text-xl text-slate-600 leading-relaxed mb-10 max-w-lg">
              Practice with our advanced AI coach, get real-time feedback on your answers, and land your dream job with confidence.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={handleStartTrial}
                className="w-full sm:w-auto bg-indigo-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 active:scale-95 flex items-center justify-center gap-2"
              >
                Start Free Trial <ArrowRight className="w-5 h-5" />
              </button>

              <button className="w-full sm:w-auto bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-50 transition-all active:scale-95 flex items-center justify-center gap-2">
                <Play className="w-5 h-5 fill-slate-900" /> Watch Demo
              </button>

            </div>

            <div className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <img 
                    key={i}
                    src={`https://picsum.photos/seed/user${i}/100/100`} 
                    className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                    alt="User"
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>

              <div className="text-sm text-slate-500">
                <span className="font-bold text-slate-900">10,000+</span> candidates already hired
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
              {/* <img 
                src="https://picsum.photos/seed/interview/1200/800" 
                alt="AI Interview Dashboard" 
                className="w-full h-auto"
                referrerPolicy="no-referrer"
              /> */}
               <img
                  src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=1400"
                  alt="Interview Setup"
                  className="w-full h-auto"
               />

              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute top-10 -left-4 glass p-5 rounded-2xl shadow-xl max-w-[200px]"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  </div>
                  <span className="font-bold text-sm">Feedback</span>
                </div>
                <p className="text-xs text-slate-500">
                  "Your answer on conflict resolution was excellent. Try adding a specific metric."
                </p>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-10 -right-4 glass p-5 rounded-2xl shadow-xl"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map(i => (
                      <Star key={i} className="w-3 h-3 text-amber-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-bold">98% Match</span>
                </div>
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">
                  Technical Score
                </span>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;




// import React from "react";
// import { Play, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
// import { motion } from "framer-motion";

// export default function Hero({ onStart }) {
//   return (
//     <section className="relative pt-28 pb-24 overflow-hidden bg-gradient-to-b from-white via-indigo-50/40 to-white">
      
//       {/* Soft Gradient Blobs */}
//       <div className="absolute -top-24 -left-24 w-[420px] h-[420px] bg-indigo-200 rounded-full blur-3xl opacity-30" />
//       <div className="absolute -bottom-24 -right-24 w-[420px] h-[420px] bg-violet-200 rounded-full blur-3xl opacity-30" />

//       <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
//         <div className="grid lg:grid-cols-2 gap-16 items-center">

//           {/* LEFT CONTENT */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.7 }}
//           >
//             {/* Badge */}
//             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-indigo-100 shadow-sm text-indigo-600 text-xs font-semibold tracking-wide mb-7">
//               <Sparkles className="w-3.5 h-3.5" />
//               AI-Powered Interview Coach
//             </div>

//             {/* Heading */}
//             <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-7">
//               Crack Your
//               <br />
//               <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
//                 Dream Job Interviews
//               </span>
//             </h1>

//             {/* Subtitle */}
//             <p className="text-lg text-slate-600 mb-10 max-w-xl leading-relaxed">
//               Practice with an AI interviewer that simulates real companies, 
//               evaluates your answers instantly, and helps you improve with 
//               actionable feedback.
//             </p>

//             {/* CTA Buttons */}
//             <div className="flex flex-wrap items-center gap-5 mb-10">
//               <button
//                 onClick={onStart}
//                 className="group bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 hover:shadow-xl"
//               >
//                 Start Free Trial
//                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//               </button>

//               <button className="flex items-center gap-3 text-slate-700 font-semibold hover:text-indigo-600 transition-colors">
//                 <div className="bg-white border border-slate-200 p-3 rounded-full shadow-sm">
//                   <Play className="w-4 h-4 fill-slate-900" />
//                 </div>
//                 Watch Demo
//               </button>
//             </div>

//             {/* Trust Indicators */}
//             <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
//               <div className="flex items-center gap-2">
//                 <CheckCircle2 className="w-4 h-4 text-emerald-500" />
//                 No credit card required
//               </div>
//               <div className="flex items-center gap-2">
//                 <CheckCircle2 className="w-4 h-4 text-emerald-500" />
//                 5,000+ interviews simulated
//               </div>
//               <div className="flex items-center gap-2">
//                 <CheckCircle2 className="w-4 h-4 text-emerald-500" />
//                 Trusted by students & professionals
//               </div>
//             </div>
//           </motion.div>

//           {/* RIGHT IMAGE CARD */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.92 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="relative"
//           >
//             <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-2xl bg-white">
              
//               <img
//                 src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=1400"
//                 alt="Interview Setup"
//                 className="w-full h-auto"
//               />

//               {/* Floating Feedback Card */}
//               <motion.div
//                 initial={{ y: 30, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ delay: 1, duration: 0.6 }}
//                 className="absolute top-8 left-8 bg-white/80 backdrop-blur-lg border border-white/40 shadow-xl p-5 rounded-2xl max-w-[260px]"
//               >
//                 <div className="flex items-center gap-2 mb-2">
//                   <div className="bg-emerald-100 p-1.5 rounded-full">
//                     <CheckCircle2 className="w-4 h-4 text-emerald-600" />
//                   </div>
//                   <span className="text-xs font-semibold text-slate-900">
//                     AI Feedback
//                   </span>
//                 </div>
//                 <p className="text-xs text-slate-600 leading-relaxed italic">
//                   “Excellent structure. Add measurable results to make your
//                   answer stronger.”
//                 </p>
//               </motion.div>

//               {/* Floating Score Card */}
//               <motion.div
//                 initial={{ x: 30, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 transition={{ delay: 1.2, duration: 0.6 }}
//                 className="absolute bottom-8 right-8 bg-white/80 backdrop-blur-lg border border-white/40 shadow-xl p-5 rounded-2xl"
//               >
//                 <div className="flex items-center gap-1 mb-1">
//                   {[1, 2, 3, 4, 5].map((i) => (
//                     <Sparkles
//                       key={i}
//                       className="w-3.5 h-3.5 text-amber-400 fill-amber-400"
//                     />
//                   ))}
//                   <span className="text-xs font-bold text-slate-900 ml-1">
//                     98% Match
//                   </span>
//                 </div>
//                 <div className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
//                   Technical Performance
//                 </div>
//               </motion.div>
//             </div>
//           </motion.div>

//         </div>
//       </div>
//     </section>
//   );
// }
