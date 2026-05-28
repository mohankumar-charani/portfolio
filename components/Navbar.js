"use client";

import {
  useState,
  useEffect,
  useMemo,
  useRef,
} from "react";

import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

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
      { name: "Home", href: "#home" },
      { name: "About", href: "#about" },
      { name: "Skills", href: "#skills" },
      { name: "Services", href: "#services" },
      { name: "Projects", href: "#projects" },
      { name: "Pricing", href: "#pricing" },
      { name: "Contact", href: "#contact" },
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
            className="fixed inset-0 z-40 md:hidden flex flex-col"
            style={{
              backgroundColor: "rgba(4, 6, 18, 0.96)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
              backdropFilter: "blur(20px) saturate(180%)",
              willChange: "opacity",
              transform: "translateZ(0)",
              backfaceVisibility: "hidden",
              isolation: "isolate",
            }}
          >
            {/* ── Top bar: logo left, close button right ── */}
            <div className="flex items-center justify-between px-6 py-5 shrink-0"
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
                className="text-white rounded-xl p-2 transition-colors duration-200"
                style={{
                  background: "rgba(255,255,255,0.10)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                <motion.span
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ duration: 0.18 }}
                  className="block"
                >
                  <X size={22} />
                </motion.span>
              </button>
            </div>

            {/* ── Scrollable nav items ── */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <div className="flex flex-col gap-3 w-full">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.href}
                    custom={i}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onClick={() => navigateToSection(link.href)}
                    className={`
                      w-full rounded-2xl px-6 py-4 text-center text-lg font-medium
                      transition-all duration-300 border
                      ${activeSection === link.href
                        ? "bg-white/10 text-white border-white/20 shadow-[0_0_24px_rgba(59,130,246,0.2)]"
                        : "text-white/70 border-white/[0.06] hover:bg-white/[0.06] hover:text-white"
                      }
                    `}
                  >
                    {link.name}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* ── Fixed bottom CTA ── */}
            <div className="shrink-0 px-6 pb-8 pt-4"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              <motion.button
                custom={navLinks.length}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={() => navigateToSection("#contact")}
                className="
                  w-full rounded-2xl py-4 text-lg font-semibold text-white
                  transition-all duration-300
                "
                style={{
                  background: "linear-gradient(135deg, #06b6d4 0%, #8b5cf6 50%, #3b82f6 100%)",
                  boxShadow: "0 0 32px rgba(139,92,246,0.45), 0 0 64px rgba(6,182,212,0.15)",
                }}
              >
                Hire Me
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "py-4 border-b border-white/[0.06]"
            : "py-6 bg-transparent"
        } ${isOpen ? "pointer-events-none md:pointer-events-auto" : ""}`}
        style={scrolled ? {
          background: "rgba(5, 8, 22, 0.7)",
          WebkitBackdropFilter: "blur(24px)",
          backdropFilter: "blur(24px)",
        } : {}}
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
            } relative z-[60] text-white rounded-xl p-2 transition-colors duration-200`}
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <Menu size={24} />
          </button>
        </div>
      </motion.nav>
    </>
  );
}