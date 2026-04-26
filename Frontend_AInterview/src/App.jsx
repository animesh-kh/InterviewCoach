import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import AuthPage from "./pages/AuthPage";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./pages/DashboardLayout";
import Overview from "./pages/Overview";
import History from "./pages/History";
import Analytics from "./pages/Analytics";
import ScrollToTop from "./components/ScrollToTop";
import Resume from "./pages/Resume";
import InterviewSetup from "./pages/InterviewSetup";
import InterviewSession from "./pages/InterviewSession";
import FinalResults from "./pages/FinalResults";

export default function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/features" element={<Landing />} />
        <Route path="/howitworks" element={<Landing />} />
        <Route path="/pricing" element={<Landing />} />
        <Route path="/testimonials" element={<Landing />} />

        <Route path="/signin" element={<AuthPage />} />
        <Route path="/signup" element={<AuthPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Overview />} />
          <Route path="history" element={<History />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="resume" element={<Resume />} />
          <Route path="interview/setup" element={<InterviewSetup />} />
          <Route path="interview/session" element={<InterviewSession />} />
          <Route path="interview/results" element={<FinalResults />} />
        </Route>
      </Routes>
    </>
  );
}