"use client";

import * as React from "react";
import {
  Headphones,
  Menu,
  Home,
  Sparkles,
  CreditCard,
  MessageSquare,
  MapPin,
  HelpCircle,
  X,
  Zap,
  ArrowRight,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/constants";

const iconMap = {
  Home,
  Sparkles,
  CreditCard,
  MessageSquare,
  MapPin,
  HelpCircle,
} as const;

function smoothScrollTo(targetId: string) {
  const element = document.getElementById(targetId.replace("#", ""));
  if (!element) return;
  const headerOffset = 100;
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.scrollY - headerOffset;
  window.scrollTo({ top: offsetPosition, behavior: "smooth" });
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, index: number) => {
    e.preventDefault();
    setActiveIndex(index);
    smoothScrollTo(href);
    setIsMobileOpen(false);
  };

  // Scroll listener for active section detection
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = NAV_LINKS.map((link) => link.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveIndex(i);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  React.useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
        isScrolled ? "py-2" : "py-4"
      )}
    >
      <div className="max-w-5xl mx-auto px-4">
        <nav
          className={cn(
            "relative flex items-center justify-between rounded-full px-3 md:px-5 py-2 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
            isScrolled
              ? "bg-card/90 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/20"
              : "bg-card/50 backdrop-blur-xl border border-white/5"
          )}
        >
          {/* Logo */}
          <a
            href="#inicio"
            onClick={(e) => handleNavClick(e, "#inicio", 0)}
            className="flex items-center gap-2.5 group relative z-10 pl-1"
          >
            <div className="relative bg-gradient-to-br from-primary to-primary/80 p-2 rounded-full shadow-lg shadow-primary/30 transition-all duration-300 group-hover:shadow-primary/50 group-hover:scale-110 group-active:scale-95">
              <Headphones className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-black tracking-tight hidden sm:block">
              Study<span className="text-primary">Spot</span>
            </span>
          </a>

          {/* Desktop Navigation - Pill Style */}
          <div className="hidden lg:flex items-center">
            <div className="relative flex items-center gap-0.5 bg-white/5 rounded-full p-1 border border-white/10">
              {NAV_LINKS.map((link, index) => {
                const Icon = iconMap[link.icon as keyof typeof iconMap];
                const isActive = activeIndex === index;

                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href, index)}
                    className={cn(
                      "relative flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-300 ease-out",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/10"
                    )}
                  >
                    <Icon className="h-3 w-3" />
                    <span>{link.label}</span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* CTA Button */}
            <a
              href="#precios"
              onClick={(e) =>
                handleNavClick(
                  e,
                  "#precios",
                  NAV_LINKS.findIndex((l) => l.href === "#precios")
                )
              }
              className="hidden sm:flex items-center gap-1.5 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-4 py-1.5 rounded-full text-xs font-semibold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/50 transition-all duration-300 hover:scale-105 active:scale-95 group"
            >
              <Zap className="h-3.5 w-3.5" />
              <span>Reservar</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden flex items-center justify-center h-9 w-9 rounded-full text-foreground bg-white/10 hover:bg-white/20 transition-all duration-300 active:scale-90"
              aria-label="Toggle menu"
            >
              <div className="relative w-4 h-4">
                <span className={cn(
                  "absolute left-0 w-4 h-0.5 bg-current rounded-full transition-all duration-300",
                  isMobileOpen ? "top-2 rotate-45" : "top-0.5"
                )} />
                <span className={cn(
                  "absolute left-0 top-2 w-4 h-0.5 bg-current rounded-full transition-all duration-300",
                  isMobileOpen ? "opacity-0 scale-0" : "opacity-100"
                )} />
                <span className={cn(
                  "absolute left-0 w-4 h-0.5 bg-current rounded-full transition-all duration-300",
                  isMobileOpen ? "top-2 -rotate-45" : "top-3.5"
                )} />
              </div>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/80 backdrop-blur-xl z-40 lg:hidden transition-all duration-500",
          isMobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsMobileOpen(false)}
      />

      {/* Mobile Menu Content */}
      <div
        className={cn(
          "fixed top-24 left-4 right-4 z-50 lg:hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
          isMobileOpen
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 -translate-y-8 scale-95 pointer-events-none"
        )}
      >
        <div className="bg-card/95 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl shadow-black/50 p-4 space-y-1">
          {NAV_LINKS.map((link, index) => {
            const Icon = iconMap[link.icon as keyof typeof iconMap];
            const isActive = activeIndex === index;

            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href, index)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 font-medium",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/10"
                )}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                <span>{link.label}</span>
              </a>
            );
          })}

          <div className="pt-3 mt-2 border-t border-white/10">
            {/* CTA Button */}
            <a
              href="#precios"
              onClick={(e) =>
                handleNavClick(
                  e,
                  "#precios",
                  NAV_LINKS.findIndex((l) => l.href === "#precios")
                )
              }
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-6 py-3.5 rounded-2xl font-semibold shadow-lg shadow-primary/30 active:scale-[0.98] transition-all duration-300"
            >
              <Zap className="h-5 w-5" />
              <span>Reservar Ahora</span>
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
