import React, { useState, useEffect } from "react";
import { Bot } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const { isSignedIn } = useUser();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogin = () => {
    if (isSignedIn) {
      navigate("/dashboard");
    } else {
      navigate("/sign-in");
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass py-3 shadow-sm" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
            <Bot className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-display font-bold tracking-tight">
            IntervAI
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#features" className="hover:text-indigo-600 transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-indigo-600 transition-colors">How it Works</a>
          <a href="#testimonials" className="hover:text-indigo-600 transition-colors">Testimonials</a>
          <a href="#pricing" className="hover:text-indigo-600 transition-colors">Pricing</a>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleLogin}
            className="text-sm font-semibold text-slate-700 hover:text-indigo-600 transition-colors"
          >
            Log in
          </button>

          <button
            onClick={handleLogin}
            className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-slate-800 transition-all shadow-md active:scale-95"
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;









// import React, { useState, useEffect } from 'react';
// import { 
//   Bot
// } from 'lucide-react';

// const Navbar = () => {
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 20);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-3 shadow-sm' : 'bg-transparent py-6'}`}>
//       <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
//         <div className="flex items-center gap-2">
//           <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
//             <Bot className="text-white w-6 h-6" />
//           </div>
//           <span className="text-xl font-display font-bold tracking-tight">IntervAI</span>
//         </div>
        
//         <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
//           <a href="#features" className="hover:text-indigo-600 transition-colors">Features</a>
//           <a href="#how-it-works" className="hover:text-indigo-600 transition-colors">How it Works</a>
//           <a href="#testimonials" className="hover:text-indigo-600 transition-colors">Testimonials</a>
//           <a href="#pricing" className="hover:text-indigo-600 transition-colors">Pricing</a>
//         </div>

//         <div className="flex items-center gap-4">
//           <button className="text-sm font-semibold text-slate-700 hover:text-indigo-600 transition-colors">Log in</button>
//           <button className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-slate-800 transition-all shadow-md active:scale-95">
//             Get Started
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;