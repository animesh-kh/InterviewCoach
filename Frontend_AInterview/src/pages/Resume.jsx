import { useEffect, useState } from "react";
import { UploadCloud, Award, FileText } from "lucide-react";
import { uploadResume } from "../utils/api";

const ROLES = [
  "Machine Learning", "Django Developer", "Full Stack Developer",
  "Flutter Developer", "iOS Developer", "Java Developer",
  "JavaScript Developer", "DevOps Engineer", "Software Engineer",
  "Database Administrator"
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
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
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

      // Reset form after successful upload
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

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-slate-900">Resume Analyzer</h1>
          <p className="text-slate-600 mt-2 text-lg">
            Upload your resume and get AI-powered ATS insights
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-3xl shadow-sm border p-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center">
              <UploadCloud className="w-7 h-7 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold">Upload Resume</h2>
              <p className="text-slate-500">PDF, DOC, DOCX supported</p>
            </div>
          </div>

          {/* Drag & Drop Area */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-16 text-center transition-all mb-8 ${
              dragActive
                ? "border-indigo-600 bg-indigo-50"
                : "border-slate-300 hover:border-indigo-400"
            }`}
          >
            <UploadCloud className="w-16 h-16 mx-auto text-slate-400 mb-4" />
            <p className="text-lg font-medium">
              Drop your resume here or{" "}
              <label className="text-indigo-600 hover:underline cursor-pointer">
                browse files
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="hidden"
                />
              </label>
            </p>
            {file && (
              <p className="mt-4 text-sm text-green-600 font-medium">
                Selected: {file.name}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-5 py-3.5 focus:outline-none focus:border-indigo-500 transition"
            >
              <option value="">Select Target Role</option>
              {ROLES.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>

            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-5 py-3.5 focus:outline-none focus:border-indigo-500 transition"
            >
              <option value="">Select Experience Level</option>
              {EXPERIENCES.map((e) => (
                <option key={e} value={e}>
                  {e.charAt(0).toUpperCase() + e.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleUpload}
            disabled={!file || !role || !experience || loading}
            className="mt-10 w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-4 rounded-2xl font-semibold text-lg hover:from-indigo-700 hover:to-violet-700 disabled:opacity-50 transition-all duration-200"
          >
            {loading ? "Analyzing with AI..." : "Upload & Analyze Resume"}
          </button>
        </div>

        {/* Analysis Result */}
        {selectedResume && (
          <div className="mt-10 bg-white rounded-3xl shadow-sm border p-10">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-2xl font-semibold">Analysis Result</h2>
                <p className="text-slate-500 mt-1">
                  {selectedResume.role} • {selectedResume.experience} level
                </p>
              </div>

              <div className="text-right">
                <div className="text-sm text-slate-500">ATS Score</div>
                <div className="text-5xl font-bold text-indigo-600">
                  {selectedResume.ats ?? "N/A"}
                </div>
              </div>
            </div>

            {/* Key Insights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-slate-50 p-6 rounded-2xl">
                <Award className="w-8 h-8 text-amber-500 mb-3" />
                <h3 className="font-semibold text-lg">Strengths</h3>
                <p className="text-slate-600 mt-2 text-[15px]">
                  {selectedResume.strengths || "Well-structured resume detected."}
                </p>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl">
                <FileText className="w-8 h-8 text-rose-500 mb-3" />
                <h3 className="font-semibold text-lg">Areas to Improve</h3>
                <p className="text-slate-600 mt-2 text-[15px]">
                  {selectedResume.improvements || "Consider adding more relevant keywords."}
                </p>
              </div>
            </div>

            {/* Full Analysis */}
            <div>
              <h3 className="font-semibold mb-3">Full Analysis</h3>
              <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl font-mono text-sm max-h-[500px] overflow-y-auto">
                <pre>{JSON.stringify(selectedResume, null, 2)}</pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}







// import { useEffect, useState } from "react";
// import { UploadCloud, FileText } from "lucide-react";
// import { uploadResume} from "../utils/api";

// const ROLES = [
//   "Machine Learning",
//   "Django Developer",
//   "Full Stack Developer",
//   "Flutter Developer",
//   "iOS Developer",
//   "Java Developer",
//   "JavaScript Developer",
//   "DevOps Engineer",
//   "Software Engineer",
//   "Database Administrator"
// ];

// const EXPERIENCES = ["entry", "mid", "senior"];

// export default function Resume() {
//   const [file, setFile] = useState(null);
//   const [role, setRole] = useState("");
//   const [experience, setExperience] = useState("");
//   const [resumes, setResumes] = useState([]);
//   const [selectedResume, setSelectedResume] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchResumes();
//   }, []);

//   const fetchResumes = async () => {
//     try {
//       const data = await getMyResumes();
//       setResumes(Array.isArray(data) ? data : []);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleUpload = async () => {
//     if (!file || !role || !experience) {
//       alert("Select all fields");
//       return;
//     }

//     try {
//       setLoading(true);
//       const data = await uploadResume(file, role, experience);
//       setSelectedResume(data);
//       await fetchResumes();
//     } catch (err) {
//       console.error(err);
//       alert("Upload failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleView = async (id) => {
//     try {
//       const data = await getResume(id);
//       setSelectedResume(data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="space-y-8 text-slate-800">

//       {/* HEADER */}
//       <div>
//         <h1 className="text-3xl font-bold">Resume Analyzer</h1>
//         <p className="text-slate-500">
//           Upload your resume and get AI-powered insights.
//         </p>
//       </div>

//       {/* UPLOAD CARD */}
//       <div className="bg-white p-6 rounded-xl shadow border space-y-4">

//         <div className="flex items-center gap-3">
//           <UploadCloud className="text-indigo-600" />
//           <div>
//             <h2 className="font-semibold">Upload Resume</h2>
//             <p className="text-sm text-slate-500">
//               PDF, DOC, DOCX
//             </p>
//           </div>
//         </div>

//         <input
//           type="file"
//           accept=".pdf,.doc,.docx"
//           onChange={(e) => setFile(e.target.files[0])}
//           className="w-full border p-2 rounded"
//         />

//         <select
//           value={role}
//           onChange={(e) => setRole(e.target.value)}
//           className="w-full border p-2 rounded"
//         >
//           <option value="">Select Role</option>
//           {ROLES.map((r) => (
//             <option key={r}>{r}</option>
//           ))}
//         </select>

//         <select
//           value={experience}
//           onChange={(e) => setExperience(e.target.value)}
//           className="w-full border p-2 rounded"
//         >
//           <option value="">Select Experience</option>
//           {EXPERIENCES.map((e) => (
//             <option key={e}>{e}</option>
//           ))}
//         </select>

//         <button
//           onClick={handleUpload}
//           disabled={!file || !role || !experience || loading}
//           className={`px-5 py-2 rounded text-white ${
//             loading
//               ? "bg-gray-400"
//               : "bg-indigo-600 hover:bg-indigo-700"
//           }`}
//         >
//           {loading ? "Analyzing..." : "Upload & Analyze"}
//         </button>
//       </div>

//       {/* ANALYSIS RESULT */}
//       {selectedResume && (
//         <div className="bg-white p-6 rounded-xl shadow border space-y-4">

//           <h2 className="text-xl font-semibold">Analysis Result</h2>

//           {/* ATS SCORE */}
//           <div className="p-4 bg-indigo-50 rounded">
//             <h3 className="font-medium">ATS Score</h3>
//             <p className="text-2xl font-bold text-indigo-600">
//               {selectedResume.ats ?? "N/A"}
//             </p>
//           </div>

//           {/* CREATED DATE */}
//           <div>
//             <strong>Created:</strong>{" "}
//             {selectedResume.created_at || "N/A"}
//           </div>

//           {/* SAFE ANALYSIS DISPLAY */}
//           <div>
//             <h3 className="font-semibold mb-2">Full Analysis</h3>

//             <div className="bg-slate-100 p-3 rounded max-h-80 overflow-y-auto text-sm">
//               {selectedResume ? (
//                 <pre>
//                   {JSON.stringify(selectedResume, null, 2)}
//                 </pre>
//               ) : (
//                 "No data available"
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }









// import { useEffect, useState } from "react";
// import { UploadCloud, FileText } from "lucide-react";
// import { uploadResume, getMyResumes, getResume } from "../utils/api";

// const ROLES = [
//   "Machine Learning",
//   "Django Developer",
//   "Full Stack Developer",
//   "Flutter Developer",
//   "iOS Developer",
//   "Java Developer",
//   "JavaScript Developer",
//   "DevOps Engineer",
//   "Software Engineer",
//   "Database Administrator"
// ];

// const EXPERIENCES = ["entry", "mid", "senior"];

// export default function Resume() {
//   const [file, setFile] = useState(null);
//   const [role, setRole] = useState("");
//   const [experience, setExperience] = useState("");
//   const [resumes, setResumes] = useState([]);
//   const [selectedResume, setSelectedResume] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchResumes();
//   }, []);

//   const fetchResumes = async () => {
//     try {
//       const data = await getMyResumes();
//       setResumes(Array.isArray(data) ? data : []);
//     } catch (error) {
//       console.error("Failed to fetch resumes:", error);
//       setResumes([]);
//     }
//   };

//   const handleUpload = async () => {
//     if (!file || !role || !experience) {
//       alert("Please select file, role and experience");
//       return;
//     }

//     try {
//       setLoading(true);

//       const data = await uploadResume(file, role, experience);

//       setSelectedResume(data);
//       await fetchResumes();

//       setFile(null);
//       setRole("");
//       setExperience("");
//     } catch (error) {
//       console.error("Upload failed:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleView = async (id) => {
//     try {
//       const data = await getResume(id);
//       setSelectedResume(data);
//     } catch (error) {
//       console.error("Failed to fetch resume:", error);
//     }
//   };

//   return (
//     <div className="space-y-8">
      
//       {/* HEADER */}
//       <div>
//         <h1 className="text-3xl font-bold text-slate-800">
//           Resume Analyzer
//         </h1>
//         <p className="text-slate-500 mt-1">
//           Upload your resume and get AI-powered insights.
//         </p>
//       </div>

//       {/* UPLOAD SECTION */}
//       <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
//         <div className="flex items-center gap-4">
//           <div className="p-3 bg-indigo-50 rounded-lg">
//             <UploadCloud className="text-indigo-600 w-6 h-6" />
//           </div>

//           <div>
//             <h2 className="font-semibold text-slate-800">
//               Upload Resume
//             </h2>
//             <p className="text-sm text-slate-500">
//               Supported formats: PDF, DOC, DOCX
//             </p>
//           </div>
//         </div>

//         {/* FORM */}
//         <div className="mt-4 space-y-3">

//           {/* FILE */}
//           <input
//             type="file"
//             accept=".pdf,.doc,.docx"
//             onChange={(e) => setFile(e.target.files[0])}
//             className="block w-full text-sm text-slate-600
//               file:mr-4 file:py-2 file:px-4
//               file:rounded-lg file:border-0
//               file:text-sm file:font-semibold
//               file:bg-indigo-100 file:text-indigo-700
//               hover:file:bg-indigo-200"
//           />

//           {/* ROLE */}
//           <select
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//             className="w-full border border-slate-300 bg-white text-slate-800 p-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
//           >
//             <option value="">Select Role</option>
//             {ROLES.map((r) => (
//               <option key={r} value={r}>{r}</option>
//             ))}
//           </select>

//           {/* EXPERIENCE */}
//           <select
//             value={experience}
//             onChange={(e) => setExperience(e.target.value)}
//             className="w-full border border-slate-300 bg-white text-slate-800 p-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
//           >
//             <option value="">Select Experience</option>
//             {EXPERIENCES.map((exp) => (
//               <option key={exp} value={exp}>{exp}</option>
//             ))}
//           </select>

//           {/* BUTTON */}
//           <button
//             onClick={handleUpload}
//             disabled={!file || !role || !experience || loading}
//             className={`px-6 py-2 rounded-lg font-medium text-white transition
//               ${
//                 !file || !role || !experience
//                   ? "bg-gray-400 cursor-not-allowed"
//                   : "bg-indigo-600 hover:bg-indigo-700"
//               }`}
//           >
//             {loading ? "Analyzing..." : "Upload & Analyze"}
//           </button>
//         </div>
//       </div>

//       {/* RESUME LIST */}
//       <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
//         <h2 className="text-xl font-semibold text-slate-800 mb-4">
//           My Resumes
//         </h2>

//         {resumes.length === 0 ? (
//           <div className="text-slate-500 text-sm">
//             No resumes uploaded yet.
//           </div>
//         ) : (
//           <div className="space-y-3">
//             {resumes.map((resume) => (
//               <div
//                 key={resume.id}
//                 className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50"
//               >
//                 <div className="flex items-center gap-3">
//                   <FileText className="w-5 h-5 text-indigo-500" />
//                   <span className="text-slate-700 font-medium">
//                     {resume.filename || `Resume ${resume.id}`}
//                   </span>
//                 </div>

//                 <button
//                   onClick={() => handleView(resume.id)}
//                   className="text-indigo-600 hover:text-indigo-800 font-medium"
//                 >
//                   View
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* ANALYSIS RESULT */}
//       {selectedResume && (
//         <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
//           <h2 className="text-xl font-semibold text-slate-800 mb-4">
//             Analysis Result
//           </h2>

//           <div className="space-y-2">
//             <p><strong>ATS Score:</strong> {selectedResume.ats}</p>
//             <p><strong>Created At:</strong> {selectedResume.created_at}</p>
//           </div>

//           <h3 className="mt-4 font-semibold">Full Analysis:</h3>

//           <div className="bg-slate-50 p-4 rounded-lg max-h-96 overflow-y-auto text-sm whitespace-pre-wrap">
//             {JSON.stringify(selectedResume, null, 2)}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
