"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useStore, type OnboardingWheel } from "@/lib/store";
import { WHEEL_DIMENSIONS } from "@/lib/utils/constants";

/**
 * Wheel of Life — Onboarding Exercise 2
 *
 * 8 sliders (1-10) for different life areas.
 * Visual, fast (~1 min), and reveals what the user wants to IMPROVE.
 * Used in matching: connect someone with 9 in finances with someone at 3 who wants to learn.
 */

export default function WheelPage() {
  const router = useRouter();
  const { setWheel } = useStore();

  const [scores, setScores] = useState<Record<string, number>>(
    Object.fromEntries(WHEEL_DIMENSIONS.map((d) => [d.key, 5]))
  );

  const handleChange = (key: string, value: number) => {
    setScores((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    setWheel(scores as unknown as OnboardingWheel);
    router.push("/onboarding");
  };

  const average =
    Object.values(scores).reduce((a, b) => a + b, 0) /
    WHEEL_DIMENSIONS.length;

  return (
    <div className="px-6 pt-14 pb-8">
      <Link href="/onboarding" className="inline-flex items-center gap-2 text-sm text-text-dim mb-6">
        <ArrowLeft size={16} /> Volver
      </Link>

      {/* Educational explanation */}
      <div className="p-4 bg-teal-dim border border-teal-border rounded-xl mb-6">
        <p className="text-xs text-teal leading-relaxed">
          <strong>¿Por qué hacemos esto?</strong> La Rueda de la Vida es una
          herramienta de coaching usada mundialmente. Te permite ver dónde estás
          y dónde querés crecer. Te conectamos no solo por quién sos, sino por
          lo que querés mejorar.
        </p>
      </div>

      <h1 className="font-serif text-2xl mb-1">Tu rueda de la vida</h1>
      <p className="text-xs text-text-muted mb-8">
        ¿Cómo te sentís hoy en cada área? Deslizá los sliders.
      </p>

      {/* Sliders */}
      <div className="flex flex-col gap-5 mb-8">
        {WHEEL_DIMENSIONS.map((dim, i) => (
          <motion.div
            key={dim.key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">
                {dim.emoji} {dim.label}
              </span>
              <span
                className={`font-serif text-lg ${
                  scores[dim.key] >= 7
                    ? "text-green"
                    : scores[dim.key] >= 4
                    ? "text-accent"
                    : "text-coral"
                }`}
              >
                {scores[dim.key]}
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={10}
              value={scores[dim.key]}
              onChange={(e) => handleChange(dim.key, Number(e.target.value))}
              className="w-full h-1.5 bg-border rounded-full appearance-none cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-5
                [&::-webkit-slider-thumb]:h-5
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-accent
                [&::-webkit-slider-thumb]:cursor-pointer
                [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(240,196,86,0.3)]
                [&::-moz-range-thumb]:w-5
                [&::-moz-range-thumb]:h-5
                [&::-moz-range-thumb]:rounded-full
                [&::-moz-range-thumb]:bg-accent
                [&::-moz-range-thumb]:border-0
                [&::-moz-range-thumb]:cursor-pointer"
            />
            <div className="flex justify-between mt-1">
              <span className="text-[9px] text-text-muted">Necesito mejorar</span>
              <span className="text-[9px] text-text-muted">Muy bien</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary */}
      <div className="p-4 bg-surface border border-border rounded-xl mb-6 text-center">
        <div className="text-xs text-text-muted mb-1">Promedio general</div>
        <div
          className={`font-serif text-3xl ${
            average >= 7
              ? "text-green"
              : average >= 4
              ? "text-accent"
              : "text-coral"
          }`}
        >
          {average.toFixed(1)}
        </div>
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
