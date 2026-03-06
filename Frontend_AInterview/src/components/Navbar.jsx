import React, { useState, useEffect } from "react";
import { Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goHome = () => navigate("/");
  const goDashboard = () => navigate("/dashboard");
  const goLogin = () => navigate("/signin");
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload(); // refresh navbar state
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white py-3 shadow-sm" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div onClick={goHome} className="flex items-center gap-2 cursor-pointer">
          <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center">
            <Briefcase className="text-white" size={24} />
          </div>
          <span className="text-2xl font-bold text-slate-900">
            InterviewMind <span className="text-indigo-600">AI</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <button onClick={goHome} className="hover:text-indigo-600 transition-colors">
            Home
          </button>
          <a href="features" className="hover:text-indigo-600 transition-colors">
            Features
          </a>
          <a href="howitworks" className="hover:text-indigo-600 transition-colors">
            How it Works
          </a>
          <a href="testimonials" className="hover:text-indigo-600 transition-colors">
            Testimonials
          </a>
          <a href="pricing" className="hover:text-indigo-600 transition-colors">
            Pricing
          </a>
          {isLoggedIn && (
            <button
              onClick={goDashboard}
              className="hover:text-indigo-600 transition-colors font-semibold"
            >
              Dashboard
            </button>
          )}

        </div>

        <div className="flex items-center gap-4">
          {!isLoggedIn ? (
            <>
              <button
                onClick={goLogin}
                className="text-sm font-semibold text-slate-700 hover:text-indigo-600"
              >
                Log in
              </button>

              <button
                onClick={goLogin}
                className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-slate-800"
              >
                Get Started
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;