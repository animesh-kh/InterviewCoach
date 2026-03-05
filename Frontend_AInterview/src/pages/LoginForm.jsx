import React, { useState } from "react";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { signin } from "../utils/api";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
  try {
    const data = await signin({
      email,
      password
    });
    if (data.access_token) {
      localStorage.setItem("token", data.access_token);
      window.location.href = "/dashboard";
    } else {
      alert("Invalid credentials");
    }
  } catch (error) {
    console.error(error);
    alert("Server error");
  }

};
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="space-y-4">
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 pl-11 pr-4 text-zinc-100"
          />
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 pl-11 pr-4 text-zinc-100"
          />
        </div>
      </div>
      <button
        onClick={handleLogin}
        className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition"
      >
        SignIn
        <ArrowRight className="w-5 h-5" />
      </button>
      <p className="text-center text-zinc-500 text-sm">
        Don't have an account?{" "}
        <button
          onClick={() => navigate("/signup")}
          className="text-emerald-400 hover:text-emerald-300 font-medium"
        >
          Create account
        </button>
      </p>
    </motion.div>
  );
};

export default LoginForm;