"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { HiDocumentText, HiMenu, HiX } from "react-icons/hi";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#precios", label: "Precios" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          <Link href="/" className="flex items-center gap-2 text-primary-deep font-semibold text-xl">
            <HiDocumentText className="w-8 h-8 text-primary-sky" />
            <span>Facturalo</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-primary-deep font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#descargar"
              className="inline-flex items-center px-5 py-2.5 rounded-lg bg-accent-green text-white font-semibold hover:bg-accent-green-hover transition-all hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
            >
              Descargar gratis
            </Link>
          </div>

          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Menú"
          >
            {mobileOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
          </button>
        </div>

        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-gray-100"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-600 hover:text-primary-deep font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="#descargar"
                className="inline-flex justify-center items-center px-5 py-2.5 rounded-lg bg-accent-green text-white font-semibold"
                onClick={() => setMobileOpen(false)}
              >
                Descargar gratis
              </Link>
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
}
