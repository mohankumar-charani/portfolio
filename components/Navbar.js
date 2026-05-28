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
            className="fixed inset-0 z-40 md:hidden"
            style={{
              /* Reliable dark background that works on ALL real devices */
              backgroundColor: "rgba(4, 6, 18, 0.92)",
              /* Blur only where supported (Chrome 76+, Safari 14+) */
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
              backdropFilter: "blur(20px) saturate(180%)",
              /* GPU layer promotion — prevents blur drops on Android Chrome */
              willChange: "opacity",
              transform: "translateZ(0)",
              backfaceVisibility: "hidden",
              isolation: "isolate",
            }}
          >
            {/* Inner glass card keeps content readable even when blur unsupported */}
            <div className="flex flex-col h-full px-6 pt-24 pb-10">
              <div className="flex-1 flex items-center justify-center">
                <div className="w-full max-w-sm space-y-3">
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
                        transition-all duration-300
                        border
                        ${activeSection === link.href
                          ? "bg-white/10 text-white border-white/20 shadow-[0_0_24px_rgba(59,130,246,0.2)]"
                          : "text-white/70 border-white/[0.06] hover:bg-white/[0.06] hover:text-white"
                        }
                      `}
                    >
                      {link.name}
                    </motion.button>
                  ))}

                  {/* Divider */}
                  <div className="h-px w-full bg-white/[0.06] my-2" />

                  {/* CTA */}
                  <motion.button
                    custom={navLinks.length}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onClick={() => navigateToSection("#contact")}
                    className="
                      w-full rounded-2xl py-4 text-lg font-semibold text-white
                      bg-gradient-to-r from-blue-500 to-violet-500
                      shadow-[0_0_30px_rgba(99,102,241,0.4)]
                      hover:shadow-[0_0_40px_rgba(99,102,241,0.6)]
                      transition-all duration-300
                    "
                  >
                    Hire Me
                  </motion.button>
                </div>
              </div>
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
        }`}
        style={scrolled ? {
          background: "rgba(5, 8, 22, 0.7)",
          WebkitBackdropFilter: "blur(24px)",
          backdropFilter: "blur(24px)",
        } : {}}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* LOGO */}
          <button
            onClick={() => navigateToSection("#home")}
            className="text-2xl font-bold tracking-tight"
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
              className="glow-border relative inline-flex h-10 items-center justify-center rounded-lg bg-secondary px-6 font-medium text-white transition-transform hover:scale-105"
            >
              Hire Me
            </button>
          </div>

          {/* MOBILE HAMBURGER — z-[60] so it floats above the overlay */}
          <button
            onClick={() => {
              if (isOpen) {
                handleCloseMenu();
              } else {
                setIsOpen(true);
              }
            }}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="
              md:hidden relative z-[60]
              text-white rounded-xl p-2
              transition-colors duration-200
            "
            style={{
              background: isOpen ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="block"
                >
                  <X size={24} />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="block"
                >
                  <Menu size={24} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>
    </>
  );
}