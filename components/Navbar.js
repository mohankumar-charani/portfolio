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
  // ACTIVE SECTION DETECTION
  // ----------------------------------------

  useEffect(() => {
    const sections = navLinks.map((link) =>
      document.querySelector(link.href)
    );

    const observer = new IntersectionObserver(
      (entries) => {
        if (isAnimatingRef.current) return;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      {
        threshold: 0.45,
        rootMargin: "-20% 0px -55% 0px",
      }
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
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
    scrollYRef.current = window.scrollY;

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

    window.scrollTo({
      top: scrollYRef.current,
      behavior: "instant",
    });
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
      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
            ? "py-4 bg-[#050816]/60 backdrop-blur-2xl border-b border-white/[0.06]"
            : "py-6 bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* LOGO */}
          <button
            onClick={() => navigateToSection("#home")}
            className="text-2xl font-bold tracking-tight text-white"
          >
            MK
          </button>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => navigateToSection(link.href)}
                className={`
                relative overflow-hidden rounded-2xl
                px-5 py-3
                text-[15px] font-medium tracking-wide
                transition-all duration-300
                backdrop-blur-xl
                border border-white/[0.04]
                ${activeSection === link.href
                    ? "bg-white/[0.08] text-white shadow-[0_0_30px_rgba(59,130,246,0.15)]"
                    : "text-white/65 hover:text-white hover:bg-white/[0.04]"
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
              rounded-2xl
              px-6 py-3
              font-medium
              text-white
              bg-gradient-to-r
              from-blue-500
              to-violet-500
              shadow-[0_0_30px_rgba(59,130,246,0.35)]
              transition-all duration-300
              hover:scale-105
            "
            >
              Hire Me
            </button>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => {
              if (isOpen) {
                handleCloseMenu();
              } else {
                setIsOpen(true);
              }
            }}
            className="
            md:hidden
            relative z-[60]
            text-white
            rounded-xl
            p-2
            bg-white/[0.04]
            border border-white/[0.06]
            backdrop-blur-xl
          "
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </motion.nav>

      {/* MOBILE MENU */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="
            fixed inset-0 z-40 md:hidden
            bg-[#050816]/70
            supports-[backdrop-filter]:bg-[#050816]/45
            backdrop-blur-3xl
          "
            style={{
              WebkitBackdropFilter: "blur(28px)",
              willChange: "opacity",
              transform: "translateZ(0)",
              backfaceVisibility: "hidden",
            }}
          >
            <div className="flex items-center justify-center h-full px-6">
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
                    w-full
                    rounded-2xl
                    px-6 py-4
                    text-center
                    text-lg
                    font-medium
                    transition-all duration-300
                    border border-white/[0.05]
                    backdrop-blur-xl
                    ${activeSection === link.href
                        ? "bg-white/[0.08] text-white shadow-[0_0_30px_rgba(59,130,246,0.15)]"
                        : "text-white/70 hover:bg-white/[0.05] hover:text-white"
                      }
                  `}
                  >
                    {link.name}
                  </motion.button>
                ))}

                {/* CTA */}
                <motion.button
                  custom={navLinks.length}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onClick={() => navigateToSection("#contact")}
                  className="
                  mt-5
                  w-full
                  rounded-2xl
                  py-4
                  text-lg
                  font-medium
                  text-white
                  bg-gradient-to-r
                  from-blue-500
                  to-violet-500
                  shadow-[0_0_30px_rgba(59,130,246,0.35)]
                "
                >
                  Hire Me
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}