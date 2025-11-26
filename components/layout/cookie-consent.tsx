"use client";

import * as React from "react";
import { Cookie, X, Settings, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export function CookieConsent() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [showSettings, setShowSettings] = React.useState(false);
  const [preferences, setPreferences] = React.useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  // Check if consent was already given
  React.useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Delay showing the banner for better UX
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    const allAccepted = { necessary: true, analytics: true, marketing: true };
    localStorage.setItem("cookie-consent", JSON.stringify(allAccepted));
    setIsVisible(false);
  };

  const acceptSelected = () => {
    localStorage.setItem("cookie-consent", JSON.stringify(preferences));
    setIsVisible(false);
  };

  const rejectAll = () => {
    const onlyNecessary = { necessary: true, analytics: false, marketing: false };
    localStorage.setItem("cookie-consent", JSON.stringify(onlyNecessary));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 p-4 transition-all duration-500",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      )}
    >
      <div className="max-w-4xl mx-auto">
        <div className="bg-card/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
          {/* Main Banner */}
          <div className="p-5">
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="hidden sm:flex h-12 w-12 rounded-xl bg-primary/20 items-center justify-center flex-shrink-0">
                <Cookie className="h-6 w-6 text-primary" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-base mb-1">🍪 Usamos cookies</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Utilizamos cookies para mejorar tu experiencia en nuestro sitio. 
                  Puedes aceptar todas, personalizar tus preferencias o rechazar las no esenciales.
                </p>

                {/* Settings Panel */}
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300",
                    showSettings ? "max-h-64 mt-4" : "max-h-0"
                  )}
                >
                  <div className="space-y-3 p-4 bg-white/5 rounded-xl">
                    {/* Necessary */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium">Necesarias</div>
                        <div className="text-xs text-muted-foreground">Esenciales para el funcionamiento</div>
                      </div>
                      <div className="h-6 w-10 rounded-full bg-primary p-1 cursor-not-allowed opacity-70">
                        <div className="w-4 h-4 rounded-full bg-white translate-x-4" />
                      </div>
                    </div>

                    {/* Analytics */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium">Analíticas</div>
                        <div className="text-xs text-muted-foreground">Nos ayudan a mejorar</div>
                      </div>
                      <button
                        onClick={() => setPreferences(p => ({ ...p, analytics: !p.analytics }))}
                        className={cn(
                          "h-6 w-10 rounded-full p-1 transition-colors",
                          preferences.analytics ? "bg-primary" : "bg-white/20"
                        )}
                      >
                        <div className={cn(
                          "w-4 h-4 rounded-full bg-white transition-transform",
                          preferences.analytics ? "translate-x-4" : "translate-x-0"
                        )} />
                      </button>
                    </div>

                    {/* Marketing */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium">Marketing</div>
                        <div className="text-xs text-muted-foreground">Anuncios personalizados</div>
                      </div>
                      <button
                        onClick={() => setPreferences(p => ({ ...p, marketing: !p.marketing }))}
                        className={cn(
                          "h-6 w-10 rounded-full p-1 transition-colors",
                          preferences.marketing ? "bg-primary" : "bg-white/20"
                        )}
                      >
                        <div className={cn(
                          "w-4 h-4 rounded-full bg-white transition-transform",
                          preferences.marketing ? "translate-x-4" : "translate-x-0"
                        )} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Close button */}
              <button
                onClick={rejectAll}
                className="h-8 w-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors flex-shrink-0"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-2 mt-4 sm:ml-16">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
              >
                <Settings className="h-4 w-4" />
                <span>{showSettings ? "Ocultar" : "Personalizar"}</span>
              </button>

              <button
                onClick={rejectAll}
                className="px-4 py-2 rounded-xl text-sm font-medium bg-white/5 hover:bg-white/10 transition-colors"
              >
                Solo necesarias
              </button>

              {showSettings ? (
                <button
                  onClick={acceptSelected}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-sm font-semibold bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all"
                >
                  <Check className="h-4 w-4" />
                  <span>Guardar preferencias</span>
                </button>
              ) : (
                <button
                  onClick={acceptAll}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-sm font-semibold bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all"
                >
                  <Check className="h-4 w-4" />
                  <span>Aceptar todas</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
