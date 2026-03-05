import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Navbar from "../components/Navbar";
import Hero from "../sections/Hero";
import Features from "../sections/Features";
import HowItWorks from "../sections/HowItWorks";
import Testimonials from "../sections/Testimonials";
import Pricing from "../sections/Pricing";
import CTA from "../sections/CTA";
import Footer from "../sections/Footer";

export default function Landing() {

  const location = useLocation();

  useEffect(() => {

    const section = location.pathname.replace("/", "");

    if (!section) return;

    const scrollToSection = () => {
      const element = document.getElementById(section);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    };

    requestAnimationFrame(scrollToSection);

  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <CTA />
      <Footer />
    </>
  );
}