import React, { useState } from "react";
import { API_BASE } from "../utils/api";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { Briefcase } from "lucide-react";

import AuthTabs from "../components/auth/AuthTabs";
import LoginForm from "../components/auth/LoginForm";
import SignupForm from "../components/auth/SignupForm";
import ForgotPassword from "../components/auth/ForgotPassword";

export default function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(location.pathname === "/signin");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isResetSent, setIsResetSent] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const endpoint = isLogin
        ? `${API_BASE}/auth/signin`
        : `${API_BASE}/auth/signup`;
      const body = isLogin
        ? { email, password }
        : { full_name: name, email, password };
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Authentication failed");
      }
      const data = await res.json();
      if (data.access_token) {
        localStorage.setItem("token", data.access_token);
        navigate("/");
      } else {
        alert("Account created. Please login.");
        setIsLogin(true);
      }
    } catch (err) {
      alert(err.message);
    }
    setIsLoading(false);
  };
  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email
        })
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Reset failed");
      }
      setIsResetSent(true);
    } catch (err) {
      alert(err.message);
    }
    setIsLoading(false);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-600 text-white mb-4">
            <Briefcase size={32} />
          </div>
          <h1 className="text-3xl font-bold">
            InterviewMind <span className="text-indigo-600">AI</span>
          </h1>

          <p className="text-slate-500">
            Master your next interview with AI
          </p>
        </div>
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100">
          <div className="p-8">
            {!isForgotPassword && (
              <AuthTabs
                isLogin={isLogin}
                setIsLogin={setIsLogin}
              />
            )}
            {isForgotPassword ? (
              <ForgotPassword
                email={email}
                setEmail={setEmail}
                handleResetSubmit={handleResetSubmit}
                isLoading={isLoading}
                isResetSent={isResetSent}
                setIsForgotPassword={setIsForgotPassword}
                setIsResetSent={setIsResetSent}
              />
            ) : isLogin ? (
              <LoginForm
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                rememberMe={rememberMe}
                setRememberMe={setRememberMe}
                handleAuthSubmit={handleAuthSubmit}
                setIsForgotPassword={setIsForgotPassword}
                isLoading={isLoading}
              />
            ) : (
              <SignupForm
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                handleAuthSubmit={handleAuthSubmit}
                isLoading={isLoading}
              />
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}









































// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useNavigate } from "react-router-dom";

// import {
//   Mail,
//   Lock,
//   User,
//   ArrowRight,
//   Briefcase,
//   Sparkles,
//   Loader2,
// } from "lucide-react";

// export default function AuthPage() {

//   const navigate = useNavigate();

//   const [isLogin, setIsLogin] = useState(true);
//   const [isForgotPassword, setIsForgotPassword] = useState(false);
//   const [isResetSent, setIsResetSent] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const toggleMode = () => {
//     setIsLogin(!isLogin);
//     setIsForgotPassword(false);
//     setIsResetSent(false);
//   };

//   const handleForgotPassword = () => {
//     setIsForgotPassword(true);
//   };

//   const handleBackToLogin = () => {
//     setIsForgotPassword(false);
//     setIsResetSent(false);
//   };

//   /* ================= LOGIN / SIGNUP ================= */

//   const handleAuthSubmit = async (e) => {

//     e.preventDefault();
//     setIsLoading(true);

//     try {

//       const endpoint = isLogin
//         ? `${API_BASE}/auth/signin`
//         : `${API_BASE}/auth/signup`;

//       const body = isLogin
//         ? { email, password }
//         : { full_name: name, email, password };

//       const res = await fetch(endpoint, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(body)
//       });

//       if (!res.ok) {
//         const err = await res.json();
//         throw new Error(err.detail || "Authentication failed");
//       }

//       const data = await res.json();

//       if (data.access_token) {
//         localStorage.setItem("token", data.access_token);
//         navigate("/dashboard");
//       } else {
//         alert("Account created. Please login.");
//         setIsLogin(true);
//       }

//     } catch (err) {

//       alert(err.message);

//     }

//     setIsLoading(false);
//   };

//   /* ================= RESET PASSWORD ================= */

//   const handleResetSubmit = async (e) => {

//     e.preventDefault();
//     setIsLoading(true);

//     try {

//       const res = await fetch(`${API_BASE}/auth/reset-password`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           email: email
//         })
//       });

//       if (!res.ok) {
//         const err = await res.json();
//         throw new Error(err.detail || "Reset failed");
//       }

//       setIsResetSent(true);

//     } catch (err) {

//       alert(err.message);

//     }

//     setIsLoading(false);
//   };

//   return (

//     <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">

//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="w-full max-w-md"
//       >

//         {/* LOGO */}

//         <div className="text-center mb-8">

//           <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-600 text-white mb-4">
//             <Briefcase size={32} />
//           </div>

//           <h1 className="text-3xl font-bold">
//             InterviewMind <span className="text-indigo-600">AI</span>
//           </h1>

//           <p className="text-slate-500">
//             Master your next interview with AI
//           </p>

//         </div>

//         {/* CARD */}

//         <div className="bg-white rounded-3xl shadow-xl border border-slate-100">

//           <div className="p-8">

//             {!isForgotPassword && (

//               <div className="flex mb-8 bg-slate-100 p-1 rounded-xl">

//                 <button
//                   onClick={() => setIsLogin(true)}
//                   className={`flex-1 py-2 rounded-lg ${
//                     isLogin ? "bg-white shadow-sm" : ""
//                   }`}
//                 >
//                   Sign In
//                 </button>

//                 <button
//                   onClick={() => setIsLogin(false)}
//                   className={`flex-1 py-2 rounded-lg ${
//                     !isLogin ? "bg-white shadow-sm" : ""
//                   }`}
//                 >
//                   Sign Up
//                 </button>

//               </div>

//             )}

//             <AnimatePresence mode="wait">

//               {/* ================= FORGOT PASSWORD ================= */}

//               {isForgotPassword ? (

//                 <motion.div
//                   key="forgot"
//                   initial={{ opacity: 0, x: 20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: -20 }}
//                 >

//                   {isResetSent ? (

//                     <div className="text-center space-y-4">

//                       <Sparkles size={24} />

//                       <h3 className="text-xl font-bold">
//                         Check your email
//                       </h3>

//                       <p className="text-sm text-slate-500">
//                         Password reset link sent to your email.
//                       </p>

//                       <button
//                         onClick={handleBackToLogin}
//                         className="w-full bg-slate-100 py-3 rounded-xl"
//                       >
//                         Back to login
//                       </button>

//                     </div>

//                   ) : (
//                     <form
//                       onSubmit={handleResetSubmit}
//                       className="space-y-5"
//                     >
//                       <h3 className="text-xl font-bold">
//                         Reset Password
//                       </h3>
//                       <div className="relative">
//                         <Mail className="absolute left-3 top-3 text-slate-400" />
//                         <input
//                           required
//                           value={email}
//                           onChange={(e) => setEmail(e.target.value)}
//                           type="email"
//                           placeholder="Email"
//                           className="w-full pl-10 py-3 border rounded-xl"
//                         />
//                       </div>
//                       <button
//                         className="w-full bg-indigo-600 text-white py-3 rounded-xl flex justify-center"
//                       >
//                         {isLoading
//                           ? <Loader2 className="animate-spin" />
//                           : "Send Reset Link"}
//                       </button>
//                     </form>
//                   )}
//                 </motion.div>
//               ) : (
//                 <motion.form
//                   key={isLogin ? "login" : "signup"}
//                   initial={{ opacity: 0, x: 20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: -20 }}
//                   onSubmit={handleAuthSubmit}
//                   className="space-y-5"
//                 >
//                   {!isLogin && (
//                     <div className="relative">
//                       <User className="absolute left-3 top-3 text-slate-400" />
//                       <input
//                         required
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         type="text"
//                         placeholder="Full Name"
//                         className="w-full pl-10 py-3 border rounded-xl"
//                       />
//                     </div>
//                   )}
//                   <div className="relative">
//                     <Mail className="absolute left-3 top-3 text-slate-400" />
//                     <input
//                       required
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       type="email"
//                       placeholder="Email"
//                       className="w-full pl-10 py-3 border rounded-xl"
//                     />
//                   </div>
//                   <div className="relative">
//                     <Lock className="absolute left-3 top-3 text-slate-400" />
//                     <input
//                       required
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       type="password"
//                       placeholder="Password"
//                       className="w-full pl-10 py-3 border rounded-xl"
//                     />
//                   </div>
//                   {isLogin && (
//                     <div className="flex justify-between items-center text-sm">
//                       <label className="flex items-center gap-2">
//                         <input
//                           type="checkbox"
//                           checked={rememberMe}
//                           onChange={(e) => setRememberMe(e.target.checked)}
//                         />
//                         Remember me
//                       </label>

//                       <button
//                         type="button"
//                         onClick={handleForgotPassword}
//                         className="text-indigo-600"
//                       >
//                         Forgot password?
//                       </button>
//                     </div>
//                   )}
//                   <button
//                     className="w-full bg-indigo-600 text-white py-3 rounded-xl flex justify-center gap-2"
//                   >
//                     {isLoading ? (
//                       <Loader2 className="animate-spin" />
//                     ) : (
//                       <>
//                         {isLogin ? "Sign In" : "Create Account"}
//                         <ArrowRight size={18} />
//                       </>
//                     )}
//                   </button>
//                 </motion.form>
//               )}
//             </AnimatePresence>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// }