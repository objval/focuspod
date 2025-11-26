"use client";

import * as React from "react";
import { MessageCircle, X, Phone, Mail, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/constants";

// WhatsApp icon component
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

interface ContactOption {
  id: string;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  href: string;
  color: string;
}

export function QuickContact() {
  const [isOpen, setIsOpen] = React.useState(false);

  const contactOptions: ContactOption[] = [
    {
      id: "whatsapp",
      label: "WhatsApp",
      sublabel: "Respuesta rápida",
      icon: <WhatsAppIcon className="h-5 w-5" />,
      href: `https://wa.me/${SITE_CONFIG.phone.replace(/\s/g, "").replace("+", "")}?text=Hola! Me interesa reservar una cápsula de estudio`,
      color: "bg-[#25D366] hover:bg-[#20BD5A]",
    },
    {
      id: "phone",
      label: "Llamar",
      sublabel: SITE_CONFIG.phone,
      icon: <Phone className="h-5 w-5" />,
      href: `tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`,
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      id: "email",
      label: "Email",
      sublabel: SITE_CONFIG.email,
      icon: <Mail className="h-5 w-5" />,
      href: `mailto:${SITE_CONFIG.email}?subject=Consulta sobre FocusPod`,
      color: "bg-orange-500 hover:bg-orange-600",
    },
  ];

  return (
    <>
      {/* Main Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-20 right-6 z-40 h-12 w-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg group",
          isOpen
            ? "bg-card border border-white/10 text-foreground rotate-0"
            : "bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white shadow-[#25D366]/30 hover:shadow-xl hover:shadow-[#25D366]/40 hover:scale-110"
        )}
        aria-label="Quick contact"
      >
        <div className="relative">
          <MessageCircle
            className={cn(
              "h-6 w-6 transition-all duration-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
              isOpen ? "opacity-0 scale-0 rotate-90" : "opacity-100 scale-100 rotate-0"
            )}
          />
          <X
            className={cn(
              "h-5 w-5 transition-all duration-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
              isOpen ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-0 -rotate-90"
            )}
          />
        </div>
        
        {/* Pulse ring when closed */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
        )}
      </button>

      {/* Contact Options */}
      <div
        className={cn(
          "fixed bottom-36 right-6 z-40 flex flex-col gap-2 transition-all duration-300",
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        )}
      >
        {contactOptions.map((option, index) => (
          <a
            key={option.id}
            href={option.href}
            target={option.id === "whatsapp" ? "_blank" : undefined}
            rel={option.id === "whatsapp" ? "noopener noreferrer" : undefined}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-2xl text-white shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-x-1",
              option.color
            )}
            style={{
              transitionDelay: isOpen ? `${index * 50}ms` : "0ms",
            }}
          >
            <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
              {option.icon}
            </div>
            <div className="text-left">
              <div className="font-semibold text-sm">{option.label}</div>
              <div className="text-xs text-white/80">{option.sublabel}</div>
            </div>
          </a>
        ))}
      </div>

      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-30 bg-black/20 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      />
    </>
  );
}
