"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function Pricing() {
  const plans = [
    {
      name: "Starter Website",
      price: "Rs. 5,000",
      duration: "3 – 5 days delivery",
      description: "Perfect for personal portfolios and small businesses.",
      features: [
        "Up to 5 Pages",
        "Mobile-first Responsive Design",
        "Basic SEO Setup",
        "Contact Form Integration",
        "15 days Free Support"
      ],
      popular: false
    },
    {
      name: "Business Website",
      price: "Rs. 10,000",
      duration: "7 – 10 days delivery",
      description: "Ideal for growing businesses needing a professional web presence.",
      features: [
        "Up to 10 Pages",
        "Premium UI/UX & Animations",
        "Advanced SEO Optimization",
        "CMS Integration",
        "Performance Optimization",
        "1 Months Free Support"
      ],
      popular: true
    },
    {
      name: "Full SaaS Product",
      price: "Rs. 30,000",
      duration: "3 – 4 weeks delivery",
      description: "For startups and enterprises requiring complex web applications.",
      features: [
        "Full Stack Web App",
        "Custom Authentication (JWT)",
        "Admin Dashboard & Analytics",
        "REST API Integration",
        "Database Design & Setup",
        "3 Months Free Support"
      ],
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-12 md:py-24 relative bg-secondary/10">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Transparent <span className="text-gradient">Pricing</span>
          </h2>
          <p className="text-secondary-text max-w-2xl mx-auto text-lg">
            Choose the perfect plan tailored to your business requirements. No hidden fees.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`relative ${plan.popular ? "md:-mt-8 md:mb-8 z-10" : "z-0"}`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-primary text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest shadow-lg z-20">
                  Most Popular
                </div>
              )}
              
              <div className={`glass-card p-8 rounded-2xl h-full flex flex-col ${
                plan.popular ? "border-accent-purple/50 shadow-[0_0_30px_rgba(147,51,234,0.2)] bg-secondary/40" : ""
              }`}>
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-sm text-secondary-text mb-6 min-h-[40px]">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-display font-bold text-white">
                    {plan.price.split(' ')[0]} <span className="text-gradient">{plan.price.split(' ')[1]}</span>
                  </span>
                  <span className="text-secondary-text text-sm ml-2">starting</span>
                </div>
                
                <div className="text-xs font-medium text-accent-cyan mb-8 uppercase tracking-wider">
                   {plan.duration}
                </div>

                <ul className="space-y-4 mb-8 flex-1">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start text-white/80 text-sm">
                      <CheckCircle2 className="w-5 h-5 text-accent-cyan mr-3 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`w-full py-3 rounded-lg font-medium text-center transition-all ${
                    plan.popular 
                      ? "bg-gradient-primary text-white hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]" 
                      : "glass text-white hover:bg-white/10"
                  }`}
                >
                  Get Started
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
