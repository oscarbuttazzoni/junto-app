"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Trophy, Circle, Compass, Briefcase } from "lucide-react";
import { useStore } from "@/lib/store";
import { WHEEL_DIMENSIONS } from "@/lib/utils/constants";

/**
 * Onboarding Results — Shows everything the user discovered about themselves.
 * "Sales sabiendo más de vos" — this is the payoff moment.
 */

export default function ResultsPage() {
  const { values, wheel, ikigai, workPreferences, onboardingCompleted } =
    useStore();

  const allDone = Object.values(onboardingCompleted).every(Boolean);

  if (!allDone) {
    return (
      <div className="px-6 pt-14 text-center">
        <h1 className="font-serif text-2xl mb-4">Todavía falta</h1>
        <p className="text-sm text-text-dim mb-6">
          Completá los 4 ejercicios para ver tus resultados.
        </p>
        <Link
          href="/onboarding"
          className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-bg font-semibold rounded-xl"
        >
          Volver al onboarding
        </Link>
      </div>
    );
  }

  return (
    <div className="px-6 pt-14 pb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-serif text-3xl mb-2">Esto descubrimos de vos</h1>
        <p className="text-sm text-text-dim mb-8">
          Todo esto alimenta el motor de matching. Cuanto más sabemos, mejores
          son tus conexiones.
        </p>
      </motion.div>

      {/* Values */}
      {values && (
        <ResultSection
          icon={<Trophy size={18} className="text-accent" />}
          title="Tus 5 valores"
          delay={0}
        >
          <div className="flex flex-wrap gap-2">
            {values.valuesRanked.map((v, i) => (
              <span
                key={v}
                className="px-3 py-1.5 bg-accent-dim text-accent text-xs rounded-full font-medium"
              >
                {i === 0 && "🏆 "}
                {v}
              </span>
            ))}
          </div>
        </ResultSection>
      )}

      {/* Wheel */}
      {wheel && (
        <ResultSection
          icon={<Circle size={18} className="text-teal" />}
          title="Tu rueda de la vida"
          delay={0.1}
        >
          <div className="grid grid-cols-2 gap-2">
            {WHEEL_DIMENSIONS.map((dim) => {
              const score = wheel[dim.key as keyof typeof wheel];
              return (
                <div
                  key={dim.key}
                  className="flex items-center gap-2 p-2 bg-surface-2 rounded-lg"
                >
                  <span className="text-xs">{dim.emoji}</span>
                  <span className="text-xs text-text-dim flex-1">
                    {dim.label}
                  </span>
                  <span
                    className={`font-serif text-sm font-medium ${
                      score >= 7
                        ? "text-green"
                        : score >= 4
                        ? "text-accent"
                        : "text-coral"
                    }`}
                  >
                    {score}
                  </span>
                </div>
              );
            })}
          </div>
        </ResultSection>
      )}

      {/* Ikigai */}
      {ikigai && (
        <ResultSection
          icon={<Compass size={18} className="text-coral" />}
          title="Tu ikigai"
          delay={0.2}
        >
          <div className="flex flex-col gap-3">
            <IkigaiRow label="Amás" items={ikigai.love} color="text-coral" />
            <IkigaiRow
              label="Se te da bien"
              items={ikigai.goodAt}
              color="text-teal"
            />
            <IkigaiRow
              label="El mundo necesita"
              items={ikigai.worldNeeds}
              color="text-accent"
            />
            <IkigaiRow
              label="Te pagan por"
              items={ikigai.paidFor}
              color="text-lavender"
            />
          </div>
        </ResultSection>
      )}

      {/* Work Style */}
      {workPreferences && (
        <ResultSection
          icon={<Briefcase size={18} className="text-lavender" />}
          title="Tu estilo de trabajo"
          delay={0.3}
        >
          <div className="flex flex-wrap gap-2">
            <StyleTag label={`Ruido: ${workPreferences.noisePref}`} />
            <StyleTag label={`Bloques de ${workPreferences.blockMinutes} min`} />
            <StyleTag label={`Interacción: ${workPreferences.interaction}`} />
            <StyleTag label={`Música: ${workPreferences.musicPref}`} />
            <StyleTag label={`Lugar: ${workPreferences.hostComfort}`} />
          </div>
        </ResultSection>
      )}

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8"
      >
        <Link
          href="/matches"
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-accent text-bg font-semibold rounded-xl hover:opacity-90 transition-opacity"
        >
          Ver mis matches
          <ArrowRight size={18} />
        </Link>
      </motion.div>
    </div>
  );
}

function ResultSection({
  icon,
  title,
  delay,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="p-5 bg-surface border border-border rounded-2xl mb-4"
    >
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h2 className="text-sm font-semibold">{title}</h2>
      </div>
      {children}
    </motion.div>
  );
}

function IkigaiRow({
  label,
  items,
  color,
}: {
  label: string;
  items: string[];
  color: string;
}) {
  return (
    <div>
      <span className={`text-[10px] font-semibold uppercase tracking-wider ${color}`}>
        {label}
      </span>
      <div className="flex flex-wrap gap-1 mt-1">
        {items.map((item) => (
          <span
            key={item}
            className="px-2 py-0.5 bg-surface-2 text-text-dim text-[11px] rounded-full"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function StyleTag({ label }: { label: string }) {
  return (
    <span className="px-3 py-1 bg-lavender-dim text-lavender text-xs rounded-full">
      {label}
    </span>
  );
}
