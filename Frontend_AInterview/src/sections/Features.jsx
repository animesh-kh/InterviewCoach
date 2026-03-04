import FeatureCard from '../components/FeatureCard';
import { 
  Video, 
  MessageSquare, 
  Cpu, 
  Layers, 
  Shield, 
  Globe 
} from 'lucide-react';

const Features = () => {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl font-display font-bold mb-6">
            Everything you need to <span className="text-indigo-600">crush</span> your next interview.
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed">
            Our AI-powered platform simulates real-world interview scenarios across various industries and roles.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={Video}
            title="Video Simulations"
            description="Practice with realistic video-based AI interviewers that respond to your body language and tone."
            delay={0.1}
          />
          <FeatureCard 
            icon={MessageSquare}
            title="Real-time Feedback"
            description="Get instant analysis on your answers, including clarity, confidence, and technical accuracy."
            delay={0.2}
          />
          <FeatureCard 
            icon={Cpu}
            title="Adaptive Learning"
            description="Our AI learns from your performance and adjusts question difficulty to help you improve faster."
            delay={0.3}
          />
          <FeatureCard 
            icon={Layers}
            title="Role-Specific Prep"
            description="Tailored questions for 500+ roles, from Software Engineering to Product Management."
            delay={0.4}
          />
          <FeatureCard 
            icon={Shield}
            title="Behavioral Analysis"
            description="Master the STAR method with AI guidance on how to structure your professional stories."
            delay={0.5}
          />
          <FeatureCard 
            icon={Globe}
            title="Multi-language Support"
            description="Practice interviews in 20+ languages to prepare for global opportunities."
            delay={0.6}
          />
        </div>
      </div>
    </section>
  );
};

export default Features;