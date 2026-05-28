"use client";

import { motion } from "framer-motion";
import { Send, MessageCircle } from "lucide-react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // { type: 'success' | 'error', message: '' }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: 'error', message: "Please fill out all fields." });
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setFormData({ name: "", email: "", message: "" });
        setStatus({ type: 'success', message: "Message sent successfully!" });
      } else {
        setStatus({ type: 'error', message: data.error || "Something went wrong. Please try again." });
      }
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus({ type: 'error', message: "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-12 md:py-24 relative overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-full max-h-96 bg-accent-purple/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Let's <span className="text-gradient">Work Together</span>
          </h2>
          <p className="text-secondary-text max-w-2xl mx-auto text-lg">
            Ready to start your next project? Drop me a message and let's turn your ideas into reality.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="glass-card p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <a href="mailto:mohankumar.itwork@gmail.com" className="flex items-center text-secondary-text hover:text-accent-cyan transition-colors group">
                  <div className="w-12 h-12 aspect-square rounded-full glass flex items-center justify-center mr-4 shrink-0 group-hover:scale-110 transition-transform">
                    <FaEnvelope className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Email Me</p>
                    <p>mohankumar.itwork@gmail.com</p>
                  </div>
                </a>

                <a href="https://www.linkedin.com/in/mohankumar-parise/" target="_blank" rel="noopener noreferrer" className="flex items-center text-secondary-text hover:text-accent-blue transition-colors group">
                  <div className="w-12 h-12 aspect-square rounded-full glass flex items-center justify-center mr-4 shrink-0 group-hover:scale-110 transition-transform">
                    <FaLinkedin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">LinkedIn</p>
                    <p>Mohan Kumar Parise</p>
                  </div>
                </a>

                <a href="https://github.com/PariseMohankumar" target="_blank" rel="noopener noreferrer" className="flex items-center text-secondary-text hover:text-accent-purple transition-colors group">
                  <div className="w-12 h-12 aspect-square rounded-full glass flex items-center justify-center mr-4 shrink-0 group-hover:scale-110 transition-transform">
                    <FaGithub className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">GitHub</p>
                    <p>@PariseMohankumar</p>
                  </div>
                </a>
              </div>

              <div className="mt-8 pt-8 border-t border-white/10">
                <a 
                  href="https://wa.me/919642123106"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center w-full py-4 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-[#25D366]/20 hover:border-[#25D366]/50 transition-all group"
                >
                  <span className="flex items-center">
                    <MessageCircle className="w-5 h-5 mr-2 text-[#25D366] group-hover:scale-110 transition-transform" />
                    Chat on WhatsApp
                  </span>
                  {/* <span className="text-xs text-secondary-text mt-1 group-hover:text-[#25D366]/70 transition-colors">+91 96421 23106</span> */}
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="glass-card p-8 rounded-2xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-primary blur-[80px] opacity-20 pointer-events-none"></div>
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-secondary-text mb-2">Your Name</label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-secondary/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:border-transparent transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-secondary-text mb-2">Email Address</label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-secondary/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:border-transparent transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-secondary-text mb-2">Project Details</label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-secondary/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:border-transparent transition-all resize-none"
                  placeholder="Tell me about your project requirements..."
                />
              </div>

              {status && (
                <div className={`p-4 rounded-xl text-sm font-medium ${status.type === 'success' ? 'bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
                  {status.message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full glow-border relative inline-flex h-14 items-center justify-center rounded-xl bg-secondary px-8 font-medium text-white transition-transform hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-3"
                    />
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center">
                    Send Message <Send className="w-5 h-5 ml-2" />
                  </span>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
