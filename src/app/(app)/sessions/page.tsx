"use client";

import { Calendar } from "lucide-react";

export default function SessionsPage() {
  return (
    <div className="px-6 pt-14 text-center">
      <Calendar size={40} className="text-lavender mx-auto mb-4" />
      <h1 className="font-serif text-2xl mb-2">Tus sesiones</h1>
      <p className="text-sm text-text-dim">
        Acá vas a ver tus sesiones agendadas y completadas. Aceptá un match
        para agendar tu primera sesión.
      </p>
    </div>
  );
}
