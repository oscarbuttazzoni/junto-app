/**
 * JUNTO Constants
 * Central place for all predefined options, tags, and values used across the app.
 */

// Values for the Values Tournament (onboarding)
// 16 values → 4 rounds → top 5 selected
export const VALUES_POOL = [
  "Creatividad",
  "Estabilidad",
  "Libertad",
  "Comunidad",
  "Honestidad",
  "Ambición",
  "Curiosidad",
  "Empatía",
  "Independencia",
  "Colaboración",
  "Autenticidad",
  "Crecimiento",
  "Diversión",
  "Disciplina",
  "Justicia",
  "Gratitud",
] as const;

// Wheel of Life dimensions
export const WHEEL_DIMENSIONS = [
  { key: "career", label: "Carrera", emoji: "💼" },
  { key: "health", label: "Salud", emoji: "🏃" },
  { key: "relationships", label: "Relaciones", emoji: "❤️" },
  { key: "finances", label: "Finanzas", emoji: "💰" },
  { key: "fun", label: "Diversión", emoji: "🎉" },
  { key: "growth", label: "Crecimiento", emoji: "🌱" },
  { key: "family", label: "Familia", emoji: "👨‍👩‍👧" },
  { key: "environment", label: "Entorno", emoji: "🏠" },
] as const;

// Ikigai categories with predefined tags
export const IKIGAI_OPTIONS = {
  love: [
    "Crear", "Enseñar", "Resolver problemas", "Diseñar",
    "Escribir", "Analizar datos", "Conectar personas", "Construir productos",
    "Investigar", "Cocinar", "Música", "Deporte",
  ],
  good_at: [
    "Comunicación", "Programación", "Diseño", "Análisis",
    "Liderazgo", "Negociación", "Escritura", "Organización",
    "Ventas", "Estrategia", "Creatividad", "Escucha activa",
  ],
  world_needs: [
    "Educación", "Salud mental", "Sustentabilidad", "Conexión humana",
    "Tecnología accesible", "Justicia social", "Innovación", "Arte y cultura",
  ],
  paid_for: [
    "Desarrollo de software", "Diseño", "Marketing", "Consultoría",
    "Freelance", "Emprendimiento", "Data / Analytics", "Contenido / Media",
    "Finanzas", "Producto", "Ventas", "Otro",
  ],
} as const;

// Work style preferences
export const NOISE_OPTIONS = [
  { value: "silence", label: "Silencio total", emoji: "🔇" },
  { value: "low", label: "Ruido bajo", emoji: "🔈" },
  { value: "conversation", label: "Conversación", emoji: "🗣️" },
] as const;

export const BLOCK_OPTIONS = [
  { value: 25, label: "25 min (Pomodoro)" },
  { value: 45, label: "45 min" },
  { value: 60, label: "60 min" },
  { value: 90, label: "90 min (deep work)" },
] as const;

export const INTERACTION_OPTIONS = [
  { value: "minimal", label: "Mínima — prefiero silencio" },
  { value: "breaks_only", label: "Solo en breaks" },
  { value: "throughout", label: "Conversación durante el trabajo" },
] as const;

// Feedback tags (post-session)
export const FEEDBACK_TAGS = [
  { key: "good_conversation", label: "Buena conversación", emoji: "💬" },
  { key: "respectful_silence", label: "Respetuoso con silencios", emoji: "🤫" },
  { key: "made_me_think", label: "Me hizo pensar distinto", emoji: "💡" },
  { key: "punctual", label: "Puntual", emoji: "⏰" },
  { key: "good_energy", label: "Buena energía", emoji: "⚡" },
  { key: "felt_comfortable", label: "Me sentí cómodo/a", emoji: "😊" },
  { key: "learned_something", label: "Aprendí algo nuevo", emoji: "📚" },
  { key: "want_to_repeat", label: "Quiero repetir", emoji: "🔄" },
] as const;

// Place review icons
export const PLACE_REVIEW_OPTIONS = {
  wifi: { label: "WiFi", emoji: "📶" },
  outlets: { label: "Enchufes", emoji: "🔌" },
  noise: {
    options: [
      { value: "low", label: "Silencioso", emoji: "🔇" },
      { value: "medium", label: "Moderado", emoji: "🔈" },
      { value: "high", label: "Ruidoso", emoji: "🔊" },
    ],
  },
  cost: {
    options: [
      { value: "free", label: "Gratis", emoji: "🆓" },
      { value: "cheap", label: "Barato", emoji: "💲" },
      { value: "moderate", label: "Moderado", emoji: "💲💲" },
      { value: "expensive", label: "Caro", emoji: "💲💲💲" },
    ],
  },
  would_return: { label: "Volvería", emoji: "👍" },
} as const;

// Place mood tags
export const MOOD_TAGS = [
  "Conversaciones profundas",
  "Silencio con compañía",
  "Vibes casuales",
  "Al aire libre",
  "Para noches",
  "Buen café",
  "Espacioso",
  "Acogedor",
] as const;

// Warm-up questions bank
export const WARMUP_QUESTIONS = [
  "¿En qué estás trabajando hoy?",
  "¿Qué es lo más interesante que te pasó esta semana?",
  "¿Qué estás aprendiendo últimamente?",
  "¿Cuál es tu objetivo para hoy?",
  "¿Leíste o escuchaste algo interesante esta semana?",
  "¿Qué es lo mejor de trabajar remoto para vos?",
  "Si pudieras trabajar desde cualquier lugar del mundo, ¿dónde sería?",
  "¿Qué descubriste de tu barrio desde que trabajás remoto?",
] as const;

// Matching weights (MVP hardcoded)
export const MATCHING_WEIGHTS = {
  values: 0.35,
  work_style: 0.25,
  location: 0.20,
  schedule: 0.10,
  work_type: 0.10,
} as const;
