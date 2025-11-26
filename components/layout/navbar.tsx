"use client";

import * as React from "react";
import {
  Headphones,
  Home,
  Sparkles,
  CreditCard,
  MessageSquare,
  MapPin,
  HelpCircle,
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

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    index: number
  ) => {
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
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Background bar that spans full width */}
      <div
        className={cn(
          "absolute inset-x-0 top-0 transition-all duration-300",
          isScrolled
            ? "h-16 bg-background/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/10"
            : "h-20 bg-transparent"
        )}
      />

      {/* Nav content */}
      <div className="relative max-w-7xl mx-auto px-6">
        <nav
          className={cn(
            "flex items-center justify-between transition-all duration-300",
            isScrolled ? "h-16" : "h-20"
          )}
        >
          {/* Logo */}
          <a
            href="#inicio"
            onClick={(e) => handleNavClick(e, "#inicio", 0)}
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/30 rounded-xl blur-lg group-hover:bg-primary/50 transition-all duration-300" />
              <div className="relative bg-gradient-to-br from-primary to-primary/70 p-2.5 rounded-xl shadow-lg transition-all duration-300 group-hover:scale-105 group-active:scale-95">
                <Headphones className="h-6 w-6 text-primary-foreground" />
              </div>
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-black tracking-tight">
                Focus<span className="text-primary">Pod</span>
              </span>
              <p className="text-[10px] text-muted-foreground -mt-0.5 tracking-wide">
                Cápsulas de Estudio
              </p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link, index) => {
              const Icon = iconMap[link.icon as keyof typeof iconMap];
              const isActive = activeIndex === index;

              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, index)}
                  className={cn(
                    "relative flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{link.label}</span>
                  {/* Active indicator */}
                  <span
                    className={cn(
                      "absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-primary rounded-full transition-all duration-300",
                      isActive ? "w-6 opacity-100" : "w-0 opacity-0"
                    )}
                  />
                </a>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
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
              className="hidden sm:flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 hover:bg-primary/90 transition-all duration-300 group"
            >
              <Zap className="h-4 w-4" />
              <span>Reservar</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden flex flex-col items-center justify-center gap-1.5 h-10 w-10 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300"
              aria-label="Toggle menu"
            >
              <span
                className={cn(
                  "w-5 h-0.5 bg-foreground rounded-full transition-all duration-300 origin-center",
                  isMobileOpen && "rotate-45 translate-y-2"
                )}
              />
              <span
                className={cn(
                  "w-5 h-0.5 bg-foreground rounded-full transition-all duration-300",
                  isMobileOpen && "opacity-0 scale-0"
                )}
              />
              <span
                className={cn(
                  "w-5 h-0.5 bg-foreground rounded-full transition-all duration-300 origin-center",
                  isMobileOpen && "-rotate-45 -translate-y-2"
                )}
              />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden transition-all duration-300",
          isMobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={cn(
            "absolute top-20 left-4 right-4 bg-card border border-white/10 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300",
            isMobileOpen
              ? "translate-y-0 scale-100"
              : "-translate-y-4 scale-95"
          )}
        >
          <div className="p-3 space-y-1">
            {NAV_LINKS.map((link, index) => {
              const Icon = iconMap[link.icon as keyof typeof iconMap];
              const isActive = activeIndex === index;

              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, index)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{link.label}</span>
                </a>
              );
            })}
          </div>

          <div className="p-3 pt-0">
            <a
              href="#precios"
              onClick={(e) =>
                handleNavClick(
                  e,
                  "#precios",
                  NAV_LINKS.findIndex((l) => l.href === "#precios")
                )
              }
              className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold"
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
