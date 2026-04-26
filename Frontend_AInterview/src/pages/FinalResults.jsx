import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, ArrowLeft, Trophy, Target, Award } from "lucide-react";

export default function FinalResults() {
  const location = useLocation();
  const navigate = useNavigate();

  const { score, feedback } = location.state || {};

  if (!score || !feedback) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-transparent flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">No results found</h2>
        <button
          onClick={() => navigate("/dashboard")}
          className="text-indigo-600 hover:underline"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  // Parse feedback if it contains markdown or newlines. We'll just display it nicely.
  const scoreNum = Number(score);
  let performanceLevel = "Good";
  if (scoreNum >= 85) performanceLevel = "Excellent";
  else if (scoreNum <= 60) performanceLevel = "Needs Improvement";

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-transparent py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </button>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-white/5 rounded-[2rem] shadow-xl border border-slate-100 dark:border-white/10 overflow-hidden"
        >
          <div className="bg-indigo-600 p-10 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
              className="w-24 h-24 bg-white/20 rounded-full mx-auto flex items-center justify-center mb-6 backdrop-blur-sm"
            >
              <Trophy className="w-12 h-12 text-yellow-300" />
            </motion.div>
            <h1 className="text-4xl font-bold mb-2">Interview Completed!</h1>
            <p className="text-indigo-100 text-lg">Here is your comprehensive evaluation</p>
          </div>

          <div className="p-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-slate-50 dark:bg-white/5 rounded-2xl p-6 border border-slate-100 dark:border-white/10 flex flex-col items-center justify-center text-center">
                 <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-500/15 rounded-full flex items-center justify-center text-indigo-600 mb-3">
                    <Target className="w-6 h-6" />
                 </div>
                 <h3 className="text-slate-500 dark:text-slate-400 font-medium mb-1">Overall Score</h3>
                 <div className="text-4xl font-bold text-slate-800 dark:text-white">{scoreNum}/100</div>
              </div>
              
              <div className="bg-slate-50 dark:bg-white/5 rounded-2xl p-6 border border-slate-100 dark:border-white/10 flex flex-col items-center justify-center text-center">
                 <div className="w-12 h-12 bg-green-100 dark:bg-green-500/15 rounded-full flex items-center justify-center text-green-600 mb-3">
                    <CheckCircle className="w-6 h-6" />
                 </div>
                 <h3 className="text-slate-500 dark:text-slate-400 font-medium mb-1">Status</h3>
                 <div className="text-2xl font-bold text-slate-800 dark:text-white">Evaluated</div>
              </div>

              <div className="bg-slate-50 dark:bg-white/5 rounded-2xl p-6 border border-slate-100 dark:border-white/10 flex flex-col items-center justify-center text-center">
                 <div className="w-12 h-12 bg-amber-100 dark:bg-amber-500/15 rounded-full flex items-center justify-center text-amber-600 mb-3">
                    <Award className="w-6 h-6" />
                 </div>
                 <h3 className="text-slate-500 dark:text-slate-400 font-medium mb-1">Performance</h3>
                 <div className="text-2xl font-bold text-slate-800 dark:text-white">{performanceLevel}</div>
              </div>
            </div>

            <div className="space-y-6">
               <h2 className="text-2xl font-bold text-slate-800 dark:text-white">AI Feedback</h2>
               <div className="prose prose-indigo max-w-none text-slate-600 bg-indigo-50/50 p-8 rounded-2xl border border-indigo-100 leading-relaxed whitespace-pre-wrap">
                 {feedback}
               </div>
            </div>

            <div className="mt-12 flex justify-center">
               <button
                 onClick={() => navigate("/dashboard")}
                 className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
               >
                 Go to Dashboard
               </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
