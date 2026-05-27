"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Animated Blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-purple/20 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -50, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-accent-blue/20 rounded-full blur-[120px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col space-y-8"
        >
          {/* Trust Badges */}
          <div className="flex flex-wrap gap-3">
            <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-white flex items-center shadow-sm">
              Available for Freelance
            </span>
            <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-white flex items-center shadow-sm">
              Fast Delivery
            </span>
            <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-white flex items-center shadow-sm">
              Startup Ready
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight">
            Building <span className="text-gradient">Premium Web Experiences </span> &amp; <span className="text-gradient">Scalable SaaS Products</span>
          </h1>

          <p className="text-lg md:text-xl text-secondary-text max-w-xl">
            Full Stack Developer specializing in React, Spring Boot, SaaS Platforms, AI-integrated Applications, and Modern UI Engineering.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#projects"
              className="glow-border relative inline-flex h-12 items-center justify-center rounded-lg bg-secondary px-8 font-medium text-white transition-transform hover:scale-105 shadow-lg"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-white/20 bg-transparent px-8 font-medium text-white transition-all hover:bg-white/10"
            >
              Book a Call
            </a>
          </div>
        </motion.div>

        {/* Right Content - Professional Avatar Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative lg:ml-auto w-full max-w-md"
        >
          {/* Rotating gradient ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-3px] rounded-3xl z-0"
            style={{
              background: "conic-gradient(from 0deg, #9333ea, #2563eb, #06b6d4, #9333ea)",
              borderRadius: "1.5rem",
              filter: "blur(2px)",
            }}
          />

          {/* Card */}
          <div className="relative z-10 glass-card p-2 rounded-3xl overflow-hidden" style={{ background: "rgba(15,23,42,0.85)" }}>
            <div className="w-full aspect-[4/5] rounded-2xl relative overflow-hidden bg-gradient-to-br from-secondary to-background">

              {/* Avatar image */}
              <img
                src="/developer-avatar.png"
                alt="Mohan Kumar - Full Stack Developer"
                className="w-full h-full object-cover object-top"
              />

              {/* Bottom gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

              {/* Name block */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-6 left-6 right-6"
              >
                <h3 className="text-2xl font-display font-bold text-white mb-1">Mohan Kumar</h3>
                <p className="text-sm text-accent-cyan">Full Stack Developer</p>
              </motion.div>

              {/* Floating Tech Badges — fixed positions */}
              {[
                { label: "React",       top: "12%",  left: "8%",   delay: 0 },
                { label: "Next.js",     top: "8%",   left: "52%",  delay: 0.4 },
                { label: "Spring Boot", top: "32%",  left: "62%",  delay: 0.8 },
                { label: "Java",        top: "52%",  left: "58%",  delay: 0.3 },
                { label: "MySQL",       top: "22%",  left: "4%",   delay: 0.6 },
                { label: "Tailwind",    top: "62%",  left: "5%",   delay: 1.0 },
              ].map(({ label, top, left, delay }) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
                  transition={{
                    opacity: { delay, duration: 0.4 },
                    scale:   { delay, duration: 0.4 },
                    y: { delay, duration: 3 + delay, repeat: Infinity, ease: "easeInOut" },
                  }}
                  className="absolute glass px-3 py-1.5 rounded-lg text-xs font-semibold text-white border border-white/20 shadow-xl backdrop-blur-md"
                  style={{ top, left }}
                >
                  {label}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
