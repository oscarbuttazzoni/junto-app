"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useStore } from "@/lib/store";
import { IKIGAI_OPTIONS } from "@/lib/utils/constants";

/**
 * Ikigai Simplificado — Onboarding Exercise 3
 *
 * 4 categories with tappable tags (no free text, ADHD-friendly).
 * The intersection reveals the user's purpose — perfect for coworking matching.
 */

const sections = [
  {
    key: "love" as const,
    title: "Lo que amás",
    subtitle: "¿Qué harías gratis un sábado?",
    color: "text-coral",
    bg: "bg-coral-dim",
    border: "border-coral-border",
    activeBg: "bg-coral-dim",
    activeText: "text-coral",
    activeBorder: "border-coral-border",
    options: IKIGAI_OPTIONS.love,
  },
  {
    key: "goodAt" as const,
    title: "Lo que se te da bien",
    subtitle: "¿Qué dicen los demás que hacés bien?",
    color: "text-teal",
    bg: "bg-teal-dim",
    border: "border-teal-border",
    activeBg: "bg-teal-dim",
    activeText: "text-teal",
    activeBorder: "border-teal-border",
    options: IKIGAI_OPTIONS.good_at,
  },
  {
    key: "worldNeeds" as const,
    title: "Lo que el mundo necesita",
    subtitle: "¿Qué problemas te importan?",
    color: "text-accent",
    bg: "bg-accent-dim",
    border: "border-accent-border",
    activeBg: "bg-accent-dim",
    activeText: "text-accent",
    activeBorder: "border-accent-border",
    options: IKIGAI_OPTIONS.world_needs,
  },
  {
    key: "paidFor" as const,
    title: "Por lo que te pagan",
    subtitle: "¿En qué trabajás hoy?",
    color: "text-lavender",
    bg: "bg-lavender-dim",
    border: "border-lavender-border",
    activeBg: "bg-lavender-dim",
    activeText: "text-lavender",
    activeBorder: "border-lavender-border",
    options: IKIGAI_OPTIONS.paid_for,
  },
];

export default function IkigaiPage() {
  const router = useRouter();
  const { setIkigai } = useStore();

  const [selections, setSelections] = useState<Record<string, string[]>>({
    love: [],
    goodAt: [],
    worldNeeds: [],
    paidFor: [],
  });

  const toggleTag = (section: string, tag: string) => {
    setSelections((prev) => {
      const current = prev[section];
      if (current.includes(tag)) {
        return { ...prev, [section]: current.filter((t) => t !== tag) };
      }
      if (current.length >= 3) return prev; // Max 3 per category
      return { ...prev, [section]: [...current, tag] };
    });
  };

  const canSave = Object.values(selections).every((arr) => arr.length >= 1);

  const handleSave = () => {
    setIkigai({
      love: selections.love,
      goodAt: selections.goodAt,
      worldNeeds: selections.worldNeeds,
      paidFor: selections.paidFor,
    });
    router.push("/onboarding");
  };

  return (
    <div className="px-6 pt-14 pb-8">
      <Link href="/onboarding" className="inline-flex items-center gap-2 text-sm text-text-dim mb-6">
        <ArrowLeft size={16} /> Volver
      </Link>

      {/* Educational explanation */}
      <div className="p-4 bg-coral-dim border border-coral-border rounded-xl mb-6">
        <p className="text-xs text-coral leading-relaxed">
          <strong>¿Por qué hacemos esto?</strong> El Ikigai es un concepto
          japonés que representa tu propósito: la intersección de lo que amás,
          lo que sabés hacer, lo que el mundo necesita, y por lo que te pagan.
          Nos ayuda a conectarte con personas complementarias.
        </p>
      </div>

      <h1 className="font-serif text-2xl mb-1">Tu ikigai</h1>
      <p className="text-xs text-text-muted mb-8">
        Tocá hasta 3 opciones en cada categoría
      </p>

      {/* Sections */}
      <div className="flex flex-col gap-8 mb-8">
        {sections.map((section, sectionIdx) => (
          <motion.div
            key={section.key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectionIdx * 0.1 }}
          >
            <h2 className={`text-sm font-semibold ${section.color} mb-1`}>
              {section.title}
            </h2>
            <p className="text-xs text-text-muted mb-3">{section.subtitle}</p>
            <div className="flex flex-wrap gap-2">
              {section.options.map((option) => {
                const selected = selections[section.key].includes(option);
                return (
                  <button
                    key={option}
                    onClick={() => toggleTag(section.key, option)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all active:scale-95 ${
                      selected
                        ? `${section.activeBg} ${section.activeText} ${section.activeBorder}`
                        : "bg-surface border-border text-text-dim hover:border-border-light"
                    }`}
                  >
                    {selected && "✓ "}
                    {option}
                  </button>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      <button
        onClick={handleSave}
        disabled={!canSave}
        className="w-full px-4 py-3 bg-accent text-bg font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-40"
      >
        Guardar y continuar
      </button>
    </div>
  );
}
