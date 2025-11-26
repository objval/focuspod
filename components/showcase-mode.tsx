"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  X,
  Presentation,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

// Define the sections to scroll through
const sections = [
  { id: "inicio", label: "Hero", duration: 8000 },
  { id: "beneficios", label: "Beneficios", duration: 7000 },
  { id: "precios", label: "Precios", duration: 7000 },
  { id: "testimonios", label: "Testimonios", duration: 7000 },
  { id: "blog", label: "Blog", duration: 6000 },
  { id: "nosotros", label: "Nosotros", duration: 7000 },
  { id: "ubicacion", label: "Ubicación", duration: 7000 },
  { id: "faq", label: "FAQ", duration: 7000 },
  { id: "cta", label: "CTA Final", duration: 7000 },
];

// Royalty-free zen/meditation music URL (calm, ADHD-friendly)
const AMBIENT_MUSIC_URL = "https://cdn.pixabay.com/audio/2022/03/10/audio_d65d6a5a0e.mp3";

export function ShowcaseMode() {
  const [isActive, setIsActive] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentSection, setCurrentSection] = React.useState(0);
  const [isMuted, setIsMuted] = React.useState(false);
  const [volume, setVolume] = React.useState(30);
  const [showControls, setShowControls] = React.useState(true);
  const [progress, setProgress] = React.useState(0);
  
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);
  const progressRef = React.useRef<NodeJS.Timeout | null>(null);

  // Initialize audio
  React.useEffect(() => {
    audioRef.current = new Audio(AMBIENT_MUSIC_URL);
    audioRef.current.loop = true;
    audioRef.current.volume = volume / 100;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Update volume
  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  // Scroll to section
  const scrollToSection = React.useCallback((index: number) => {
    const section = sections[index];
    if (section) {
      const element = document.getElementById(section.id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, []);

  // Start progress animation
  const startProgress = React.useCallback((duration: number) => {
    setProgress(0);
    const interval = 50; // Update every 50ms
    const increment = (interval / duration) * 100;
    
    if (progressRef.current) clearInterval(progressRef.current);
    
    progressRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 100;
        }
        return prev + increment;
      });
    }, interval);
  }, []);

  // Auto-advance logic
  React.useEffect(() => {
    if (isPlaying && isActive) {
      const currentDuration = sections[currentSection]?.duration || 5000;
      startProgress(currentDuration);

      timerRef.current = setTimeout(() => {
        if (currentSection < sections.length - 1) {
          setCurrentSection((prev) => prev + 1);
          scrollToSection(currentSection + 1);
        } else {
          // Loop back to start
          setCurrentSection(0);
          scrollToSection(0);
        }
      }, currentDuration);

      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
        if (progressRef.current) clearInterval(progressRef.current);
      };
    }
  }, [isPlaying, isActive, currentSection, scrollToSection, startProgress]);

  // Start showcase
  const startShowcase = () => {
    setIsActive(true);
    setIsPlaying(true);
    setCurrentSection(0);
    scrollToSection(0);
    
    if (audioRef.current) {
      audioRef.current.play().catch(console.error);
    }
  };

  // Stop showcase
  const stopShowcase = () => {
    setIsActive(false);
    setIsPlaying(false);
    setCurrentSection(0);
    setProgress(0);
    
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (timerRef.current) clearTimeout(timerRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
  };

  // Toggle play/pause
  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (audioRef.current) audioRef.current.pause();
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    } else {
      setIsPlaying(true);
      if (audioRef.current) audioRef.current.play().catch(console.error);
    }
  };

  // Navigate sections
  const goToPrevious = () => {
    const newIndex = Math.max(0, currentSection - 1);
    setCurrentSection(newIndex);
    scrollToSection(newIndex);
    setProgress(0);
    if (timerRef.current) clearTimeout(timerRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
  };

  const goToNext = () => {
    const newIndex = Math.min(sections.length - 1, currentSection + 1);
    setCurrentSection(newIndex);
    scrollToSection(newIndex);
    setProgress(0);
    if (timerRef.current) clearTimeout(timerRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
  };

  const goToSection = (index: number) => {
    setCurrentSection(index);
    scrollToSection(index);
    setProgress(0);
    if (timerRef.current) clearTimeout(timerRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
  };

  return (
    <>
      {/* Floating Start Button (when not active) */}
      <AnimatePresence>
        {!isActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-6 left-6 z-40"
          >
            <Button
              onClick={startShowcase}
              size="sm"
              className="gap-2 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/50 transition-all duration-300 hover:scale-105"
            >
              <Presentation className="h-4 w-4" />
              <span className="hidden sm:inline">Modo Presentación</span>
              <span className="sm:hidden">Demo</span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Showcase Controls Panel */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50"
          >
            {/* Toggle Controls Button */}
            <div className="flex justify-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowControls(!showControls)}
                className="rounded-b-none bg-card/90 backdrop-blur-lg border border-b-0 border-border/50"
              >
                {showControls ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronUp className="h-4 w-4" />
                )}
              </Button>
            </div>

            {/* Main Controls */}
            <AnimatePresence>
              {showControls && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-card/95 backdrop-blur-lg border-t border-border/50 shadow-2xl"
                >
                  {/* Progress Bar */}
                  <div className="h-1 bg-muted">
                    <motion.div
                      className="h-full bg-primary"
                      style={{ width: `${progress}%` }}
                      transition={{ duration: 0.05 }}
                    />
                  </div>

                  <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between gap-4">
                      {/* Section Navigation */}
                      <div className="hidden md:flex items-center gap-1 flex-1">
                        {sections.map((section, index) => (
                          <button
                            key={section.id}
                            onClick={() => goToSection(index)}
                            className={cn(
                              "px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-300",
                              currentSection === index
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted hover:bg-muted/80 text-muted-foreground"
                            )}
                          >
                            {section.label}
                          </button>
                        ))}
                      </div>

                      {/* Mobile Section Indicator */}
                      <div className="md:hidden text-sm font-medium">
                        {sections[currentSection]?.label} ({currentSection + 1}/{sections.length})
                      </div>

                      {/* Playback Controls */}
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={goToPrevious}
                          disabled={currentSection === 0}
                        >
                          <SkipBack className="h-4 w-4" />
                        </Button>

                        <Button
                          variant="default"
                          size="icon"
                          onClick={togglePlay}
                          className="h-12 w-12 rounded-full"
                        >
                          {isPlaying ? (
                            <Pause className="h-5 w-5" />
                          ) : (
                            <Play className="h-5 w-5 ml-0.5" />
                          )}
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={goToNext}
                          disabled={currentSection === sections.length - 1}
                        >
                          <SkipForward className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Volume Controls */}
                      <div className="hidden sm:flex items-center gap-2 flex-1 justify-end">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setIsMuted(!isMuted)}
                        >
                          {isMuted ? (
                            <VolumeX className="h-4 w-4" />
                          ) : (
                            <Volume2 className="h-4 w-4" />
                          )}
                        </Button>
                        <Slider
                          value={[isMuted ? 0 : volume]}
                          onValueChange={(value) => {
                            setVolume(value[0]);
                            if (value[0] > 0) setIsMuted(false);
                          }}
                          max={100}
                          step={1}
                          className="w-24"
                        />
                      </div>

                      {/* Close Button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={stopShowcase}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Vignette Effect when active */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-40"
            style={{
              boxShadow: "inset 0 0 150px 50px rgba(0,0,0,0.3)",
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
