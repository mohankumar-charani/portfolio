"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

export default function Experience() {
  const experiences = [
  {
    title: "Freelance Full Stack Developer",
    company: "Self-Employed",
    period: "2024 - Present",
    description:
      "Delivering end-to-end web applications and SaaS platforms for clients. Specializing in React, Next.js, Spring Boot, and Microservices architecture.",
  },
  {
    title: "Backend Developer",
    company: "Charani Infotech Pvt. Ltd.",
    period: "2024 - 2025",
    description:
      "Developed scalable backend services and REST APIs using Spring Boot and MySQL. Worked on authentication, database optimization, and enterprise application development.",
  },
  {
    title: "Project Team Lead",
    company: "Charani Infotech Pvt. Ltd.",
    period: "2026 - Present",
    description:
      "Leading a development team in building enterprise-grade applications. Managing project architecture, deployment workflows, agile processes, and code quality standards.",
  },
];

  return (
    <section id="experience" className="py-24 relative bg-secondary/10">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Professional <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-secondary-text text-lg">
            My career journey in building robust software solutions.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2"></div>
          
          <div className="space-y-12">
            {experiences.map((exp, idx) => (
                <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className={`relative flex flex-col md:flex-row md:items-center ${
                  idx % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline Node */}
                <div className="absolute left-8 md:left-1/2 w-10 h-10 rounded-full bg-secondary border-2 border-accent-blue shadow-[0_0_15px_rgba(37,99,235,0.5)] flex items-center justify-center -translate-x-1/2 z-10 top-0 md:top-auto">
                  <Briefcase className="w-4 h-4 text-white" />
                </div>

                {/* Content */}
                <div className={`w-full md:w-1/2 pl-20 md:pl-0 pt-2 md:pt-0 ${
                  idx % 2 === 0 ? "md:pl-16" : "md:pr-16 text-left md:text-right"
                }`}>
                  <div className="glass-card p-6 rounded-2xl hover:bg-secondary/40 transition-colors duration-300">
                    <span className="text-accent-cyan font-medium text-sm mb-2 block">{exp.period}</span>
                    <h3 className="text-xl font-bold text-white mb-1">{exp.title}</h3>
                    <h4 className="text-secondary-text font-medium text-sm mb-4">{exp.company}</h4>
                    <p className="text-sm text-secondary-text/80 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
