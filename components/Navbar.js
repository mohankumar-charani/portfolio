"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Services", href: "#services" },
    { name: "Projects", href: "#projects" },
    { name: "Pricing", href: "#pricing" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-4" : "bg-transparent py-6"
      }`}
      style={scrolled ? {
        background: "rgba(5, 8, 22, 0.25)",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
      } : {}}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="text-2xl font-display font-bold tracking-tighter">
          <span className="text-gradient">MK</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-secondary-text hover:text-white transition-all duration-200 rounded-lg px-4 py-2"
              style={{ background: "rgba(255,255,255,0)", transition: "background 0.2s, color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0)"}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-white hover:text-accent-cyan transition-colors"
          >
            Resume
          </a>
          <a
            href="#contact"
            className="glow-border relative inline-flex h-10 items-center justify-center rounded-lg bg-secondary px-6 font-medium text-white transition-transform hover:scale-105"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-1 rounded-lg transition-all"
          style={{ background: isOpen ? "rgba(255,255,255,0.08)" : "transparent" }}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle mobile menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -12, scaleY: 0.95 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            style={{
              background: "rgba(5, 8, 22, 0.18)",
              backdropFilter: "blur(36px)",
              WebkitBackdropFilter: "blur(36px)",
              borderTop: "1px solid rgba(255,255,255,0.07)",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.07)",
              transformOrigin: "top",
            }}
            className="absolute top-full left-0 right-0 flex flex-col items-center py-6 space-y-1 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04, duration: 0.2 }}
                className="w-10/12 text-center text-base font-medium text-white/80 hover:text-white rounded-xl py-3 px-6 transition-all duration-200"
                style={{ background: "rgba(255,255,255,0)" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.07)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0)"}
              >
                {link.name}
              </motion.a>
            ))}

            {/* Divider */}
            <div className="w-10/12 border-t border-white/[0.06] my-1" />

            <motion.a
              href="/resume.pdf"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: navLinks.length * 0.04, duration: 0.2 }}
              className="w-10/12 text-center text-base font-medium text-secondary-text hover:text-white rounded-xl py-3 px-6 transition-all duration-200"
              style={{ background: "rgba(255,255,255,0)" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.07)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0)"}
            >
              Resume
            </motion.a>

            <motion.a
              href="#contact"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (navLinks.length + 1) * 0.04, duration: 0.2 }}
              className="mt-2 w-10/12 text-center rounded-xl bg-gradient-primary py-3 font-medium text-white shadow-lg hover:opacity-90 transition-opacity"
            >
              Hire Me
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
