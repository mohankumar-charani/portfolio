"use client";

import { motion } from "framer-motion";
import { Layout, Blocks, LayoutDashboard, Bot, Webhook, MonitorSmartphone, Settings, Rocket } from "lucide-react";

export default function Services() {
  const services = [
    {
      title: "SaaS Application Development",
      description: "End-to-end development of scalable SaaS products with multi-tenancy, subscriptions, and modern UI.",
      icon: <Blocks className="w-8 h-8 text-accent-purple" />
    },
    {
      title: "Full Stack Web Development",
      description: "Custom web applications built from scratch using React, Next.js, and Spring Boot.",
      icon: <Layout className="w-8 h-8 text-accent-blue" />
    },
    {
      title: "AI-integrated Web Apps",
      description: "Infusing your applications with AI capabilities using modern LLMs and intelligent APIs.",
      icon: <Bot className="w-8 h-8 text-accent-cyan" />
    },
    {
      title: "Admin Dashboards",
      description: "Complex, data-rich analytical dashboards for monitoring and managing your business.",
      icon: <LayoutDashboard className="w-8 h-8 text-white" />
    },
    {
      title: "REST API Development",
      description: "Secure, high-performance RESTful APIs built with Spring Boot and Java.",
      icon: <Webhook className="w-8 h-8 text-accent-purple" />
    },
    {
      title: "Business Automation Tools",
      description: "Custom internal tools to streamline your workflows and automate repetitive tasks.",
      icon: <Settings className="w-8 h-8 text-accent-blue" />
    },
    {
      title: "Responsive Website Design",
      description: "Pixel-perfect, mobile-first websites optimized for performance and SEO.",
      icon: <MonitorSmartphone className="w-8 h-8 text-accent-cyan" />
    },
    {
      title: "Landing Page Development",
      description: "High-converting, animation-rich landing pages that drive user engagement.",
      icon: <Rocket className="w-8 h-8 text-white" />
    }
  ];

  return (
    <section id="services" className="py-12 md:py-24 relative bg-secondary/10">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Specialized <span className="text-gradient">Services</span>
          </h2>
          <p className="text-secondary-text max-w-2xl mx-auto text-lg">
            Delivering premium solutions across the entire software development lifecycle, tailored to your business needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group"
            >
              <div className="glow-border h-full rounded-2xl">
                <div className="glass-card p-8 h-full rounded-2xl flex flex-col items-start transition-all duration-300 group-hover:-translate-y-2">
                  <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent-cyan transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-secondary-text leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
