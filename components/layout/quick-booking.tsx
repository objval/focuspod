"use client";

import * as React from "react";
import { Calendar, Clock, Users, ChevronRight, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const timeSlots = [
  "08:00", "09:00", "10:00", "11:00", "12:00", 
  "13:00", "14:00", "15:00", "16:00", "17:00", 
  "18:00", "19:00", "20:00", "21:00"
];

const durations = [
  { value: 1, label: "1 hora", price: 2500 },
  { value: 2, label: "2 horas", price: 4500 },
  { value: 4, label: "4 horas", price: 8000 },
  { value: 8, label: "Día completo", price: 14000 },
];

export function QuickBooking() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [step, setStep] = React.useState(1);
  const [selectedDate, setSelectedDate] = React.useState<string>("");
  const [selectedTime, setSelectedTime] = React.useState<string>("");
  const [selectedDuration, setSelectedDuration] = React.useState<number>(1);
  const [pods, setPods] = React.useState(1);

  // Generate next 7 days
  const dates = React.useMemo(() => {
    const result = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      result.push({
        value: date.toISOString().split("T")[0],
        day: date.toLocaleDateString("es-CL", { weekday: "short" }).slice(0, 2).toUpperCase(),
        date: date.getDate(),
        isToday: i === 0,
      });
    }
    return result;
  }, []);

  const selectedDurationObj = durations.find(d => d.value === selectedDuration);
  const totalPrice = (selectedDurationObj?.price || 0) * pods;

  const handleBook = () => {
    // In production, this would redirect to a booking system
    const bookingUrl = `https://wa.me/56912345678?text=${encodeURIComponent(
      `¡Hola! Quiero reservar ${pods} cápsula(s) para el ${selectedDate} a las ${selectedTime} por ${selectedDuration} hora(s). Total: $${totalPrice.toLocaleString("es-CL")} CLP`
    )}`;
    window.open(bookingUrl, "_blank");
    setIsOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setStep(1);
    setSelectedDate("");
    setSelectedTime("");
    setSelectedDuration(1);
    setPods(1);
  };

  const canProceed = () => {
    if (step === 1) return selectedDate !== "";
    if (step === 2) return selectedTime !== "";
    if (step === 3) return true;
    return false;
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed z-40 group",
          "bottom-36 right-6",
          "flex items-center gap-2 px-5 py-3",
          "bg-gradient-to-r from-primary via-primary to-primary/80",
          "text-primary-foreground font-semibold text-sm",
          "rounded-full shadow-lg shadow-primary/30",
          "hover:shadow-xl hover:shadow-primary/40 hover:scale-105",
          "transition-all duration-300",
          "border border-white/20"
        )}
      >
        <Sparkles className="h-4 w-4" />
        <span>Reserva Rápida</span>
        <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Booking Modal */}
      <div
        className={cn(
          "fixed inset-0 z-50 flex items-center justify-center p-4",
          "transition-all duration-300",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => { setIsOpen(false); resetForm(); }}
        />

        {/* Modal */}
        <div className={cn(
          "relative w-full max-w-md bg-card border border-white/10 rounded-2xl shadow-2xl overflow-hidden",
          "transition-all duration-300",
          isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        )}>
          {/* Header */}
          <div className="relative p-5 border-b border-white/10 bg-gradient-to-r from-primary/10 to-transparent">
            <button
              onClick={() => { setIsOpen(false); resetForm(); }}
              className="absolute right-4 top-4 p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
            <h2 className="text-lg font-bold">Reserva tu cápsula</h2>
            <p className="text-sm text-muted-foreground mt-0.5">En menos de 1 minuto</p>
            
            {/* Progress Steps */}
            <div className="flex gap-2 mt-4">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={cn(
                    "h-1 flex-1 rounded-full transition-colors",
                    s <= step ? "bg-primary" : "bg-white/20"
                  )}
                />
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            {/* Step 1: Date */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>¿Qué día te acomoda?</span>
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {dates.map((d) => (
                    <button
                      key={d.value}
                      onClick={() => setSelectedDate(d.value)}
                      className={cn(
                        "flex flex-col items-center py-3 rounded-xl transition-all",
                        "border",
                        selectedDate === d.value
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10"
                      )}
                    >
                      <span className="text-[10px] opacity-70">{d.day}</span>
                      <span className="text-lg font-semibold">{d.date}</span>
                      {d.isToday && (
                        <span className="text-[8px] uppercase tracking-wider opacity-70">Hoy</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Time */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>¿A qué hora?</span>
                </div>
                <div className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto pr-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={cn(
                        "py-2.5 rounded-xl text-sm font-medium transition-all",
                        "border",
                        selectedTime === time
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10"
                      )}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Duration & Pods */}
            {step === 3 && (
              <div className="space-y-5">
                {/* Duration */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>¿Por cuánto tiempo?</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {durations.map((d) => (
                      <button
                        key={d.value}
                        onClick={() => setSelectedDuration(d.value)}
                        className={cn(
                          "py-3 rounded-xl transition-all border",
                          selectedDuration === d.value
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10"
                        )}
                      >
                        <div className="text-sm font-medium">{d.label}</div>
                        <div className="text-xs opacity-70">${d.price.toLocaleString("es-CL")}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Number of Pods */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Users className="h-4 w-4 text-primary" />
                    <span>¿Cuántas cápsulas?</span>
                  </div>
                  <div className="flex items-center justify-center gap-4 py-2">
                    <button
                      onClick={() => setPods(Math.max(1, pods - 1))}
                      className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-lg font-bold"
                    >
                      -
                    </button>
                    <span className="text-3xl font-bold w-12 text-center">{pods}</span>
                    <button
                      onClick={() => setPods(Math.min(5, pods + 1))}
                      className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-lg font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Summary */}
                <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Fecha</span>
                    <span className="font-medium">
                      {new Date(selectedDate).toLocaleDateString("es-CL", { 
                        weekday: "short", 
                        day: "numeric", 
                        month: "short" 
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-muted-foreground">Hora</span>
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-muted-foreground">Duración</span>
                    <span className="font-medium">{selectedDurationObj?.label}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-muted-foreground">Cápsulas</span>
                    <span className="font-medium">{pods}</span>
                  </div>
                  <div className="border-t border-primary/20 mt-3 pt-3 flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-primary text-lg">
                      ${totalPrice.toLocaleString("es-CL")} CLP
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-5 border-t border-white/10 flex gap-3">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-4 py-2.5 rounded-xl text-sm font-medium bg-white/5 hover:bg-white/10 transition-colors"
              >
                Atrás
              </button>
            )}
            <button
              onClick={() => {
                if (step < 3) {
                  setStep(step + 1);
                } else {
                  handleBook();
                }
              }}
              disabled={!canProceed()}
              className={cn(
                "flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all",
                "bg-primary text-primary-foreground",
                "shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30",
                "disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
              )}
            >
              {step < 3 ? "Continuar" : "Confirmar por WhatsApp"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
