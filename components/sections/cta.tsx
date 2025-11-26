"use client";

import * as React from "react";
import { motion, useMotionValue } from "framer-motion";
import { 
  ArrowRight, 
  Sparkles, 
  Zap, 
  Clock, 
  Trophy,
  MousePointer2,
  Volume2
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Enhanced floating particles component
function FloatingParticles() {
  const [particles, setParticles] = React.useState<Array<{
    id: number;
    size: number;
    x: number;
    y: number;
    duration: number;
    delay: number;
    type: string;
    xOffset: number;
  }>>([]);

  React.useEffect(() => {
    setParticles(
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        size: Math.random() * 6 + 2,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 15 + 10,
        delay: Math.random() * 5,
        type: Math.random() > 0.7 ? "glow" : "normal",
        xOffset: Math.random() * 20 - 10,
      }))
    );
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={cn(
            "absolute rounded-full",
            particle.type === "glow" 
              ? "bg-primary/40 shadow-lg shadow-primary/30" 
              : "bg-primary/20"
          )}
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, particle.xOffset, 0],
            opacity: [0.2, 0.9, 0.2],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Countdown timer component
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = React.useState({
    hours: 2,
    minutes: 34,
    seconds: 56,
  });

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-2 text-sm">
      <Clock className="h-4 w-4 text-primary" />
      <span className="text-muted-foreground">Oferta termina en:</span>
      <div className="flex gap-1 font-mono font-bold text-primary">
        <span className="bg-primary/10 px-2 py-1 rounded">
          {String(timeLeft.hours).padStart(2, "0")}
        </span>
        <span>:</span>
        <span className="bg-primary/10 px-2 py-1 rounded">
          {String(timeLeft.minutes).padStart(2, "0")}
        </span>
        <span>:</span>
        <span className="bg-primary/10 px-2 py-1 rounded">
          {String(timeLeft.seconds).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

// Magnetic button component
function MagneticButton({ children, className, ...props }: React.ComponentProps<typeof Button>) {
  const ref = React.useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.2);
    y.set((e.clientY - centerY) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div style={{ x, y }}>
      <Button
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={className}
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  );
}

// Achievement badges
const achievements = [
  { icon: Trophy, label: "+500 estudiantes", color: "text-yellow-500" },
  { icon: Zap, label: "4.9★ rating", color: "text-primary" },
  { icon: Volume2, label: "0dB garantizado", color: "text-cyan-500" },
];

export function CallToAction() {
  const [isHovered, setIsHovered] = React.useState(false);
  const [clickCount, setClickCount] = React.useState(0);

  const handleEasterEgg = () => {
    setClickCount((prev) => prev + 1);
  };

  return (
    <section id="cta" className="relative min-h-screen py-24 sm:py-32 overflow-hidden flex items-center">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-muted/30 to-muted/30" />
      
      {/* Floating Particles */}
      <FloatingParticles />
      
      {/* Interactive gradient orb that follows cursor intent */}
      <motion.div
        className="absolute w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl pointer-events-none"
        animate={{
          x: isHovered ? 50 : 0,
          y: isHovered ? -30 : 0,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ type: "spring", damping: 30 }}
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative p-8 sm:p-12 rounded-3xl bg-card/80 backdrop-blur-xl border border-border/50 shadow-2xl">
            {/* Content */}
            <div className="relative text-center">
                {/* Badge with pulse */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles className="h-4 w-4" />
                  </motion.div>
                  Empieza hoy mismo
                </motion.div>

                {/* Heading */}
                <h2 
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
                  onClick={handleEasterEgg}
                >
                  Tu próxima <span className="text-primary">sesión de estudio</span>
                  <br />
                  <span className="text-foreground">comienza aquí</span>
                </h2>

                {/* Easter egg */}
                {clickCount >= 5 && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-primary mb-4"
                  >
                    🎉 ¡Descubriste el easter egg! Usa código SECRETO para 10% off
                  </motion.p>
                )}

                {/* Description */}
                <p className="text-lg sm:text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Únete a cientos de estudiantes de Temuco que ya descubrieron el poder
                  de la concentración total.
                </p>

                {/* Countdown Timer */}
                <div className="flex justify-center mb-8">
                  <CountdownTimer />
                </div>

                {/* Interactive CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                  <MagneticButton
                    size="lg"
                    className="text-lg px-10 py-7 font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/50 transition-all duration-300 group relative overflow-hidden"
                  >
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.5 }}
                    />
                    <span className="relative flex items-center gap-2">
                      Reservar Mi Cápsula
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </MagneticButton>
                  
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="text-lg px-8 py-7 group"
                  >
                    <MousePointer2 className="h-4 w-4 mr-2 transition-transform group-hover:rotate-12" />
                    Ver Demo Interactivo
                  </Button>
                </div>

                {/* Achievement Badges */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="flex flex-wrap justify-center gap-4"
                >
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border/50"
                    >
                      <achievement.icon className={cn("h-4 w-4", achievement.color)} />
                      <span className="text-sm font-medium">{achievement.label}</span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Social Proof Avatars */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="mt-8 flex items-center justify-center gap-4"
                >
                  <div className="flex -space-x-3">
                    {["JM", "SR", "CF", "MC", "NV"].map((initials, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 + i * 0.1 }}
                        whileHover={{ y: -4, zIndex: 10 }}
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/80 to-primary border-2 border-background flex items-center justify-center text-xs font-bold text-primary-foreground cursor-pointer"
                      >
                        {initials}
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">+500</span> estudiantes
                    reservaron esta semana
                  </p>
                </motion.div>
              </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
