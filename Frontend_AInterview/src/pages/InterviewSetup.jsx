import React, { useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Building2,
  Briefcase,
  BarChart3,
  ChevronRight,
  FileText,
  X,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Brain,
  Play,
  Clock
} from "lucide-react";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function InterviewSetup(){
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const roundType = searchParams.get("type") || "General Interview";
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    company: "",
    experience: "Junior (0-2 years)",
    difficulty: "Intermediate",
    duration: 30,
    resume: null
  });

  const fileInputRef = useRef(null);
  const companies = [
    "Google",
    "Meta",
    "Amazon",
    "Apple",
    "Microsoft",
    "Netflix",
    "Stripe",
    "Airbnb",
    "Uber",
    "OpenAI",
    "Custom"
  ];

  const experienceLevels = [
    "Intern / Student",
    "Junior (0-2 years)",
    "Mid-level (3-5 years)",
    "Senior (5-8 years)",
    "Staff / Principal (8+ years)"
  ];

  const difficultyLevels = [
    "Easy - Conceptual & Basic",
    "Intermediate - Practical & Applied",
    "Hard - Deep Technical & Edge Cases",
    "Adaptive - Scales with your performance"
  ];

  const durationOptions = [30, 45, 60];
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, resume: e.target.files[0] });
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFormData({ ...formData, resume: e.dataTransfer.files[0] });
    }
  };

  const handleStartInterview = () => {
    navigate(`/dashboard/interview/session?time=${formData.duration}`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </button>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Configure Your Session
          </h1>
          <p className="text-slate-500 text-lg">
            Setting up your{" "}
            <span className="text-indigo-600 font-semibold">{roundType}</span>.
            Let's tailor the experience to your goals.
          </p>
        </div>

        <div className="flex items-center justify-between mb-12 relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 z-0"></div>
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={cn(
                "relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-500",
                step >= s
                  ? "bg-indigo-600 text-white scale-110"
                  : "bg-white text-slate-400 border-2 border-slate-200"
              )}
            >
              {step > s ? <CheckCircle2 className="w-6 h-6" /> : s}
            </div>
          ))}
        </div>
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-slate-200/60 border border-slate-100">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <label className="flex items-center gap-2 text-sm font-bold text-slate-900 uppercase tracking-wider">
                  <FileText className="w-4 h-4 text-indigo-600" />
                  Upload Resume (Optional)
                </label>
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed rounded-3xl p-12 text-center cursor-pointer border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/30"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {formData.resume ? (
                    <div className="flex flex-col items-center gap-3">
                      <CheckCircle2 className="w-8 h-8 text-green-500" />
                      <p className="font-bold">{formData.resume.name}</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-4">
                      <Upload className="w-10 h-10 text-indigo-600" />
                      <p className="font-bold">Drop your resume here</p>
                      <p className="text-sm text-slate-500">PDF / DOCX</p>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2"
                >
                  Continue
                  <ChevronRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <label className="font-bold flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-indigo-600" />
                  Target Company
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {companies.map((c) => (
                    <button
                      key={c}
                      onClick={() => setFormData({ ...formData, company: c })}
                      className={`border rounded-xl py-2 transition-all
                      ${
                        formData.company === c
                          ? "bg-indigo-600 text-white border-indigo-600"
                          : "hover:bg-indigo-50"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
                <div>
                  <label className="font-bold flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-indigo-600" />
                    Experience
                  </label>
                  <select
                    value={formData.experience}
                    onChange={(e) =>
                      setFormData({ ...formData, experience: e.target.value })
                    }
                    className="w-full border p-3 rounded-xl"
                  >
                    {experienceLevels.map((l) => (
                      <option key={l}>{l}</option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={() => setStep(3)}
                  className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold"
                >
                  Continue
                </button>
              </motion.div>
             )}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <label className="font-bold flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-indigo-600" />
                  Difficulty
                </label>
                {difficultyLevels.map((d) => (
                  <button
                    key={d}
                    onClick={() => setFormData({ ...formData, difficulty: d })}
                    className={`w-full border rounded-xl p-4 text-left transition-all
                    ${
                      formData.difficulty === d
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "hover:bg-indigo-50"
                    }`}
                  >
                    {d}
                  </button>
                ))}

                <label className="font-bold flex items-center gap-2 mt-6">
                  <Clock className="w-4 h-4 text-indigo-600" />
                  Interview Duration
                </label>

                <div className="grid grid-cols-3 gap-3">
                  {durationOptions.map((t) => (
                    <button
                      key={t}
                      onClick={() => setFormData({ ...formData, duration: t })}
                      className={`border rounded-xl py-3 font-semibold transition-all
                      ${
                        formData.duration === t
                          ? "bg-indigo-600 text-white border-indigo-600"
                          : "hover:bg-indigo-50"
                      }`}
                    >
                      {t} min
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleStartInterview}
                  className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2"
                >
                  Start Interview
                  <Play className="w-5 h-5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="mt-8 text-center text-sm text-slate-400">
          Powered by Gemini 3.1 Pro • Industry Standard Mock Environment
        </div>
      </div>
    </div>
  );
}