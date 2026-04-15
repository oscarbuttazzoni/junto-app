"use client";

import { CalendarDays } from "lucide-react";

export default function AgendaPage() {
  return (
    <div className="px-6 pt-14 text-center">
      <CalendarDays size={40} className="text-accent mx-auto mb-4" />
      <h1 className="font-serif text-2xl mb-2">Tu semana</h1>
      <p className="text-sm text-text-dim">
        Acá va a aparecer tu agenda semanal con sesiones propuestas y
        confirmadas. Tu "dieta social" visual.
      </p>
    </div>
  );
}
