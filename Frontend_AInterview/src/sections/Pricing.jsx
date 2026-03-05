import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Sparkles, Zap, Shield, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "0",
    description: "Perfect for getting started and testing the waters.",
    features: [
      "5 AI-powered mock interviews/mo",
      "Basic performance analytics",
      "Standard question library",
      "Email support",
    ],
    buttonText: "Get Started",
    highlight: false,
    icon: <Zap className="text-slate-400" size={24} />,
  },
  {
    name: "Pro",
    price: "19",
    description: "The most popular choice for serious job seekers.",
    features: [
      "Unlimited AI interviews",
      "Advanced behavioral analysis",
      "Real-time feedback & coaching",
      "Custom interview scenarios",
      "Priority email support",
    ],
    buttonText: "Upgrade to Pro",
    highlight: true,
    icon: <Sparkles className="text-indigo-600" size={24} />,
  },
  {
    name: "Enterprise",
    price: "49",
    description: "Comprehensive tools for long-term career growth.",
    features: [
      "Everything in Pro",
      "1-on-1 expert review (1/mo)",
      "Company-specific prep (FAANG+)",
      "Salary negotiation simulator",
      "Dedicated account manager",
    ],
    buttonText: "Contact Sales",
    highlight: false,
    icon: <Shield className="text-slate-400" size={24} />,
  },
];

export default function Pricing() {

  const navigate = useNavigate();

  return (
    <section id="pricing" className="py-24 bg-slate-50 relative overflow-hidden">

      {/* Background effects */}

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-50 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-50 rounded-full blur-3xl opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Heading */}

        <div className="text-center max-w-3xl mx-auto mb-16">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >

            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Invest in Your <span className="text-indigo-600">Future Self</span>
            </h2>

            <p className="text-lg text-slate-600">
              Choose the plan that fits your career goals.
            </p>

          </motion.div>

        </div>

        {/* Pricing cards */}

        <div className="grid lg:grid-cols-3 gap-8">

          {plans.map((plan, index) => (

            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex flex-col p-8 rounded-3xl transition-all duration-300 ${
                plan.highlight
                  ? "bg-white shadow-2xl border-2 border-indigo-600 scale-105"
                  : "bg-white border border-slate-200 hover:shadow-xl"
              }`}
            >

              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                  Most Popular
                </div>
              )}

              {/* Plan header */}

              <div className="mb-8">

                <div className="mb-4">{plan.icon}</div>

                <h3 className="text-2xl font-bold text-slate-700 mb-2">
                  {plan.name}
                </h3>

                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-bold text-slate-700">
                    ${plan.price}
                  </span>
                  <span className="text-slate-500">/month</span>
                </div>

                <p className="text-slate-600 text-sm">
                  {plan.description}
                </p>

              </div>

              {/* Features */}

              <div className="flex-grow space-y-4 mb-8">

                {plan.features.map((feature) => (

                  <div key={feature} className="flex items-start gap-3">

                    <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center bg-indigo-100 text-indigo-600">
                      <Check size={12} strokeWidth={3} />
                    </div>

                    <span className="text-slate-700 text-sm">
                      {feature}
                    </span>

                  </div>

                ))}

              </div>

              {/* Button */}

              <button
                onClick={() => navigate("/signin")}
                className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition ${
                  plan.highlight
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "bg-slate-900 text-white hover:bg-slate-800"
                }`}
              >
                {plan.buttonText}
                <ArrowRight size={18} />
              </button>

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
}