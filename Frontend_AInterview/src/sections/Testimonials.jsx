import React from "react";
import { Star } from "lucide-react";
import { testimonials } from "../data/testimonials";

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
       <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900">
            What Our Users Say
          </h2>
          <p className="text-slate-500 mt-3">
            Real experiences from people who used InterviewMind AI.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-sm border hover:shadow-lg transition"
            >
            <div className="flex mb-4 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>
              <p className="text-slate-600 mb-6">
                "{t.feedback}"
              </p>
              <div>
                <h4 className="font-semibold text-slate-900">
                  {t.name}
                </h4>
                <p className="text-sm text-slate-500">
                  {t.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}