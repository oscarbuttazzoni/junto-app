"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Users, Calendar, CheckCircle2 } from "lucide-react";
import { useStore } from "@/lib/store";

export default function HomePage() {
  const { profile, onboardingCompleted, sessions } = useStore();

  const completedSteps = Object.values(onboardingCompleted).filter(Boolean).length;
  const totalSteps = 4;
  const allOnboardingDone = completedSteps === totalSteps;
  const weekSessions = sessions.filter(
    (s) => s.status === "completed"
  ).length;

  return (
    <div className="px-6 pt-14">
      {/* Header */}
      <div className="mb-8">
        <span className="font-serif text-lg text-accent">JUNTO</span>
        <h1 className="font-serif text-3xl mt-2">
          Hola{profile?.name ? `, ${profile.name}` : ""} 👋
        </h1>
        <p className="text-text-dim text-sm mt-1">
          Tu capa social sobre el trabajo remoto
        </p>
      </div>

      {/* Onboarding CTA or completed state */}
      {!allOnboardingDone ? (
        <Link
          href="/onboarding"
          className="block p-6 bg-accent-dim border border-accent-border rounded-2xl mb-4 hover:-translate-y-0.5 transition-transform"
        >
          <div className="flex items-center gap-3 mb-3">
            <Sparkles size={20} className="text-accent" />
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">
              Paso 1 · {completedSteps}/{totalSteps}
            </span>
          </div>
          <h2 className="font-semibold mb-1">Completá tu perfil</h2>
          <p className="text-sm text-text-dim mb-3">
            {completedSteps === 0
              ? "3 ejercicios interactivos de 5 minutos. Salís sabiendo más de vos."
              : `Te faltan ${totalSteps - completedSteps} ejercicios para recibir tus matches.`}
          </p>
          {/* Mini progress bar */}
          <div className="flex gap-1">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full ${
                  i < completedSteps ? "bg-accent" : "bg-border"
                }`}
              />
            ))}
          </div>
        </Link>
      ) : (
        <Link
          href="/matches"
          className="block p-6 bg-teal-dim border border-teal-border rounded-2xl mb-4 hover:-translate-y-0.5 transition-transform"
        >
          <div className="flex items-center gap-3 mb-3">
            <CheckCircle2 size={20} className="text-teal" />
            <span className="text-xs font-semibold uppercase tracking-wider text-teal">
              Perfil completo
            </span>
          </div>
          <h2 className="font-semibold mb-1">Ver tus matches</h2>
          <p className="text-sm text-text-dim mb-3">
            Tenés personas compatibles esperándote.
          </p>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-teal">
            Ver matches <ArrowRight size={14} />
          </span>
        </Link>
      )}

      {/* Quick stats */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="p-4 bg-surface border border-border rounded-xl text-center">
          <Users size={18} className="text-teal mx-auto mb-2" />
          <div className="font-serif text-2xl text-teal">{sessions.length}</div>
          <div className="text-[10px] text-text-muted">sesiones total</div>
        </div>
        <div className="p-4 bg-surface border border-border rounded-xl text-center">
          <Calendar size={18} className="text-lavender mx-auto mb-2" />
          <div className="font-serif text-2xl text-lavender">{weekSessions}</div>
          <div className="text-[10px] text-text-muted">esta semana</div>
        </div>
      </div>

      {/* Social diet */}
      <div className="p-5 bg-surface border border-border rounded-2xl">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">
          Tu dieta social
        </h3>
        <p className="text-sm text-text-dim">
          {allOnboardingDone
            ? "Revisá tus matches y agendá tu primera sesión JUNTO."
            : "Completá el onboarding para recibir tus primeros matches."}
        </p>
      </div>
    </div>
  );
}
