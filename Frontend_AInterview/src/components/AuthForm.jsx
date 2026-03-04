import { SignIn, SignUp } from "@clerk/clerk-react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Zap } from "lucide-react";
import { useState } from "react";

export default function AuthForm() {
  const [authMode, setAuthMode] = useState("signin");

  return (
    <div className="flex items-center justify-center p-6 relative">
      <div className="w-full max-w-md space-y-8">
        <h2 className="text-3xl font-bold">
          {authMode === "signin" ? "Welcome back" : "Create account"}
        </h2>

        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={authMode}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {authMode === "signin" ? <SignIn routing="hash" /> : <SignUp routing="hash" />}
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={() =>
            setAuthMode(authMode === "signin" ? "signup" : "signin")
          }
          className="text-sm text-zinc-500 hover:text-white flex items-center gap-2"
        >
          Toggle Mode <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}