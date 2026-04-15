"use client";

import { useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, MapPin, Clock, ArrowRight } from "lucide-react";
import { useStore } from "@/lib/store";
import { MOCK_MATCHES, generateExplanation } from "@/lib/mock-data";

/**
 * Matches Page — Shows 3-5 curated matches + 1 wild card.
 * Anti-Tinder: no photos, no swiping. Explained recommendations.
 */

export default function MatchesPage() {
  const { values, onboardingCompleted } = useStore();
  const allDone = Object.values(onboardingCompleted).every(Boolean);

  const matches = useMemo(() => {
    if (!values) return [];
    return MOCK_MATCHES.map((match) => ({
      ...match,
      explanation: generateExplanation(values.valuesRanked, match),
    }));
  }, [values]);

  if (!allDone) {
    return (
      <div className="px-6 pt-14 text-center">
        <h1 className="font-serif text-2xl mb-4">Primero lo primero</h1>
        <p className="text-sm text-text-dim mb-6">
          Completá el onboarding para recibir tus matches personalizados.
        </p>
        <Link
          href="/onboarding"
          className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-bg font-semibold rounded-xl"
        >
          Ir al onboarding <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="px-6 pt-14 pb-8">
      <h1 className="font-serif text-3xl mb-1">Tus matches de hoy</h1>
      <p className="text-xs text-text-muted mb-6">
        3 personas + 1 wild card · Basados en tu perfil
      </p>

      <div className="flex flex-col gap-4">
        {matches.map((match, i) => (
          <motion.div
            key={match.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            {match.isWildcard ? (
              /* Wild Card — special design */
              <div className="p-5 bg-accent-dim border border-accent-border rounded-2xl">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles size={16} className="text-accent" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                    Wild Card
                  </span>
                </div>
                <h3 className="font-serif text-xl mb-1 text-accent">
                  {match.name}
                </h3>
                <p className="text-sm text-accent/70 mb-3">
                  No es tu match obvio, pero creemos que te va a sorprender.
                </p>
                <p className="text-xs text-accent/60 mb-4">
                  {match.jobTitle} · {match.industry} ·{" "}
                  {match.distance} km
                </p>
                {/* Reveal explanation */}
                <div className="p-3 bg-bg/30 rounded-xl mb-4">
                  <p className="text-xs text-accent/80">
                    <strong>Por qué:</strong>{" "}
                    {match.explanation.shared.length > 0
                      ? `Comparten ${match.explanation.shared.join(", ")}. `
                      : ""}
                    {match.explanation.complement}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 py-2.5 bg-accent text-bg font-semibold text-sm rounded-xl hover:opacity-90 transition-opacity">
                    Me interesa
                  </button>
                  <button className="px-4 py-2.5 bg-bg/20 text-accent text-sm rounded-xl hover:bg-bg/30 transition-colors">
                    Hoy no
                  </button>
                </div>
              </div>
            ) : (
              /* Regular match */
              <div className="p-5 bg-surface border border-border rounded-2xl hover:-translate-y-0.5 transition-transform">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-serif text-xl">{match.name}</h3>
                    <p className="text-xs text-text-dim">
                      {match.jobTitle} · {match.industry}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-serif text-lg text-teal">
                      {match.explanation.score}%
                    </div>
                    <div className="text-[9px] text-text-muted">match</div>
                  </div>
                </div>

                {/* Shared values */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {match.explanation.shared.map((v) => (
                    <span
                      key={v}
                      className="px-2 py-0.5 bg-teal-dim text-teal text-[10px] rounded-full"
                    >
                      {v}
                    </span>
                  ))}
                </div>

                {/* Explanation */}
                <p className="text-xs text-text-dim mb-3">
                  {match.explanation.complement}
                </p>

                {/* Meta */}
                <div className="flex gap-4 text-[10px] text-text-muted mb-4">
                  <span className="flex items-center gap-1">
                    <MapPin size={10} /> {match.distance} km
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={10} /> Bloques de {match.blockMinutes} min
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button className="flex-1 py-2.5 bg-teal text-bg font-semibold text-sm rounded-xl hover:opacity-90 transition-opacity">
                    Me interesa
                  </button>
                  <button className="px-4 py-2.5 bg-surface-2 text-text-dim text-sm rounded-xl hover:bg-surface-3 transition-colors">
                    Hoy no
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Info note */}
      <div className="mt-6 p-4 bg-surface-2 border border-border rounded-xl">
        <p className="text-xs text-text-dim leading-relaxed">
          <strong className="text-text">¿Por qué no hay fotos?</strong> JUNTO
          te recomienda personas por compatibilidad real — valores, estilo de
          trabajo, ubicación. La otra persona nunca se entera si decís "hoy
          no."
        </p>
      </div>
    </div>
  );
}
