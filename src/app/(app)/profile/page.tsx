"use client";

import { useStore } from "@/lib/store";
import { User, RotateCcw } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const { values, wheel, ikigai, workPreferences, onboardingCompleted, reset } =
    useStore();

  const completedCount = Object.values(onboardingCompleted).filter(Boolean).length;

  return (
    <div className="px-6 pt-14 pb-8">
      <h1 className="font-serif text-3xl mb-1">Tu perfil</h1>
      <p className="text-xs text-text-muted mb-8">
        MVP local — datos guardados en tu navegador
      </p>

      {/* Onboarding status */}
      <div className="p-5 bg-surface border border-border rounded-2xl mb-4">
        <div className="flex items-center gap-3 mb-3">
          <User size={18} className="text-accent" />
          <h2 className="text-sm font-semibold">Onboarding</h2>
          <span className="ml-auto text-xs text-text-dim">
            {completedCount}/4
          </span>
        </div>
        <div className="flex gap-1 mb-3">
          {["values", "wheel", "ikigai", "style"].map((key) => (
            <div
              key={key}
              className={`h-1 flex-1 rounded-full ${
                onboardingCompleted[key as keyof typeof onboardingCompleted]
                  ? "bg-accent"
                  : "bg-border"
              }`}
            />
          ))}
        </div>
        {completedCount < 4 ? (
          <Link
            href="/onboarding"
            className="text-sm text-accent font-medium"
          >
            Completar →
          </Link>
        ) : (
          <Link
            href="/onboarding/results"
            className="text-sm text-accent font-medium"
          >
            Ver resultados →
          </Link>
        )}
      </div>

      {/* Quick summary */}
      {values && (
        <div className="p-4 bg-surface border border-border rounded-xl mb-3">
          <h3 className="text-xs font-semibold text-text-muted mb-2">
            Valores
          </h3>
          <div className="flex flex-wrap gap-1">
            {values.valuesRanked.map((v) => (
              <span
                key={v}
                className="px-2 py-0.5 bg-accent-dim text-accent text-[10px] rounded-full"
              >
                {v}
              </span>
            ))}
          </div>
        </div>
      )}

      {workPreferences && (
        <div className="p-4 bg-surface border border-border rounded-xl mb-3">
          <h3 className="text-xs font-semibold text-text-muted mb-2">
            Estilo de trabajo
          </h3>
          <p className="text-xs text-text-dim">
            {workPreferences.noisePref === "silence"
              ? "Silencio total"
              : workPreferences.noisePref === "low"
              ? "Ruido bajo"
              : "Conversación"}{" "}
            · Bloques de {workPreferences.blockMinutes} min ·{" "}
            {workPreferences.interaction === "minimal"
              ? "Interacción mínima"
              : workPreferences.interaction === "breaks_only"
              ? "Solo en breaks"
              : "Conversación"}
          </p>
        </div>
      )}

      {/* Reset */}
      <button
        onClick={() => {
          if (confirm("¿Seguro? Esto borra todos tus datos locales.")) {
            reset();
            window.location.href = "/home";
          }
        }}
        className="mt-6 flex items-center gap-2 text-xs text-coral hover:text-coral/80 transition-colors"
      >
        <RotateCcw size={14} />
        Resetear datos (empezar de cero)
      </button>
    </div>
  );
}
