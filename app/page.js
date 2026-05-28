"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);

  // Scroll Progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Custom Cursor Glow
  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      clearTimeout(timer);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-[100] gap-6">

        {/* Spinner + MK logo stacked */}
        <div className="relative flex items-center justify-center w-24 h-24">

          {/* Outer glow pulse */}
          <motion.div
            animate={{ scale: [1, 1.35, 1], opacity: [0.25, 0.05, 0.25] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(6,182,212,0.35) 0%, rgba(139,92,246,0.15) 60%, transparent 80%)",
            }}
          />

          {/* Spinning ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full"
            style={{
              border: "2px solid transparent",
              borderTopColor: "#06b6d4",
              borderRightColor: "rgba(139,92,246,0.4)",
            }}
          />

          {/* MK logo centered inside */}
          <span
            className="text-2xl font-display font-bold relative z-10"
            style={{
              background: "linear-gradient(135deg, #06b6d4, #8b5cf6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            MK
          </span>
        </div>

        {/* Initializing text */}
        <h2 className="text-base font-display font-bold text-white tracking-widest uppercase">
          Initializing<span className="text-accent-cyan">.</span><span className="text-accent-blue">.</span><span className="text-accent-purple">.</span>
        </h2>
      </div>
    );
  }

  return (
    <main className="relative bg-background min-h-screen selection:bg-accent-purple selection:text-white">
      {/* Custom Cursor Glow */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-30 transition-duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 234, 0.05), transparent 40%)`
        }}
      />

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-primary transform origin-left z-[100]"
        style={{ scaleX }}
      />

      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Services />
      <Projects />
      <Experience />
      <Testimonials />
      <Pricing />
      <Contact />
      <Footer />
    </main>
  );
}
