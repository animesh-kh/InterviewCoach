import { useEffect, useState } from "react";
import { UploadCloud, FileText } from "lucide-react";
import { uploadResume, getMyResumes, getResume } from "../utils/api";

export default function Resume() {
  const [file, setFile] = useState(null);
  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const data = await getMyResumes();
      console.log("RESUMES:", data); 
      if (Array.isArray(data)) {
        setResumes(data);
      } else {
        setResumes([]);
      }
    } catch (error) {
      console.error("Failed to fetch resumes:", error);
      setResumes([]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    try {
      setLoading(true);
      const data = await uploadResume(file);
      console.log("UPLOAD RESPONSE:", data);
      setSelectedResume(data);
      setResumes((prev) => [
        {
          id: Date.now(),
          resume_text: data.resume_text,
        },
        ...prev,
      ]);
      await fetchResumes();
      setFile(null);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleView = async (id) => {
    try {
      const data = await getResume(id);
      console.log("VIEW RESPONSE:", data);
      setSelectedResume(data);
    } catch (error) {
      console.error("Failed to fetch resume:", error);
    }
  };

  return (
    <div className="space-y-8">
     <div>
        <h1 className="text-3xl font-bold text-slate-800">Resume Analyzer</h1>
        <p className="text-slate-500 mt-1">
          Upload your resume and let AI extract key details.
        </p>
      </div>
      {/* Upload Card */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-50 rounded-lg">
            <UploadCloud className="text-indigo-600 w-6 h-6" />
          </div>

          <div>
            <h2 className="font-semibold text-slate-800">Upload Resume</h2>
            <p className="text-sm text-slate-500">
              Supported formats: PDF, DOC, DOCX
            </p>
          </div>
        </div>

        <div className="mt-4 flex gap-4 items-center">
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setFile(e.target.files[0])}
            className="block w-full text-sm text-slate-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100"
          />

          <button
            onClick={handleUpload}
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          My Resumes
        </h2>

        {!Array.isArray(resumes) || resumes.length === 0 ? (
          <div className="text-slate-500 text-sm">
            No resumes uploaded yet.
          </div>
        ) : (
          <div className="space-y-3">
            {resumes.map((resume) => (
              <div
                key={resume.id}
                className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-indigo-500" />
                  <span className="text-slate-700 font-medium">
                    {resume.filename || `Resume ${resume.id}`}
                  </span>
                </div>

                <button
                  onClick={() => handleView(resume.id)}
                  className="text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  View
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedResume && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            Extracted Resume Text
          </h2>

          <div className="bg-slate-50 p-4 rounded-lg max-h-96 overflow-y-auto text-sm text-slate-700 whitespace-pre-wrap">
            {selectedResume.resume_text ||
              selectedResume.extracted_text ||
              "No extracted text available."}
          </div>
        </div>
      )}
    </div>
  );
}