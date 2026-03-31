import { motion } from 'motion/react';
import { useNavigate } from "react-router-dom";

const CTA = () => {
  const navigate = useNavigate();
  const handleStart = () => {
    const token = localStorage.getItem("token");
    if (token) navigate("/dashboard");
    else navigate("/signin");
  };

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-indigo-600 rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden shadow-2xl shadow-indigo-200">
          
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div
              className="absolute top-0 left-0 w-full h-full"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '40px 40px'
              }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
          >
            <h2 className="text-4xl lg:text-6xl font-display font-bold text-white mb-8">
              Ready to land your <br />dream job?
            </h2>

            <p className="text-xl text-indigo-100 mb-12 max-w-2xl mx-auto">
              Join 50,000+ candidates who have used IntervAI to prepare for interviews at top tech companies.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

              <button
                onClick={handleStart}
                className="w-full sm:w-auto bg-white text-indigo-600 px-10 py-5 rounded-full font-bold text-lg 
                transition-all duration-300 
                hover:bg-slate-50 hover:scale-105 hover:shadow-2xl 
                active:scale-95"
              >
                Get Started for Free
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTA;