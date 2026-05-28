"use client";

import {
  useState,
  useEffect,
  useMemo,
  useRef,
} from "react";

import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, 
  X, 
  Home, 
  User, 
  Cpu, 
  Briefcase, 
  Code2, 
  CreditCard, 
  Mail, 
  ArrowUpRight 
} from "lucide-react";

export default function Navbar() {
  // ----------------------------------------
  // STATES
  // ----------------------------------------

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");

  // ----------------------------------------
  // REFS
  // ----------------------------------------

  const scrollYRef = useRef(0);
  const isAnimatingRef = useRef(false);
  // Tracks menu open state synchronously (no closure staleness)
  const isMenuOpenRef = useRef(false);

  // ----------------------------------------
  // NAV LINKS
  // ----------------------------------------

  const navLinks = useMemo(
    () => [
      { name: "Home", href: "#home", icon: Home, gradient: "from-blue-500/20 to-cyan-500/20" },
      { name: "About", href: "#about", icon: User, gradient: "from-purple-500/20 to-pink-500/20" },
      { name: "Skills", href: "#skills", icon: Cpu, gradient: "from-cyan-500/20 to-emerald-500/20" },
      { name: "Services", href: "#services", icon: Briefcase, gradient: "from-violet-500/20 to-fuchsia-500/20" },
      { name: "Projects", href: "#projects", icon: Code2, gradient: "from-blue-500/20 to-indigo-500/20" },
      { name: "Pricing", href: "#pricing", icon: CreditCard, gradient: "from-pink-500/20 to-rose-500/20" },
      { name: "Contact", href: "#contact", icon: Mail, gradient: "from-amber-500/20 to-orange-500/20" },
    ],
    []
  );

  // ----------------------------------------
  // ACTIVE SECTION DETECTION (scroll-based — reliable for all section sizes)
  // ----------------------------------------

  const computeActiveSection = (scrollY) => {
    const NAVBAR_HEIGHT = 100;
    let current = navLinks[0].href;
    for (const link of navLinks) {
      const el = document.getElementById(link.href.replace("#", ""));
      if (!el) continue;
      if (scrollY >= el.offsetTop - NAVBAR_HEIGHT - 10) {
        current = link.href;
      }
    }
    return current;
  };

  useEffect(() => {
    const detectActiveSection = () => {
      // KEY FIX: when body is position:fixed, window.scrollY === 0
      // which would falsely set activeSection to #home.
      // Skip detection entirely while menu is open.
      if (isMenuOpenRef.current) return;
      if (isAnimatingRef.current) return;

      setActiveSection(computeActiveSection(window.scrollY));
    };

    // Fire once on mount
    detectActiveSection();

    window.addEventListener("scroll", detectActiveSection, { passive: true });
    return () => window.removeEventListener("scroll", detectActiveSection);
  }, [navLinks]);


  // ----------------------------------------
  // NAVBAR BACKGROUND ON SCROLL
  // ----------------------------------------

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // ----------------------------------------
  // LOCK BODY
  // ----------------------------------------

  const lockBodyScroll = () => {
    // Save scroll BEFORE fixing body so we can restore it later
    scrollYRef.current = window.scrollY;

    // Set the correct active section NOW (before scrollY becomes 0)
    setActiveSection(computeActiveSection(scrollYRef.current));

    // Mark menu as open so scroll listener skips detection
    isMenuOpenRef.current = true;

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollYRef.current}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
  };

  // ----------------------------------------
  // UNLOCK BODY
  // ----------------------------------------

  const unlockBodyScroll = () => {
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    document.body.style.overflow = "";
    document.body.style.touchAction = "";

    window.scrollTo({ top: scrollYRef.current, behavior: "instant" });

    // Resume scroll detection AFTER restoring position
    isMenuOpenRef.current = false;
  };

  // ----------------------------------------
  // MENU OPEN/CLOSE
  // ----------------------------------------

  useEffect(() => {
    if (isOpen) {
      lockBodyScroll();
    }

    return () => { };
  }, [isOpen]);

  // ----------------------------------------
  // NAVIGATION
  // ----------------------------------------

  const navigateToSection = (href) => {
    if (isAnimatingRef.current) return;

    isAnimatingRef.current = true;

    // close menu
    setIsOpen(false);

    // wait for menu close animation
    setTimeout(() => {
      // restore exact previous position FIRST
      unlockBodyScroll();

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const target = document.querySelector(href);

          if (!target) return;

          const navbarHeight = 90;

          const targetPosition =
            target.getBoundingClientRect().top +
            window.pageYOffset -
            navbarHeight;

          // smooth scroll from CURRENT section
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });

          setActiveSection(href);

          setTimeout(() => {
            isAnimatingRef.current = false;
          }, 1200);
        });
      });
    }, 350);
  };

  // ----------------------------------------
  // CLOSE MENU ONLY
  // ----------------------------------------

  const handleCloseMenu = () => {
    setIsOpen(false);

    setTimeout(() => {
      unlockBodyScroll();
    }, 300);
  };

  // ----------------------------------------
  // FRAMER MOTION
  // ----------------------------------------

  const overlayVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.25,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(10px)",
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.06,
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
    exit: {
      opacity: 0,
      y: 10,
      transition: {
        duration: 0.2,
      },
    },
  };

  // ----------------------------------------
  // JSX
  // ----------------------------------------

  return (
    <>
      {/* MOBILE MENU — rendered BEFORE nav so z-index stacking is correct */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-40 md:hidden flex flex-col overflow-hidden"
            style={{
              backgroundColor: "#050816",
              WebkitBackdropFilter: "blur(30px) saturate(180%)",
              backdropFilter: "blur(30px) saturate(180%)",
              willChange: "opacity",
              transform: "translateZ(0)",
              backfaceVisibility: "hidden",
              isolation: "isolate",
            }}
          >
            {/* ── Background Radial Glows (Futuristic Apple/Vercel Vibe) ── */}
            <div className="absolute top-[-10%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-accent-purple/15 blur-[120px] pointer-events-none z-0" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-accent-cyan/10 blur-[120px] pointer-events-none z-0" />

            {/* ── Top bar: logo left, close button right ── */}
            <div className="flex items-center justify-between px-6 py-5 shrink-0 z-10"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
              <button
                onClick={() => navigateToSection("#home")}
                className="text-2xl font-bold tracking-tight"
              >
                <span className="text-gradient">MK</span>
              </button>

              <button
                onClick={handleCloseMenu}
                aria-label="Close menu"
                className="text-white rounded-2xl p-2.5 transition-all duration-300 active:scale-95"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "inset 0 1px 1px rgba(255,255,255,0.05)",
                }}
              >
                <motion.span
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ duration: 0.18 }}
                  className="block"
                >
                  <X size={20} />
                </motion.span>
              </button>
            </div>

            {/* ── Scrollable Premium Card List ── */}
            <div className="flex-1 overflow-y-auto px-6 py-5 z-10 relative">
              <div className="flex flex-col gap-2.5 w-full">
                {navLinks.map((link, i) => {
                  const IconComponent = link.icon;
                  const isActive = activeSection === link.href;

                  return (
                    <motion.button
                      key={link.href}
                      custom={i}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      whileTap={{ scale: 0.98 }}
                      onClick={() => navigateToSection(link.href)}
                      className={`
                        w-full rounded-2xl py-3 px-4 text-left transition-all duration-300
                        border relative flex items-center justify-between group overflow-hidden
                        ${isActive
                          ? "bg-gradient-to-r from-white/[0.06] to-white/[0.02] border-white/15 shadow-[0_4px_20px_rgba(139,92,246,0.06),inset_0_1px_1px_rgba(255,255,255,0.1)]"
                          : "bg-gradient-to-b from-white/[0.03] to-transparent border-white/[0.04] hover:border-white/8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.03)]"
                        }
                      `}
                    >
                      {/* Active indicator bar */}
                      {isActive && (
                        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-accent-cyan to-accent-purple rounded-r-sm" />
                      )}

                      <div className="flex items-center gap-3">
                        {/* Glow Icon Container */}
                        <div 
                          className={`w-9 h-9 rounded-xl flex items-center justify-center relative shrink-0 overflow-hidden border border-white/[0.06]`}
                          style={{
                            background: isActive
                              ? "linear-gradient(135deg, rgba(6,182,212,0.12) 0%, rgba(139,92,246,0.12) 100%)"
                              : "rgba(255,255,255,0.02)",
                            boxShadow: isActive ? "0 0 12px rgba(6,182,212,0.08)" : "none"
                          }}
                        >
                          <IconComponent 
                            className={`w-[18px] h-[18px] transition-colors duration-300 ${
                              isActive ? "text-accent-cyan" : "text-white/50 group-hover:text-white/80"
                            }`} 
                          />
                        </div>

                        {/* Title text */}
                        <div className="flex flex-col">
                          <span className={`text-[15px] font-semibold tracking-wide transition-colors duration-300 ${
                            isActive ? "text-white" : "text-white/70 group-hover:text-white/90"
                          }`}>
                            {link.name}
                          </span>
                        </div>
                      </div>

                      {/* Right Indicator (arrow or pulsing active dot) */}
                      <div className="flex items-center">
                        {isActive ? (
                          <div className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-cyan opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-cyan shadow-[0_0_6px_#06b6d4]"></span>
                          </div>
                        ) : (
                          <ArrowUpRight className="w-[14px] h-[14px] text-white/10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white/30" />
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* ── Fixed Bottom Premium CTA ── */}
            <div className="shrink-0 px-6 pb-6 pt-3 z-10"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)", backgroundColor: "rgba(5, 8, 22, 0.4)" }}
            >
              <motion.button
                custom={navLinks.length}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileTap={{ scale: 0.96 }}
                onClick={() => navigateToSection("#contact")}
                className="
                  w-full rounded-xl py-3 text-base font-bold text-white
                  transition-all duration-300 select-none flex items-center justify-center gap-2
                "
                style={{
                  background: "linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)",
                  boxShadow: "0 4px 20px rgba(139,92,246,0.22), 0 0 40px rgba(6,182,212,0.08)",
                }}
              >
                Hire Me
                <ArrowUpRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* NAVBAR — z-50, always above the overlay */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 ${
          scrolled ? "py-4" : "py-4"
        } ${isOpen ? "pointer-events-none md:pointer-events-auto" : ""}`}
        style={{
          background: scrolled ? "rgba(5, 8, 22, 0.75)" : "rgba(5, 8, 22, 0)",
          WebkitBackdropFilter: scrolled ? "blur(24px) saturate(180%)" : "blur(0px)",
          backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "blur(0px)",
          borderBottom: scrolled
            ? "1px solid rgba(255, 255, 255, 0.06)"
            : "1px solid rgba(255, 255, 255, 0)",
          transition:
            "background 0.4s ease, backdrop-filter 0.4s ease, -webkit-backdrop-filter 0.4s ease, border-color 0.4s ease, padding 0.3s ease",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* LOGO — hidden on mobile while overlay is open (overlay has its own) */}
          <button
            onClick={() => navigateToSection("#home")}
            className={`text-2xl font-bold tracking-tight transition-opacity duration-200 ${
              isOpen ? "opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto" : ""
            }`}
          >
            <span className="text-gradient">MK</span>
          </button>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => navigateToSection(link.href)}
                className={`
                  relative rounded-xl px-4 py-2 text-sm font-medium tracking-wide
                  transition-all duration-200
                  ${activeSection === link.href
                    ? "bg-white/10 text-white"
                    : "text-white/60 hover:text-white hover:bg-white/[0.05]"
                  }
                `}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* DESKTOP CTA */}
          <div className="hidden md:flex">
            <button
              onClick={() => navigateToSection("#contact")}
              className="
                relative inline-flex h-10 items-center justify-center rounded-xl px-6
                font-semibold text-white text-sm tracking-wide
                transition-all duration-300 hover:scale-105 active:scale-95
              "
              style={{
                background: "linear-gradient(135deg, #06b6d4 0%, #8b5cf6 55%, #3b82f6 100%)",
                boxShadow: "0 0 20px rgba(139,92,246,0.4), 0 0 40px rgba(6,182,212,0.15)",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow =
                  "0 0 28px rgba(139,92,246,0.6), 0 0 56px rgba(6,182,212,0.25)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow =
                  "0 0 20px rgba(139,92,246,0.4), 0 0 40px rgba(6,182,212,0.15)";
              }}
            >
              Hire Me
            </button>
          </div>

          {/* MOBILE HAMBURGER — hidden when overlay is open (overlay has its own X) */}
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
            className={`${
              isOpen ? "hidden" : "md:hidden"
            } relative z-[60] text-white p-2 transition-opacity duration-200 hover:opacity-70`}
          >
            <Menu size={24} />
          </button>
        </div>
      </motion.nav>
    </>
  );
}