"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";

export default function Projects() {
  const projects = [
    {
      title: "PrimeBasket",
      subtitle: "AI-powered eCommerce SaaS Platform",
      description: "A comprehensive SaaS platform for eCommerce businesses. Features include an advanced analytics dashboard, vendor management, AI-driven product recommendations, and a modern, high-converting storefront UI.",
      tech: ["Next.js", "React", "Spring Boot", "MySQL", "Tailwind CSS"],
      image: "https://images.unsplash.com/photo-1555421689-491a97ff2040?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Employee Management System",
      subtitle: "Enterprise HR Portal",
      description: "A robust enterprise application for HR departments. Includes secure JWT authentication, role-based access control (RBAC), performance dashboard analytics, and automated reporting systems.",
      tech: ["React", "Spring Boot", "Spring Security", "PostgreSQL"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Gym Management Platform",
      subtitle: "Fitness Center SaaS",
      description: "An end-to-end management solution for fitness centers. Features automated membership handling, personalized workout tracking, secure payment gateway integration, and a mobile-friendly member portal.",
      tech: ["React", "Node.js", "MongoDB", "Stripe API"],
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      liveUrl: "#",
      githubUrl: "#"
    }
  ];

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-secondary-text max-w-2xl mx-auto text-lg">
            A selection of my best work, showcasing complex problem-solving and premium UI/UX design.
          </p>
        </motion.div>

        <div className="space-y-24">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className={`flex flex-col lg:flex-row gap-10 items-center ${
                idx % 2 !== 0 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Project Image */}
              <div className="w-full lg:w-1/2 relative group">
                <div className="absolute inset-0 bg-gradient-primary rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                <div className="relative rounded-2xl overflow-hidden glass-card border border-white/10 aspect-[4/3] group-hover:border-white/20 transition-colors duration-300">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${project.image})` }}
                  ></div>
                  <div className="absolute inset-0 bg-background/50 group-hover:bg-background/20 transition-colors duration-500"></div>
                </div>
              </div>

              {/* Project Info */}
              <div className="w-full lg:w-1/2 flex flex-col space-y-6">
                <div>
                  <h4 className="text-accent-cyan font-medium text-sm tracking-widest uppercase mb-2">
                    {project.subtitle}
                  </h4>
                  <h3 className="text-3xl md:text-4xl font-display font-bold text-white">
                    {project.title}
                  </h3>
                </div>

                <div className="glass p-6 rounded-xl border border-white/5 relative z-10 shadow-xl">
                  <p className="text-secondary-text leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <ul className="flex flex-wrap gap-3">
                  {project.tech.map((tech) => (
                    <li key={tech} className="text-sm font-medium text-white px-4 py-1.5 rounded-full bg-white/5 border border-white/10">
                      {tech}
                    </li>
                  ))}
                </ul>

                {/* <div className="flex items-center space-x-6 pt-4">
                  <a
                    href={project.liveUrl}
                    className="flex items-center text-white hover:text-accent-cyan transition-colors font-medium"
                  >
                    <ExternalLink className="w-5 h-5 mr-2" />
                    Live Demo
                  </a>
                  <a
                    href={project.githubUrl}
                    className="flex items-center text-secondary-text hover:text-white transition-colors font-medium"
                  >
                    <FaGithub className="w-5 h-5 mr-2" />
                    Source Code
                  </a>
                </div> */}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
