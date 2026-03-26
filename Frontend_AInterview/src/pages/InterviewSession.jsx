import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Play, Mic, Video, MessageSquare, ArrowLeft } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

function InterviewSession() {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const duration = Number(searchParams.get("time")) || 30;
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          alert("Interview time finished!");
          navigate("/dashboard");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [navigate]);
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime =
    `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      <div className="p-6 flex justify-between items-center border-b border-slate-800">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Exit Session
        </button>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-rose-500/10 text-rose-500 rounded-full border border-rose-500/20">
            <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></div>
            Live Session
          </div>
          <div className="text-white font-mono text-lg">
            {formattedTime}
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-4xl w-full aspect-video bg-slate-800 rounded-[3rem] border border-slate-700 shadow-2xl flex flex-col items-center justify-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent pointer-events-none"></div>
          <div className="relative z-10 flex flex-col items-center gap-8">
            <div className="w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center shadow-2xl shadow-indigo-500/40">
              <Play className="w-10 h-10 fill-current ml-1" />
            </div>

            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">
                Ready to begin?
              </h2>

              <p className="text-slate-400 max-w-md mx-auto">
                The AI interviewer is ready. Make sure your microphone and camera are working correctly.
              </p>
            </div>

            <button className="bg-white text-slate-900 px-12 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-50 transition-colors">
              Initialize AI Interviewer
            </button>

          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
            <button className="w-14 h-14 rounded-2xl bg-slate-700/50 hover:bg-slate-700 flex items-center justify-center transition-all border border-slate-600">
              <Mic className="w-6 h-6" />
            </button>
            <button className="w-14 h-14 rounded-2xl bg-slate-700/50 hover:bg-slate-700 flex items-center justify-center transition-all border border-slate-600">
              <Video className="w-6 h-6" />
            </button>
            <button className="w-14 h-14 rounded-2xl bg-slate-700/50 hover:bg-slate-700 flex items-center justify-center transition-all border border-slate-600">
              <MessageSquare className="w-6 h-6" />
            </button>
          </div>
         </motion.div>
      </div>

      <div className="p-8 text-center text-slate-500 text-sm">
        Your session is private and encrypted. Feedback will be generated at the end.
      </div>
    </div>
  );
}

export default InterviewSession;