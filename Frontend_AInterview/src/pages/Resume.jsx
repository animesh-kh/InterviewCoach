import { useState } from "react";
import { UploadCloud, Award, AlertTriangle, Lightbulb, CheckCircle, XCircle, MessageSquare } from "lucide-react";
import { uploadResume } from "../utils/api";

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

const EXPERIENCES = ["entry", "mid", "senior"];

export default function Resume() {
  const [file, setFile] = useState(null);
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [selectedResume, setSelectedResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // Drag and Drop Handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) setFile(e.dataTransfer.files[0]);
  };

  const handleUpload = async () => {
    if (!file || !role || !experience) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const data = await uploadResume(file, role, experience);
      setSelectedResume(data);

      setFile(null);
      setRole("");
      setExperience("");
    } catch (err) {
      console.error(err);
      alert("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getAtsScore = () => {
    if (selectedResume?.ats_score) return selectedResume.ats_score;
    if (selectedResume?.ats) return selectedResume.ats;

    const mandatory = selectedResume?.mandatory_missing?.length || 0;
    const optional = selectedResume?.optional_missing?.length || 0;
    let score = 85;
    score -= mandatory * 12;
    score -= optional * 4;
    return Math.max(45, Math.min(98, Math.round(score)));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-transparent p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Resume Analyzer</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg">
            Upload your resume and get AI-powered ATS insights
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-white dark:bg-white/5 rounded-3xl shadow-sm border dark:border-white/10 p-10 mb-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-500/15 rounded-2xl flex items-center justify-center">
              <UploadCloud className="w-7 h-7 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold dark:text-white">Upload Resume</h2>
              <p className="text-slate-500 dark:text-slate-400">PDF, DOC, DOCX supported</p>
            </div>
          </div>

          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-16 text-center transition-all mb-8 ${
              dragActive ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-500/10" : "border-slate-300 dark:border-white/15 hover:border-indigo-400"
            }`}
          >
            <UploadCloud className="w-16 h-16 mx-auto text-slate-400 mb-4" />
            <p className="text-lg font-medium dark:text-white">
              Drop your resume here or{" "}
              <label className="text-indigo-600 hover:underline cursor-pointer">
                browse files
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setFile(e.target.files?.[0])}
                  className="hidden"
                />
              </label>
            </p>
            {file && <p className="mt-4 text-sm text-green-600 font-medium">Selected: {file.name}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-slate-300 dark:border-white/15 dark:bg-white/5 dark:text-white rounded-xl px-5 py-3.5 focus:outline-none focus:border-indigo-500 transition"
            >
              <option value="" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Select Target Role</option>
              {ROLES.map((r) => <option key={r} value={r} className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">{r}</option>)}
            </select>

            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full border border-slate-300 dark:border-white/15 dark:bg-white/5 dark:text-white rounded-xl px-5 py-3.5 focus:outline-none focus:border-indigo-500 transition"
            >
              <option value="" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Select Experience Level</option>
              {EXPERIENCES.map((e) => (
                <option key={e} value={e} className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">
                  {e.charAt(0).toUpperCase() + e.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleUpload}
            disabled={!file || !role || !experience || loading}
            className="mt-10 w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-4 rounded-2xl font-semibold text-lg hover:from-indigo-700 hover:to-violet-700 disabled:opacity-50 transition-all"
          >
            {loading ? "Analyzing with AI..." : "Upload & Analyze Resume"}
          </button>
        </div>

        {/* ====================== ANALYSIS RESULT ====================== */}
        {selectedResume && (
          <div className="bg-white dark:bg-white/5 rounded-3xl shadow-sm border dark:border-white/10 p-10">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Analysis Result</h2>
                <p className="text-slate-600 dark:text-slate-400 mt-1">
                  {selectedResume.role} • {selectedResume.experience_level} Level
                </p>
              </div>

              <div className="text-right">
                <div className="text-sm text-slate-500 dark:text-slate-400">ATS Score</div>
                <div className="text-6xl font-bold text-indigo-600">
                  {getAtsScore()}<span className="text-2xl">%</span>
                </div>
              </div>
            </div>

            {/* AI Feedback Text */}
            {selectedResume.feedback_text && (
              <div className="mb-10 bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <MessageSquare className="w-6 h-6 text-indigo-600" />
                  <h3 className="text-xl font-semibold text-indigo-900">AI Detailed Feedback</h3>
                </div>
                <p className="text-slate-700 leading-relaxed text-[15.5px] whitespace-pre-line">
                  {selectedResume.feedback_text}
                </p>
              </div>
            )}

            <div className="space-y-10">
              {/* Skills Detected */}
              {selectedResume.user_skills?.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="w-6 h-6 text-emerald-600" />
                    <h3 className="text-xl font-semibold dark:text-white">Skills Detected in Your Resume</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedResume.user_skills.map((skill, i) => (
                      <span key={i} className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-2xl text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Mandatory Missing */}
              {selectedResume.mandatory_missing?.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                    <h3 className="text-xl font-semibold text-red-700">Must Add (Mandatory for ATS)</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedResume.mandatory_missing.map((skill, i) => (
                      <span key={i} className="bg-red-100 text-red-700 px-4 py-2 rounded-2xl text-sm font-medium border border-red-200">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommended */}
              {selectedResume.optional_missing?.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Lightbulb className="w-6 h-6 text-amber-600" />
                    <h3 className="text-xl font-semibold dark:text-white">Recommended to Add</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedResume.optional_missing.map((skill, i) => (
                      <span key={i} className="bg-amber-100 text-amber-700 px-4 py-2 rounded-2xl text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Skipped */}
              {selectedResume.skipped_skills?.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <XCircle className="w-6 h-6 text-slate-500" />
                    <h3 className="text-xl font-semibold text-slate-600">Skipped / Not Relevant</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedResume.skipped_skills.map((skill, i) => (
                      <span key={i} className="bg-slate-100 text-slate-600 px-4 py-2 rounded-2xl text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Raw JSON */}
            {/* <details className="mt-12 border border-slate-200 rounded-2xl p-4">
              <summary className="cursor-pointer text-slate-500 font-medium text-sm">View Full Raw JSON</summary>
              <pre className="mt-4 bg-slate-900 text-slate-100 p-6 rounded-xl text-sm overflow-auto">
                {JSON.stringify(selectedResume, null, 2)}
              </pre>
            </details> */}
          </div>
        )}
      </div>
    </div>
  );
}






// import { useEffect, useState } from "react";
// import { UploadCloud, Award, FileText } from "lucide-react";
// import { uploadResume } from "../utils/api";

// const ROLES = [
//   "Machine Learning", "Django Developer", "Full Stack Developer",
//   "Flutter Developer", "iOS Developer", "Java Developer",
//   "JavaScript Developer", "DevOps Engineer", "Software Engineer",
//   "Database Administrator"
// ];

// const EXPERIENCES = ["entry", "mid", "senior"];

// export default function Resume() {
//   const [file, setFile] = useState(null);
//   const [role, setRole] = useState("");
//   const [experience, setExperience] = useState("");
//   const [selectedResume, setSelectedResume] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [dragActive, setDragActive] = useState(false);

//   // Drag and Drop Handlers
//   const handleDrag = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === "dragenter" || e.type === "dragover") {
//       setDragActive(true);
//     } else if (e.type === "dragleave") {
//       setDragActive(false);
//     }
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);

//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       setFile(e.dataTransfer.files[0]);
//     }
//   };

//   const handleUpload = async () => {
//     if (!file || !role || !experience) {
//       alert("Please fill all fields");
//       return;
//     }

//     setLoading(true);
//     try {
//       const data = await uploadResume(file, role, experience);
//       setSelectedResume(data);

//       // Reset form after successful upload
//       setFile(null);
//       setRole("");
//       setExperience("");
//     } catch (err) {
//       console.error(err);
//       alert("Upload failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 p-6">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="mb-10 text-center">
//           <h1 className="text-4xl font-bold text-slate-900">Resume Analyzer</h1>
//           <p className="text-slate-600 mt-2 text-lg">
//             Upload your resume and get AI-powered ATS insights
//           </p>
//         </div>

//         {/* Upload Section */}
//         <div className="bg-white rounded-3xl shadow-sm border p-10">
//           <div className="flex items-center gap-4 mb-8">
//             <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center">
//               <UploadCloud className="w-7 h-7 text-indigo-600" />
//             </div>
//             <div>
//               <h2 className="text-2xl font-semibold">Upload Resume</h2>
//               <p className="text-slate-500">PDF, DOC, DOCX supported</p>
//             </div>
//           </div>

//           {/* Drag & Drop Area */}
//           <div
//             onDragEnter={handleDrag}
//             onDragLeave={handleDrag}
//             onDragOver={handleDrag}
//             onDrop={handleDrop}
//             className={`border-2 border-dashed rounded-2xl p-16 text-center transition-all mb-8 ${
//               dragActive
//                 ? "border-indigo-600 bg-indigo-50"
//                 : "border-slate-300 hover:border-indigo-400"
//             }`}
//           >
//             <UploadCloud className="w-16 h-16 mx-auto text-slate-400 mb-4" />
//             <p className="text-lg font-medium">
//               Drop your resume here or{" "}
//               <label className="text-indigo-600 hover:underline cursor-pointer">
//                 browse files
//                 <input
//                   type="file"
//                   accept=".pdf,.doc,.docx"
//                   onChange={(e) => setFile(e.target.files[0])}
//                   className="hidden"
//                 />
//               </label>
//             </p>
//             {file && (
//               <p className="mt-4 text-sm text-green-600 font-medium">
//                 Selected: {file.name}
//               </p>
//             )}
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//             <select
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//               className="w-full border border-slate-300 rounded-xl px-5 py-3.5 focus:outline-none focus:border-indigo-500 transition"
//             >
//               <option value="">Select Target Role</option>
//               {ROLES.map((r) => (
//                 <option key={r} value={r}>{r}</option>
//               ))}
//             </select>

//             <select
//               value={experience}
//               onChange={(e) => setExperience(e.target.value)}
//               className="w-full border border-slate-300 rounded-xl px-5 py-3.5 focus:outline-none focus:border-indigo-500 transition"
//             >
//               <option value="">Select Experience Level</option>
//               {EXPERIENCES.map((e) => (
//                 <option key={e} value={e}>
//                   {e.charAt(0).toUpperCase() + e.slice(1)}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <button
//             onClick={handleUpload}
//             disabled={!file || !role || !experience || loading}
//             className="mt-10 w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-4 rounded-2xl font-semibold text-lg hover:from-indigo-700 hover:to-violet-700 disabled:opacity-50 transition-all duration-200"
//           >
//             {loading ? "Analyzing with AI..." : "Upload & Analyze Resume"}
//           </button>
//         </div>

//         {/* Analysis Result */}
//         {selectedResume && (
//           <div className="mt-10 bg-white rounded-3xl shadow-sm border p-10">
//             <div className="flex justify-between items-start mb-8">
//               <div>
//                 <h2 className="text-2xl font-semibold">Analysis Result</h2>
//                 <p className="text-slate-500 mt-1">
//                   {selectedResume.role} • {selectedResume.experience} level
//                 </p>
//               </div>

//               <div className="text-right">
//                 <div className="text-sm text-slate-500">ATS Score</div>
//                 <div className="text-5xl font-bold text-indigo-600">
//                   {selectedResume.ats ?? "N/A"}
//                 </div>
//               </div>
//             </div>

//             {/* Key Insights */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//               <div className="bg-slate-50 p-6 rounded-2xl">
//                 <Award className="w-8 h-8 text-amber-500 mb-3" />
//                 <h3 className="font-semibold text-lg">Strengths</h3>
//                 <p className="text-slate-600 mt-2 text-[15px]">
//                   {selectedResume.strengths || "Well-structured resume detected."}
//                 </p>
//               </div>

//               <div className="bg-slate-50 p-6 rounded-2xl">
//                 <FileText className="w-8 h-8 text-rose-500 mb-3" />
//                 <h3 className="font-semibold text-lg">Areas to Improve</h3>
//                 <p className="text-slate-600 mt-2 text-[15px]">
//                   {selectedResume.improvements || "Consider adding more relevant keywords."}
//                 </p>
//               </div>
//             </div>

//             {/* Full Analysis */}
//             <div>
//               <h3 className="font-semibold mb-3">Full Analysis</h3>
//               <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl font-mono text-sm max-h-[500px] overflow-y-auto">
//                 <pre>{JSON.stringify(selectedResume, null, 2)}</pre>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
