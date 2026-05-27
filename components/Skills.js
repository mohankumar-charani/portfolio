"use client";

import { motion } from "framer-motion";

export default function Skills() {
  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        { name: "React", level: 90 },
        { name: "Next.js", level: 85 },
        { name: "Tailwind CSS", level: 95 },
        { name: "JavaScript", level: 90 },
      ]
    },
    {
      title: "Backend",
      skills: [
        { name: "Spring Boot", level: 85 },
        { name: "Java", level: 90 },
        { name: "REST APIs", level: 95 },
        { name: "Hibernate / JWT Auth", level: 80 },
      ]
    },
    {
      title: "Database",
      skills: [
        { name: "MySQL", level: 85 },
        { name: "PostgreSQL", level: 80 },
        { name: "Firebase", level: 75 },
      ]
    },
    {
      title: "Tools & Workflow",
      skills: [
        { name: "GitHub", level: 90 },
        { name: "Postman", level: 85 },
        { name: "VS Code", level: 95 },
        { name: "Figma", level: 70 },
      ]
    }
  ];

  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Technical <span className="text-gradient">Arsenal</span>
          </h2>
          <p className="text-secondary-text max-w-2xl mx-auto text-lg">
            A comprehensive overview of the technologies and tools I use to build robust, scalable applications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glow-border rounded-2xl"
            >
              <div className="glass-card p-6 h-full rounded-2xl transition-all duration-300 hover:bg-secondary/40">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-accent-cyan mr-3 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span>
                  {category.title}
                </h3>
                
                <div className="space-y-6">
                  {category.skills.map((skill, sIdx) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-secondary-text">{skill.name}</span>
                        <span className="text-sm font-medium text-white">{skill.level}%</span>
                      </div>
                      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 + (sIdx * 0.1) }}
                          className="h-full bg-gradient-primary rounded-full relative"
                        >
                           <div className="absolute top-0 right-0 bottom-0 w-10 bg-white/20 blur-md"></div>
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
