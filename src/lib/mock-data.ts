import type { MockUser } from "./store";

/**
 * Mock users for the no-auth MVP.
 * These simulate what the matching engine would return.
 * When Supabase is connected, these are replaced with real user data.
 */
export const MOCK_MATCHES: MockUser[] = [
  {
    id: "m1",
    name: "Camila",
    jobTitle: "Diseñadora gráfica",
    industry: "Diseño",
    values: ["Creatividad", "Libertad", "Honestidad", "Empatía", "Autenticidad"],
    workStyle: "silence",
    blockMinutes: 45,
    distance: 2.3,
    schedulePref: ["morning"],
  },
  {
    id: "m2",
    name: "Thomas",
    jobTitle: "Data Scientist",
    industry: "Tecnología",
    values: ["Curiosidad", "Crecimiento", "Disciplina", "Honestidad", "Colaboración"],
    workStyle: "breaks_only",
    blockMinutes: 45,
    distance: 4.1,
    schedulePref: ["morning", "afternoon"],
  },
  {
    id: "m3",
    name: "Valentina",
    jobTitle: "Content Strategist",
    industry: "Marketing",
    values: ["Creatividad", "Comunidad", "Autenticidad", "Diversión", "Empatía"],
    workStyle: "conversation",
    blockMinutes: 25,
    distance: 1.8,
    schedulePref: ["afternoon"],
  },
  {
    id: "m4",
    name: "Daniel",
    jobTitle: "Ingeniero de software",
    industry: "Fintech",
    values: ["Disciplina", "Crecimiento", "Independencia", "Justicia", "Ambición"],
    workStyle: "silence",
    blockMinutes: 90,
    distance: 8.5,
    schedulePref: ["morning"],
    isWildcard: true,
  },
];

/**
 * Generate match explanation based on shared values and complementary traits.
 */
export function generateExplanation(
  userValues: string[],
  match: MockUser
): { shared: string[]; complement: string; score: number } {
  const shared = userValues.filter((v) => match.values.includes(v));
  const matchUnique = match.values.filter((v) => !userValues.includes(v));

  const valueScore = (shared.length / 5) * 35;
  const styleScore = 20; // Simplified for mock
  const locationScore = Math.max(0, (1 - match.distance / 20) * 20);
  const scheduleScore = 8; // Simplified
  const workScore = 7; // Simplified
  const totalScore = Math.round(
    valueScore + styleScore + locationScore + scheduleScore + workScore
  );

  const complement =
    matchUnique.length > 0
      ? `Perspectivas complementarias: ${match.industry} + tu área.${
          matchUnique.length > 0
            ? ` Valora ${matchUnique.slice(0, 2).join(" y ")}.`
            : ""
        }`
      : "Perfil muy compatible con el tuyo.";

  return { shared, complement, score: Math.min(totalScore, 98) };
}
