import { Routes, Route } from "react-router-dom";
import {
  SignIn,
  SignedIn,
  SignedOut,
  RedirectToSignIn
} from "@clerk/clerk-react";

import Landing from "./pages/Landing";
import DashboardLayout from "./pages/DashboardLayout";
import Overview from "./pages/Overview";
import History from "./pages/History";
import Analytics from "./pages/Analytics";

export default function App() {
  return (
    <Routes>
      {/* =========================
          Public Landing Page
      ========================== */}
      <Route path="/" element={<Landing />} />

      {/* =========================
          Sign In Page
      ========================== */}
      <Route
        path="/sign-in/*"
        element={
          <div className="min-h-screen flex items-center justify-center bg-black text-white">
            <SignIn
              routing="path"
              path="/sign-in"
              afterSignInUrl="/dashboard"
              afterSignUpUrl="/dashboard"
            />
          </div>
        }
      />

      {/* =========================
          Protected Dashboard
      ========================== */}
      <Route
        path="/dashboard"
        element={
          <SignedIn>
            <DashboardLayout />
          </SignedIn>
        }
      >
        {/* Default page */}
        <Route index element={<Overview />} />

        {/* Sub routes */}
        <Route path="history" element={<History />} />
        <Route path="analytics" element={<Analytics />} />
      </Route>

      {/* =========================
          Redirect if NOT signed in
      ========================== */}
      <Route
        path="/dashboard/*"
        element={
          <SignedOut>
            <RedirectToSignIn redirectUrl="/dashboard" />
          </SignedOut>
        }
      />
    </Routes>
  );
}