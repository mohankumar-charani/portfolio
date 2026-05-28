"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { Code2, Server, Database, Smartphone } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ─── Animated counter ───────────────────────────────────────────────────────
function AnimatedStat({ value, label }) {
  // Parse the numeric part and any suffix ("+", "%", etc.)
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : value;

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, target, {
      duration: 2,
      ease: "easeOut",
      onUpdate(v) {
        setDisplay(Math.round(v));
      },
    });
    return controls.stop;
  }, [isInView, target]);

  return (
    <motion.div
      ref={ref}
      whileHover={{ y: -5, scale: 1.02 }}
      className="glass-card p-8 text-center flex flex-col items-center justify-center relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/10 to-accent-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <h4 className="text-4xl md:text-5xl font-display font-bold text-white mb-2 relative z-10">
        {display}{suffix}
      </h4>
      <p className="text-sm text-secondary-text font-medium uppercase tracking-wider relative z-10">
        {label}
      </p>
    </motion.div>
  );
}
// ────────────────────────────────────────────────────────────────────────────

export default function About() {
  const stats = [
    { value: "10+", label: "Projects Completed" },
    { value: "8+",  label: "Technologies" },
    { value: "100%", label: "Client Satisfaction" },
    { value: "2+",  label: "Years Experience" },
  ];

  const features = [
    {
      icon: <Code2 className="w-6 h-6 text-accent-cyan" />,
      title: "UI/UX-focused Engineering",
      description: "Building responsive, accessible, and stunning interfaces using React and Tailwind CSS."
    },
    {
      icon: <Server className="w-6 h-6 text-accent-purple" />,
      title: "Scalable Backends",
      description: "Developing robust APIs and microservices with Spring Boot and Java."
    },
    {
      icon: <Database className="w-6 h-6 text-accent-blue" />,
      title: "Database Management",
      description: "Designing efficient schemas with MySQL and PostgreSQL."
    },
    {
      icon: <Smartphone className="w-6 h-6 text-white" />,
      title: "SaaS Solutions",
      description: "Creating end-to-end multi-tenant SaaS products for modern businesses."
    }
  ];

  return (
    <section id="about" className="py-12 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="text-secondary-text max-w-2xl mx-auto text-lg">
            I craft digital experiences that combine stunning design with robust engineering.&nbsp;
            My focus is on delivering premium SaaS products and scalable freelance solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-white">Full Stack Engineer with a Passion for Perfection</h3>
            <p className="text-secondary-text leading-relaxed">
              As a Full Stack Developer, I specialize in the modern web ecosystem. I build fast, interactive
              frontends using <strong>React.js and Next.js</strong>, and power them with secure, scalable
              backends built on <strong>Spring Boot and MySQL</strong>.
            </p>
            <p className="text-secondary-text leading-relaxed">
              Whether it's integrating complex REST APIs, developing AI-powered web applications, or engineering
              a complete SaaS platform from scratch, I bring a product-minded approach to every line of code I write.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
              {features.map((feature, idx) => (
                <div key={idx} className="flex flex-col space-y-2">
                  <div className="w-12 h-12 rounded-xl glass flex items-center justify-center border border-white/10 shadow-lg">
                    {feature.icon}
                  </div>
                  <h4 className="text-white font-semibold">{feature.title}</h4>
                  <p className="text-sm text-secondary-text">{feature.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Stats Grid — each card is self-contained with its own InView ref */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, idx) => (
              <AnimatedStat key={idx} value={stat.value} label={stat.label} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
