import Step from '../components/Step';
import { Play } from 'lucide-react';

const HowItWorks = () => {
  return (
    <section id="howitworks" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          <div>
            <h2 className="text-4xl font-display font-bold mb-12">
              How IntervAI Works
            </h2>

            <div className="space-y-10">
              <Step 
                number="01"
                title="Choose Your Role"
                description="Select the position you're interviewing for and upload your resume for a personalized experience."
              />
              <Step 
                number="02"
                title="Start Simulation"
                description="Engage in a realistic 30-minute interview session with our AI interviewer via video or text."
              />
              <Step 
                number="03"
                title="Review & Improve"
                description="Receive a detailed performance report with specific suggestions on how to improve your answers."
              />
            </div>

            <button className="mt-12 bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-slate-800 transition-all shadow-lg active:scale-95">
              Try it Now
            </button>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-[3rem] bg-indigo-600 overflow-hidden shadow-2xl relative group">
              <img 
                src="https://picsum.photos/seed/process/800/800" 
                alt="AI Process" 
                className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-2xl cursor-pointer hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 text-indigo-600 fill-current ml-1" />
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 w-32 h-32 bg-indigo-200/50 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-violet-200/50 rounded-full blur-3xl -z-10" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default HowItWorks;