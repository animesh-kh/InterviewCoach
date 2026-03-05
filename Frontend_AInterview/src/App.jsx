import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import AuthPage from "./pages/AuthPage";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./pages/DashboardLayout";
import Overview from "./pages/Overview";
import History from "./pages/History";
import Analytics from "./pages/Analytics";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>

        {/* Landing routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/features" element={<Landing />} />
        <Route path="/howitworks" element={<Landing />} />
        <Route path="/pricing" element={<Landing />} />
        <Route path="/testimonials" element={<Landing />} />

        {/* Auth */}
        <Route path="/signin" element={<AuthPage />} />
        <Route path="/signup" element={<AuthPage />} />

        {/* Dashboard */}
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
        </Route>

      </Routes>
    </>
  );
}