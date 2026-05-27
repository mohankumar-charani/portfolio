"use client";

import { motion } from "framer-motion";

export default function Hero() {
  const techStack = ["React", "Next.js", "Spring Boot", "Java", "MySQL", "Tailwind"];

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
              <span className="mr-2"></span> Available for Freelance
            </span>
            <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-white flex items-center shadow-sm">
              <span className="mr-2"></span> Fast Delivery
            </span>
            <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-white flex items-center shadow-sm">
              <span className="mr-2"></span> Startup Ready
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight">
            Building <span className="text-gradient">Premium Web Experiences</span> & Scalable SaaS Products
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

        {/* Right Content - Image and Floating Badges */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative lg:ml-auto w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden glass-card p-2"
        >
          {/* Developer Image Placeholder */}
          <div className="w-full h-full bg-gradient-to-br from-secondary to-background rounded-2xl relative flex items-center justify-center overflow-hidden">
            {/* Replace with actual image later */}
            <div className="absolute inset-0 bg-white/5 bg-[url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')] bg-cover bg-center mix-blend-overlay opacity-50"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-6 left-6 right-6"
            >
               <h3 className="text-2xl font-display font-bold text-white mb-1">Mohan Kumar</h3>
               <p className="text-sm text-accent-cyan">Full Stack Developer</p>
            </motion.div>

            {/* Floating Tech Badges */}
            {techStack.map((tech, index) => {
              const xPos = Math.random() * 200 - 100;
              const yPos = Math.random() * 200 - 100;
              
              return (
                <motion.div
                  key={tech}
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 3 + index * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.2,
                  }}
                  className="absolute glass px-3 py-1.5 rounded-lg text-xs font-medium text-white border border-white/20 shadow-xl"
                  style={{
                    top: `calc(50% + ${yPos}px)`,
                    left: `calc(50% + ${xPos}px)`,
                  }}
                >
                  {tech}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
