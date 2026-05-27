"use client";

import { MessageCircle } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-background pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo & Tagline */}
          <div className="col-span-1 md:col-span-2">
            <a href="#home" className="text-2xl font-display font-bold tracking-tighter inline-block mb-4">
              <span className="text-gradient">MK</span>
            </a>
            <p className="text-secondary-text max-w-sm leading-relaxed">
              Building premium web experiences and scalable SaaS products. Turning complex problems into elegant solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#about" className="text-sm text-secondary-text hover:text-accent-cyan transition-colors">About Me</a></li>
              <li><a href="#services" className="text-sm text-secondary-text hover:text-accent-cyan transition-colors">Services</a></li>
              <li><a href="#projects" className="text-sm text-secondary-text hover:text-accent-cyan transition-colors">Projects</a></li>
              <li><a href="#pricing" className="text-sm text-secondary-text hover:text-accent-cyan transition-colors">Pricing</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/PariseMohankumar" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass flex items-center justify-center text-secondary-text hover:text-white hover:border-white/30 transition-all"
              >
                <FaGithub className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/mohankumar-parise/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass flex items-center justify-center text-secondary-text hover:text-accent-blue hover:border-accent-blue/50 transition-all"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://wa.me/9642123106" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass flex items-center justify-center text-secondary-text hover:text-[#25D366] hover:border-[#25D366]/50 transition-all"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-secondary-text mb-4 md:mb-0">
            © {currentYear} Mohan Kumar. All rights reserved.
          </p>
          <p className="text-sm text-secondary-text">
            Designed & Developed by <span className="text-white font-medium">Mohan Kumar</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
