"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useStore, type WorkPreferences } from "@/lib/store";
import { NOISE_OPTIONS, BLOCK_OPTIONS, INTERACTION_OPTIONS } from "@/lib/utils/constants";

/**
 * Work Style Preferences — Onboarding Exercise 4
 *
 * Captures how the user prefers to work.
 * Critical for matching: silence person + talker = bad match even with shared values.
 * Also used in Session Blueprint to suggest structure.
 */

const DAYS = [
  { value: "mon", label: "L" },
  { value: "tue", label: "M" },
  { value: "wed", label: "X" },
  { value: "thu", label: "J" },
  { value: "fri", label: "V" },
  { value: "sat", label: "S" },
  { value: "sun", label: "D" },
];

const SCHEDULES = [
  { value: "morning", label: "Mañana", sub: "8am - 12pm" },
  { value: "afternoon", label: "Tarde", sub: "12pm - 6pm" },
  { value: "evening", label: "Noche", sub: "6pm - 10pm" },
];

const HOST_OPTIONS = [
  { value: "any", label: "Donde sea", emoji: "🌍" },
  { value: "public_only", label: "Solo lugares públicos", emoji: "☕" },
  { value: "my_place", label: "Puedo recibir en casa", emoji: "🏠" },
  { value: "their_place", label: "Puedo ir a su casa", emoji: "🚶" },
];

export default function WorkStylePage() {
  const router = useRouter();
  const { setWorkPreferences } = useStore();

  const [noise, setNoise] = useState("low");
  const [block, setBlock] = useState(45);
  const [interaction, setInteraction] = useState("breaks_only");
  const [music, setMusic] = useState("headphones");
  const [schedule, setSchedule] = useState<string[]>(["morning"]);
  const [days, setDays] = useState<string[]>(["mon", "tue", "wed", "thu", "fri"]);
  const [host, setHost] = useState("public_only");

  const toggleItem = (
    arr: string[],
    item: string,
    setter: (v: string[]) => void
  ) => {
    if (arr.includes(item)) {
      setter(arr.filter((i) => i !== item));
    } else {
      setter([...arr, item]);
    }
  };

  const canSave = schedule.length > 0 && days.length > 0;

  const handleSave = () => {
    setWorkPreferences({
      noisePref: noise as WorkPreferences["noisePref"],
      blockMinutes: block,
      breakStyle: block <= 30 ? "short_frequent" : "long_rare",
      musicPref: music as WorkPreferences["musicPref"],
      interaction: interaction as WorkPreferences["interaction"],
      schedulePref: schedule,
      daysAvailable: days,
      hostComfort: host as WorkPreferences["hostComfort"],
    });
    router.push("/onboarding");
  };

  return (
    <div className="px-6 pt-14 pb-8">
      <Link href="/onboarding" className="inline-flex items-center gap-2 text-sm text-text-dim mb-6">
        <ArrowLeft size={16} /> Volver
      </Link>

      {/* Educational explanation */}
      <div className="p-4 bg-lavender-dim border border-lavender-border rounded-xl mb-6">
        <p className="text-xs text-lavender leading-relaxed">
          <strong>¿Por qué hacemos esto?</strong> Si vos necesitás silencio
          absoluto y tu match habla constantemente, ese match va a ser
          desastroso aunque compartan 5 de 5 valores. Tu estilo de trabajo es
          clave para la compatibilidad.
        </p>
      </div>

      <h1 className="font-serif text-2xl mb-1">Tu estilo de trabajo</h1>
      <p className="text-xs text-text-muted mb-8">
        Así armamos el Session Blueprint perfecto para cada sesión
      </p>

      <div className="flex flex-col gap-8 mb-8">
        {/* Noise preference */}
        <Section title="Nivel de ruido preferido">
          <div className="flex flex-col gap-2">
            {NOISE_OPTIONS.map((opt) => (
              <OptionButton
                key={opt.value}
                selected={noise === opt.value}
                onClick={() => setNoise(opt.value)}
                label={`${opt.emoji} ${opt.label}`}
              />
            ))}
          </div>
        </Section>

        {/* Block duration */}
        <Section title="Duración de bloques de trabajo">
          <div className="grid grid-cols-2 gap-2">
            {BLOCK_OPTIONS.map((opt) => (
              <OptionButton
                key={opt.value}
                selected={block === opt.value}
                onClick={() => setBlock(opt.value)}
                label={opt.label}
              />
            ))}
          </div>
        </Section>

        {/* Interaction style */}
        <Section title="Interacción durante la sesión">
          <div className="flex flex-col gap-2">
            {INTERACTION_OPTIONS.map((opt) => (
              <OptionButton
                key={opt.value}
                selected={interaction === opt.value}
                onClick={() => setInteraction(opt.value)}
                label={opt.label}
              />
            ))}
          </div>
        </Section>

        {/* Music */}
        <Section title="Música">
          <div className="flex gap-2 flex-wrap">
            {[
              { value: "none", label: "Sin música" },
              { value: "background", label: "Ambiente" },
              { value: "headphones", label: "Auriculares" },
            ].map((opt) => (
              <OptionButton
                key={opt.value}
                selected={music === opt.value}
                onClick={() => setMusic(opt.value)}
                label={opt.label}
                compact
              />
            ))}
          </div>
        </Section>

        {/* Schedule */}
        <Section title="¿Cuándo preferís juntarte?">
          <div className="flex gap-2">
            {SCHEDULES.map((opt) => (
              <button
                key={opt.value}
                onClick={() => toggleItem(schedule, opt.value, setSchedule)}
                className={`flex-1 p-3 rounded-xl text-center transition-all active:scale-95 border ${
                  schedule.includes(opt.value)
                    ? "bg-accent-dim border-accent-border text-accent"
                    : "bg-surface border-border text-text-dim"
                }`}
              >
                <div className="text-sm font-medium">{opt.label}</div>
                <div className="text-[10px] opacity-60">{opt.sub}</div>
              </button>
            ))}
          </div>
        </Section>

        {/* Days */}
        <Section title="Días disponibles">
          <div className="flex gap-2">
            {DAYS.map((day) => (
              <button
                key={day.value}
                onClick={() => toggleItem(days, day.value, setDays)}
                className={`w-10 h-10 rounded-full text-xs font-semibold flex items-center justify-center transition-all active:scale-95 border ${
                  days.includes(day.value)
                    ? "bg-accent-dim border-accent-border text-accent"
                    : "bg-surface border-border text-text-muted"
                }`}
              >
                {day.label}
              </button>
            ))}
          </div>
        </Section>

        {/* Host comfort */}
        <Section title="¿Dónde te sentís cómodo?">
          <div className="grid grid-cols-2 gap-2">
            {HOST_OPTIONS.map((opt) => (
              <OptionButton
                key={opt.value}
                selected={host === opt.value}
                onClick={() => setHost(opt.value)}
                label={`${opt.emoji} ${opt.label}`}
              />
            ))}
          </div>
        </Section>
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

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h3 className="text-sm font-semibold mb-3">{title}</h3>
      {children}
    </motion.div>
  );
}

function OptionButton({
  selected,
  onClick,
  label,
  compact = false,
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
  compact?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`${
        compact ? "px-4 py-2" : "px-4 py-3"
      } rounded-xl text-sm text-left transition-all active:scale-[0.98] border ${
        selected
          ? "bg-accent-dim border-accent-border text-accent font-medium"
          : "bg-surface border-border text-text-dim hover:border-border-light"
      }`}
    >
      {label}
    </button>
  );
}
