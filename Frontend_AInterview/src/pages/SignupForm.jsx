import React, { useState } from "react";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { signup } from "../utils/api";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {

    try {

      const data = await signup({
        full_name: name,
        email: email,
        password: password
     });

      if (data) {

        alert("Signup successful");

        // redirect to signin page
        navigate("/signin");

      }

    } catch (err) {

      console.error(err);
      alert("Signup failed");

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

        {/* Name */}
        <div className="relative">

          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />

          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 pl-11 pr-4 text-zinc-100"
          />

        </div>


        {/* Email */}
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


        {/* Password */}
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


      {/* Signup Button */}
      <button
        onClick={handleSignup}
        className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition"
      >

        Create Account
        <ArrowRight className="w-5 h-5" />

      </button>


      {/* Go to signin */}
      <p className="text-center text-zinc-500 text-sm">

        Already have an account?{" "}

        <button
          onClick={() => navigate("/signin")}
          className="text-emerald-400 hover:text-emerald-300 font-medium"
        >
          Sign in
        </button>

      </p>

    </motion.div>

  );

};

export default SignupForm;