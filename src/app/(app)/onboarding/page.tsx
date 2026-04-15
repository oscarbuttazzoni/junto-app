"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, Circle, Compass, Briefcase, CheckCircle2, ArrowRight } from "lucide-react";
import { useStore } from "@/lib/store";

export default function OnboardingHub() {
  const router = useRouter();
  const { onboardingCompleted } = useStore();

  const steps = [
    {
      key: "values" as const,
      href: "/onboarding/values",
      icon: Heart,
      color: "text-accent",
      bg: "bg-accent-dim",
      title: "Torneo de valores",
      description: "Descubrí qué te define en 5 rondas rápidas",
      why: "Personas que comparten 3 de 5 valores tienen alta probabilidad de sinergia.",
      time: "2 min",
    },
    {
      key: "wheel" as const,
      href: "/onboarding/wheel",
      icon: Circle,
      color: "text-teal",
      bg: "bg-teal-dim",
      title: "Rueda de la vida",
      description: "¿Cómo están tus 8 áreas de vida hoy?",
      why: "Te conectamos no solo por quién sos, sino por lo que querés mejorar.",
      time: "1 min",
    },
    {
      key: "ikigai" as const,
      href: "/onboarding/ikigai",
      icon: Compass,
      color: "text-coral",
      bg: "bg-coral-dim",
      title: "Tu ikigai",
      description: "La intersección de lo que amás, sabés, y el mundo necesita",
      why: "Genera matches de coworking y emprendimiento con personas complementarias.",
      time: "2 min",
    },
    {
      key: "style" as const,
      href: "/onboarding/style",
      icon: Briefcase,
      color: "text-lavender",
      bg: "bg-lavender-dim",
      title: "Estilo de trabajo",
      description: "¿Silencio o conversación? ¿Bloques cortos o largos?",
      why: "Si vos necesitás silencio y tu match habla todo el día, no va a funcionar.",
      time: "1 min",
    },
  ];

  const completedCount = Object.values(onboardingCompleted).filter(Boolean).length;
  const allDone = completedCount === steps.length;

  return (
    <div className="px-6 pt-14 pb-8">
      {/* Header */}
      <h1 className="font-serif text-3xl mb-2">Conozcámonos</h1>
      <p className="text-text-dim text-sm mb-2">
        Para conectarte con las personas correctas, necesitamos entender quién
        sos. Cada ejercicio te explica{" "}
        <strong className="text-text">por qué</strong> lo hacemos.
      </p>
      <p className="text-xs text-text-muted mb-8">
        ~5 min total · Salís sabiendo más de vos
      </p>

      {/* Progress */}
      <div className="flex gap-1 mb-8">
        {steps.map((step) => (
          <div
            key={step.key}
            className={`h-1 flex-1 rounded-full transition-colors ${
              onboardingCompleted[step.key] ? "bg-accent" : "bg-border"
            }`}
          />
        ))}
      </div>

      {/* Steps */}
      <div className="flex flex-col gap-3">
        {steps.map((step) => {
          const Icon = step.icon;
          const completed = onboardingCompleted[step.key];
          return (
            <Link
              key={step.href}
              href={step.href}
              className={`flex items-center gap-4 p-5 bg-surface border border-border rounded-2xl hover:-translate-y-0.5 transition-transform ${
                completed ? "opacity-60" : ""
              }`}
            >
              <div
                className={`w-10 h-10 ${step.bg} rounded-xl flex items-center justify-center flex-shrink-0`}
              >
                {completed ? (
                  <CheckCircle2 size={20} className="text-green" />
                ) : (
                  <Icon size={20} className={step.color} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm">{step.title}</h3>
                <p className="text-xs text-text-dim mt-0.5">
                  {step.description}
                </p>
              </div>
              <span className="text-[10px] text-text-muted flex-shrink-0">
                {completed ? "✓" : step.time}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Results button */}
      {allDone && (
        <button
          onClick={() => router.push("/onboarding/results")}
          className="w-full mt-6 flex items-center justify-center gap-2 px-4 py-3 bg-accent text-bg font-semibold rounded-xl hover:opacity-90 transition-opacity"
        >
          Ver mis resultados
          <ArrowRight size={18} />
        </button>
      )}
    </div>
  );
}
