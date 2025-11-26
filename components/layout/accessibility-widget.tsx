"use client";

import * as React from "react";
import {
  Accessibility,
  ZoomIn,
  ZoomOut,
  Type,
  Pause,
  RotateCcw,
  X,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AccessibilitySettings {
  fontSize: number; // 100 = default
  reducedMotion: boolean;
  highContrast: boolean;
}

const defaultSettings: AccessibilitySettings = {
  fontSize: 100,
  reducedMotion: false,
  highContrast: false,
};

export function AccessibilityWidget() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [settings, setSettings] = React.useState<AccessibilitySettings>(defaultSettings);

  // Load settings from localStorage on mount
  React.useEffect(() => {
    const saved = localStorage.getItem("accessibility-settings");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSettings(parsed);
        applySettings(parsed);
      } catch (e) {
        console.error("Failed to parse accessibility settings");
      }
    }
  }, []);

  // Apply settings to document
  const applySettings = (newSettings: AccessibilitySettings) => {
    const root = document.documentElement;
    
    // Font size
    root.style.fontSize = `${newSettings.fontSize}%`;
    
    // Reduced motion
    if (newSettings.reducedMotion) {
      root.classList.add("reduce-motion");
    } else {
      root.classList.remove("reduce-motion");
    }
    
    // High contrast
    if (newSettings.highContrast) {
      root.classList.add("high-contrast");
    } else {
      root.classList.remove("high-contrast");
    }
  };

  // Update settings
  const updateSettings = (newSettings: AccessibilitySettings) => {
    setSettings(newSettings);
    applySettings(newSettings);
    localStorage.setItem("accessibility-settings", JSON.stringify(newSettings));
  };

  const increaseFontSize = () => {
    if (settings.fontSize < 150) {
      updateSettings({ ...settings, fontSize: settings.fontSize + 10 });
    }
  };

  const decreaseFontSize = () => {
    if (settings.fontSize > 80) {
      updateSettings({ ...settings, fontSize: settings.fontSize - 10 });
    }
  };

  const toggleReducedMotion = () => {
    updateSettings({ ...settings, reducedMotion: !settings.reducedMotion });
  };

  const toggleHighContrast = () => {
    updateSettings({ ...settings, highContrast: !settings.highContrast });
  };

  const resetSettings = () => {
    updateSettings(defaultSettings);
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-20 left-6 z-40 h-11 w-11 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg",
          isOpen
            ? "bg-primary text-primary-foreground shadow-primary/30"
            : "bg-card/90 backdrop-blur-xl border border-white/10 text-muted-foreground hover:text-foreground hover:bg-card"
        )}
        aria-label="Accessibility options"
      >
        <Accessibility className="h-5 w-5" />
      </button>

      {/* Panel */}
      <div
        className={cn(
          "fixed bottom-20 left-20 z-40 w-72 bg-card/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl transition-all duration-300 overflow-hidden",
          isOpen
            ? "opacity-100 translate-x-0 scale-100"
            : "opacity-0 -translate-x-4 scale-95 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Accessibility className="h-4 w-4 text-primary" />
            <span className="font-semibold text-sm">Accesibilidad</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="h-7 w-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Font Size */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <Type className="h-4 w-4 text-muted-foreground" />
                <span>Tamaño de texto</span>
              </div>
              <span className="text-xs text-muted-foreground">{settings.fontSize}%</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={decreaseFontSize}
                disabled={settings.fontSize <= 80}
                className="flex-1 h-9 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5 flex items-center justify-center transition-colors"
              >
                <ZoomOut className="h-4 w-4" />
              </button>
              <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-200"
                  style={{ width: `${((settings.fontSize - 80) / 70) * 100}%` }}
                />
              </div>
              <button
                onClick={increaseFontSize}
                disabled={settings.fontSize >= 150}
                className="flex-1 h-9 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5 flex items-center justify-center transition-colors"
              >
                <ZoomIn className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Toggles */}
          <div className="space-y-2">
            {/* Reduced Motion */}
            <button
              onClick={toggleReducedMotion}
              className={cn(
                "w-full flex items-center justify-between p-3 rounded-xl transition-all",
                settings.reducedMotion
                  ? "bg-primary/20 border border-primary/30"
                  : "bg-white/5 hover:bg-white/10"
              )}
            >
              <div className="flex items-center gap-2 text-sm">
                <Pause className="h-4 w-4" />
                <span>Reducir movimiento</span>
              </div>
              <div className={cn(
                "w-10 h-6 rounded-full p-1 transition-colors",
                settings.reducedMotion ? "bg-primary" : "bg-white/20"
              )}>
                <div className={cn(
                  "w-4 h-4 rounded-full bg-white transition-transform",
                  settings.reducedMotion ? "translate-x-4" : "translate-x-0"
                )} />
              </div>
            </button>

            {/* High Contrast */}
            <button
              onClick={toggleHighContrast}
              className={cn(
                "w-full flex items-center justify-between p-3 rounded-xl transition-all",
                settings.highContrast
                  ? "bg-primary/20 border border-primary/30"
                  : "bg-white/5 hover:bg-white/10"
              )}
            >
              <div className="flex items-center gap-2 text-sm">
                <Eye className="h-4 w-4" />
                <span>Alto contraste</span>
              </div>
              <div className={cn(
                "w-10 h-6 rounded-full p-1 transition-colors",
                settings.highContrast ? "bg-primary" : "bg-white/20"
              )}>
                <div className={cn(
                  "w-4 h-4 rounded-full bg-white transition-transform",
                  settings.highContrast ? "translate-x-4" : "translate-x-0"
                )} />
              </div>
            </button>
          </div>

          {/* Reset */}
          <button
            onClick={resetSettings}
            className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Restablecer</span>
          </button>
        </div>
      </div>
    </>
  );
}
