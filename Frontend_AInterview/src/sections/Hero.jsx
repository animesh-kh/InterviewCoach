import { motion } from 'motion/react';
import { useNavigate } from "react-router-dom";
import { 
  Zap,
  ArrowRight,
  Play,
  CheckCircle2,
  Star 
} from 'lucide-react';

const Hero = () => {

  const navigate = useNavigate();

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100/50 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-100/50 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-6">
              <Zap className="w-3 h-3 fill-current" />
              <span>Next-Gen Interview Prep</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-display font-bold leading-[1.1] mb-8">
              Master your <span className="text-gradient">Interviews</span> with AI.
            </h1>

            <p className="text-xl text-slate-600 leading-relaxed mb-10 max-w-lg">
              Practice with our advanced AI coach, get real-time feedback on your answers, and land your dream job with confidence.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">

              {/* Start Free Trial Button */}
              <button
                onClick={() => navigate("/signup")}
                className="w-full sm:w-auto bg-indigo-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 active:scale-95 flex items-center justify-center gap-2"
              >
                Start Free Trial <ArrowRight className="w-5 h-5" />
              </button>

              {/* Watch Demo Button (unchanged) */}
              <button className="w-full sm:w-auto bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-50 transition-all active:scale-95 flex items-center justify-center gap-2">
                <Play className="w-5 h-5 fill-slate-900" /> Watch Demo
              </button>

            </div>

            <div className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <img 
                    key={i}
                    src={`https://picsum.photos/seed/user${i}/100/100`} 
                    className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                    alt="User"
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>

              <div className="text-sm text-slate-500">
                <span className="font-bold text-slate-900">10,000+</span> candidates already hired
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
              <img 
                src="https://picsum.photos/seed/interview/1200/800" 
                alt="AI Interview Dashboard" 
                className="w-full h-auto"
                referrerPolicy="no-referrer"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute top-10 -left-4 glass p-5 rounded-2xl shadow-xl max-w-[200px]"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  </div>
                  <span className="font-bold text-sm">Feedback</span>
                </div>
                <p className="text-xs text-slate-500">
                  "Your answer on conflict resolution was excellent. Try adding a specific metric."
                </p>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-10 -right-4 glass p-5 rounded-2xl shadow-xl"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map(i => (
                      <Star key={i} className="w-3 h-3 text-amber-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-bold">98% Match</span>
                </div>
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">
                  Technical Score
                </span>
              </motion.div>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-indigo-100 rounded-full -z-10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-indigo-50 rounded-full -z-10" />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;