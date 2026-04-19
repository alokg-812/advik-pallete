import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = [
  { href: "#home", label: "Home" },
  { href: "#gallery", label: "Gallery" },
  { href: "#about", label: "About" },
  { href: "#request", label: "Request" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="container">
        <nav className={`glass rounded-full px-5 py-3 flex items-center justify-between transition-all ${scrolled ? "glow-purple" : ""}`}>
          <a href="#home" className="flex items-center gap-2 group">
            <span className="w-8 h-8 rounded-full bg-gradient-hero animate-pulse-glow" />
            <span className="font-display font-bold text-lg tracking-tight">
              Advik.pallete<span className="text-gradient-cool">.art</span>
            </span>
          </a>

          <ul className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="px-4 py-2 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#request"
            className="hidden md:inline-flex px-5 py-2.5 rounded-full bg-gradient-hero text-white text-sm font-semibold hover:scale-105 transition-transform glow-pink"
          >
            Hire me ✨
          </a>

          <button
            className="md:hidden w-10 h-10 grid place-items-center rounded-full bg-white/5"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <div className="space-y-1.5">
              <span className={`block w-5 h-0.5 bg-foreground transition ${open ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block w-5 h-0.5 bg-foreground transition ${open ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-0.5 bg-foreground transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
            </div>
          </button>
        </nav>

        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden glass mt-3 rounded-3xl p-4 flex flex-col gap-1"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-2xl text-foreground hover:bg-white/5"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#request"
              onClick={() => setOpen(false)}
              className="mt-2 px-4 py-3 text-center rounded-2xl bg-gradient-hero text-white font-semibold"
            >
              Hire me ✨
            </a>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};
