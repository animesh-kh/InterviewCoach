import { motion } from "motion/react";
import { Sparkles, ShieldCheck, Zap } from "lucide-react";

export default function AuthLayout() {
  return (
    <div className="relative hidden lg:flex flex-col justify-between p-12 bg-[#0a0a0a] border-r border-white/5">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-12">
          <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            <Zap className="w-6 h-6 text-black fill-current" />
          </div>
          <span className="text-xl font-bold tracking-tight">LUMINA</span>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-7xl font-bold leading-[0.9] tracking-tighter"
        >
          THE FUTURE <br />
          <span className="text-emerald-500">OF AUTH</span>.
        </motion.h1>

        <p className="text-zinc-400 text-lg max-w-md leading-relaxed mt-6">
          Experience the next generation of secure access. Built with Clerk JWT technology.
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-2 gap-8">
        <div>
          <ShieldCheck className="w-6 h-6 text-emerald-500" />
          <h3>Enterprise Security</h3>
        </div>
        <div>
          <Sparkles className="w-6 h-6 text-blue-500" />
          <h3>Fluid Experience</h3>
        </div>
      </div>
    </div>
  );
}