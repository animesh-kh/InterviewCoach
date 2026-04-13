import React, { useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Building2,
  Briefcase,
  ChevronRight,
  FileText,
  CheckCircle2,
  ArrowLeft,
  User,
} from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const ROLES = [
  "Machine Learning",
  "Django Developer",
  "Full Stack Developer",
  "Flutter Developer",
  "iOS Developer",
  "Java Developer",
  "JavaScript Developer",
  "DevOps Engineer",
  "Software Engineer",
  "Database Administrator",
];

export default function InterviewSetup() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const roundType = searchParams.get("type") || "General Interview";
  const initialRole = searchParams.get("role") || "Software Engineer";

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    company: "",
    experience: "entry",
    resume: null,
    role: initialRole,
  });

  const fileInputRef = useRef(null);

  const companies = [
    "Google", "Meta", "Amazon", "Apple", "Microsoft",
    "Netflix", "Stripe", "Airbnb", "Uber", "OpenAI", "Custom"
  ];

  const experienceLevels = [
    { label: "Entry (0-2 years)", value: "entry" },
    { label: "Mid (3-5 years)", value: "mid" },
    { label: "Senior (5+ years)", value: "senior" },
  ];

  const handleFileChange = (e) => {
    if (e.target.files?.[0]) {
      setFormData({ ...formData, resume: e.target.files[0] });
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files?.[0]) {
      setFormData({ ...formData, resume: e.dataTransfer.files[0] });
    }
  };

  const handleStartInterview = () => {
    navigate(
      `/dashboard/interview/session?role=${formData.role}&experience=${formData.experience}&type=${roundType}&company=${formData.company}`
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </button>

          <h1 className="text-4xl font-bold text-slate-900 mb-2">Setup Interview</h1>
          <p className="text-slate-600 text-lg">
            {formData.role} • {roundType}
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-slate-100">
          <AnimatePresence mode="wait">
            {/* Step 1 */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                {/* Role Selection */}
                <div>
                  <label className="font-semibold flex items-center gap-2 mb-3 text-slate-700">
                    <User className="w-5 h-5 text-indigo-600" />
                    Select Role
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full border border-slate-200 rounded-2xl p-4 focus:outline-none focus:border-indigo-500 text-slate-700"
                  >
                    {ROLES.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Resume Upload */}
                <div>
                  <label className="font-semibold flex items-center gap-2 mb-3 text-slate-700">
                    <FileText className="w-5 h-5 text-indigo-600" />
                    Upload Resume (Optional)
                  </label>
                  <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-300 hover:border-indigo-400 hover:bg-indigo-50/50 rounded-3xl p-12 text-center cursor-pointer transition-all"
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                    />

                    {formData.resume ? (
                      <div className="flex flex-col items-center gap-3">
                        <CheckCircle2 className="w-12 h-12 text-green-500" />
                        <p className="font-medium text-slate-800">{formData.resume.name}</p>
                        <p className="text-sm text-slate-500">Click to change file</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-3">
                        <Upload className="w-12 h-12 text-indigo-600" />
                        <p className="font-bold text-lg">Drop your resume here</p>
                        <p className="text-sm text-slate-500">PDF or DOCX supported</p>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition"
                >
                  Continue
                  <ChevronRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                {/* Company */}
                <div>
                  <label className="font-semibold flex items-center gap-2 mb-4 text-slate-700">
                    <Building2 className="w-5 h-5 text-indigo-600" />
                    Target Company
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {companies.map((c) => (
                      <button
                        key={c}
                        onClick={() => setFormData({ ...formData, company: c })}
                        className={`border rounded-2xl py-3 px-4 text-left font-medium transition-all ${
                          formData.company === c
                            ? "bg-indigo-600 text-white border-indigo-600"
                            : "hover:bg-indigo-50 border-slate-200"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <label className="font-semibold flex items-center gap-2 mb-4 text-slate-700">
                    <Briefcase className="w-5 h-5 text-indigo-600" />
                    Experience Level
                  </label>
                  <select
                    value={formData.experience}
                    onChange={(e) =>
                      setFormData({ ...formData, experience: e.target.value })
                    }
                    className="w-full border border-slate-200 rounded-2xl p-4 focus:outline-none focus:border-indigo-500 text-slate-700"
                  >
                    {experienceLevels.map((l) => (
                      <option key={l.value} value={l.value}>
                        {l.label}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleStartInterview}
                  disabled={!formData.company}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-4 rounded-2xl font-bold transition"
                >
                  Start Interview
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}