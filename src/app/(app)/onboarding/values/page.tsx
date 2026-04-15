"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Trophy } from "lucide-react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { VALUES_POOL } from "@/lib/utils/constants";

/**
 * Values Tournament — Onboarding Exercise 1
 *
 * How it works:
 * 1. Start with 16 values shuffled randomly
 * 2. Round 1: 8 matchups → 8 winners
 * 3. Round 2: 4 matchups → 4 winners
 * 4. Round 3: 2 matchups → 2 winners
 * 5. Round 4: 1 final matchup → 1 champion
 * 6. The top 5 = champion + 3 runner-ups from last rounds + the final loser
 *    Simplified: we track all winners and pick top 5 by how far they got
 */

type MatchResult = { round: number; winner: string; loser: string };

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function ValuesTournamentPage() {
  const router = useRouter();
  const { setValues, onboardingCompleted } = useStore();

  // Shuffle values once on mount
  const [allValues] = useState(() => shuffleArray([...VALUES_POOL]));

  // Tournament state
  const [currentRound, setCurrentRound] = useState(1);
  const [matchIndex, setMatchIndex] = useState(0);
  const [roundContenders, setRoundContenders] = useState<string[]>(allValues);
  const [roundWinners, setRoundWinners] = useState<string[]>([]);
  const [results, setResults] = useState<MatchResult[]>([]);
  const [finished, setFinished] = useState(false);
  const [topValues, setTopValues] = useState<string[]>([]);

  const totalRounds = 4; // 16 → 8 → 4 → 2 → 1
  const matchupsInRound = Math.floor(roundContenders.length / 2);
  const pairA = roundContenders[matchIndex * 2];
  const pairB = roundContenders[matchIndex * 2 + 1];

  const handleChoice = useCallback(
    (winner: string, loser: string) => {
      const newResult: MatchResult = { round: currentRound, winner, loser };
      const newResults = [...results, newResult];
      const newWinners = [...roundWinners, winner];

      setResults(newResults);
      setRoundWinners(newWinners);

      if (matchIndex + 1 < matchupsInRound) {
        // More matchups in this round
        setMatchIndex(matchIndex + 1);
      } else if (newWinners.length > 1) {
        // Move to next round
        setCurrentRound(currentRound + 1);
        setMatchIndex(0);
        setRoundContenders(newWinners);
        setRoundWinners([]);
      } else {
        // Tournament complete — calculate top 5
        // The champion is the last winner
        const champion = newWinners[0];

        // Rank all values by the furthest round they won in
        const valueScores = new Map<string, number>();
        for (const r of newResults) {
          const current = valueScores.get(r.winner) || 0;
          valueScores.set(r.winner, Math.max(current, r.round));
        }

        // Sort by score descending, take top 5
        const ranked = Array.from(valueScores.entries())
          .sort((a, b) => b[1] - a[1])
          .map(([value]) => value);

        // Ensure champion is first
        const top5 = [champion, ...ranked.filter((v) => v !== champion)].slice(
          0,
          5
        );

        setTopValues(top5);
        setFinished(true);
      }
    },
    [currentRound, matchIndex, matchupsInRound, results, roundWinners]
  );

  const handleSave = () => {
    setValues({
      valuesRanked: topValues,
      rawTournament: results,
    });
    router.push("/onboarding");
  };

  // Already completed — option to redo
  if (onboardingCompleted.values && !finished && results.length === 0) {
    return (
      <div className="px-6 pt-14">
        <Link href="/onboarding" className="inline-flex items-center gap-2 text-sm text-text-dim mb-6">
          <ArrowLeft size={16} /> Volver
        </Link>
        <div className="text-center py-12">
          <Trophy size={40} className="text-accent mx-auto mb-4" />
          <h2 className="font-serif text-2xl mb-2">Ya completaste este ejercicio</h2>
          <p className="text-sm text-text-dim mb-6">¿Querés hacerlo de nuevo?</p>
          <button
            onClick={() => {
              setRoundContenders(shuffleArray([...VALUES_POOL]));
              setCurrentRound(1);
              setMatchIndex(0);
              setRoundWinners([]);
              setResults([]);
            }}
            className="px-6 py-3 bg-surface border border-border rounded-xl text-sm font-medium hover:border-border-light transition-colors"
          >
            Repetir torneo
          </button>
        </div>
      </div>
    );
  }

  // Finished — show results
  if (finished) {
    return (
      <div className="px-6 pt-14">
        <Link href="/onboarding" className="inline-flex items-center gap-2 text-sm text-text-dim mb-6">
          <ArrowLeft size={16} /> Volver
        </Link>

        <div className="text-center mb-8">
          <Trophy size={40} className="text-accent mx-auto mb-4" />
          <h1 className="font-serif text-3xl mb-2">Tus 5 valores</h1>
          <p className="text-sm text-text-dim">
            Esto es lo que más te define. Personas que comparten 3 de estos 5
            valores tienen alta probabilidad de sinergia con vos.
          </p>
        </div>

        <div className="flex flex-col gap-3 mb-8">
          {topValues.map((value, i) => (
            <motion.div
              key={value}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 }}
              className="flex items-center gap-4 p-4 bg-surface border border-border rounded-xl"
            >
              <div className="w-8 h-8 bg-accent-dim rounded-full flex items-center justify-center font-serif text-accent">
                {i + 1}
              </div>
              <span className="font-medium">{value}</span>
              {i === 0 && (
                <span className="ml-auto text-xs text-accent font-medium">
                  🏆 Campeón
                </span>
              )}
            </motion.div>
          ))}
        </div>

        <button
          onClick={handleSave}
          className="w-full px-4 py-3 bg-accent text-bg font-semibold rounded-xl hover:opacity-90 transition-opacity"
        >
          Guardar y continuar
        </button>
      </div>
    );
  }

  // Tournament in progress
  const progress =
    ((currentRound - 1) / totalRounds) * 100 +
    ((matchIndex + 1) / matchupsInRound / totalRounds) * 100;

  return (
    <div className="px-6 pt-14 min-h-screen flex flex-col">
      {/* Back + Header */}
      <Link href="/onboarding" className="inline-flex items-center gap-2 text-sm text-text-dim mb-6">
        <ArrowLeft size={16} /> Volver
      </Link>

      {/* Educational explanation */}
      <div className="p-4 bg-accent-dim border border-accent-border rounded-xl mb-6">
        <p className="text-xs text-accent leading-relaxed">
          <strong>¿Por qué hacemos esto?</strong> La ciencia muestra que
          personas que comparten 3 de 5 valores principales tienen alta
          probabilidad de sinergia. Este ejercicio (Values Card Sort) es usado
          en coaching profesional.
        </p>
      </div>

      <h1 className="font-serif text-2xl mb-1">¿Qué te define más?</h1>
      <p className="text-xs text-text-muted mb-6">
        Ronda {currentRound} de {totalRounds} ·{" "}
        Matchup {matchIndex + 1} de {matchupsInRound}
      </p>

      {/* Progress bar */}
      <div className="h-1 bg-border rounded-full mb-8">
        <motion.div
          className="h-full bg-accent rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* The matchup */}
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentRound}-${matchIndex}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-full flex flex-col gap-4"
          >
            <button
              onClick={() => handleChoice(pairA, pairB)}
              className="w-full p-6 bg-surface border border-border rounded-2xl text-center hover:border-accent hover:bg-accent-dim transition-all active:scale-[0.98]"
            >
              <span className="font-serif text-2xl">{pairA}</span>
            </button>

            <div className="text-center text-xs text-text-muted font-medium">
              vs
            </div>

            <button
              onClick={() => handleChoice(pairB, pairA)}
              className="w-full p-6 bg-surface border border-border rounded-2xl text-center hover:border-accent hover:bg-accent-dim transition-all active:scale-[0.98]"
            >
              <span className="font-serif text-2xl">{pairB}</span>
            </button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Tags showing selected values so far */}
      <div className="py-6">
        <div className="text-center text-[10px] text-text-muted mb-2">
          Tus top hasta ahora
        </div>
        <div className="flex justify-center gap-2 flex-wrap">
          {roundWinners.length > 0
            ? roundWinners.map((v) => (
                <span
                  key={v}
                  className="px-3 py-1 bg-accent-dim text-accent text-xs rounded-full"
                >
                  {v}
                </span>
              ))
            : Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-border text-text-muted text-xs rounded-full"
                >
                  ?
                </span>
              ))}
        </div>
      </div>
    </div>
  );
}
