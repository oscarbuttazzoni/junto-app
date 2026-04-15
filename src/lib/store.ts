import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * JUNTO Local Store
 * Persists all user data in localStorage for the no-auth MVP.
 * When Supabase is connected, this data will sync to the database.
 */

export interface UserProfile {
  name: string;
  email: string;
  city: string;
  jobTitle: string;
  industry: string;
  workType: "remote" | "hybrid" | "freelance";
}

export interface OnboardingValues {
  valuesRanked: string[]; // Top 5 values from tournament
  rawTournament: { round: number; winner: string; loser: string }[];
}

export interface OnboardingWheel {
  career: number;
  health: number;
  relationships: number;
  finances: number;
  fun: number;
  growth: number;
  family: number;
  environment: number;
}

export interface OnboardingIkigai {
  love: string[];
  goodAt: string[];
  worldNeeds: string[];
  paidFor: string[];
}

export interface WorkPreferences {
  noisePref: "silence" | "low" | "conversation";
  blockMinutes: number;
  breakStyle: "short_frequent" | "long_rare";
  musicPref: "none" | "background" | "headphones";
  interaction: "minimal" | "breaks_only" | "throughout";
  schedulePref: string[]; // 'morning', 'afternoon', 'evening'
  daysAvailable: string[]; // 'mon', 'tue', etc.
  hostComfort: "my_place" | "their_place" | "public_only" | "any";
}

export interface SessionFeedback {
  sessionId: string;
  tags: string[];
  validationNote: string;
  placeReview?: {
    wifi: boolean;
    outlets: boolean;
    noiseLevel: "low" | "medium" | "high";
    costLevel: "free" | "cheap" | "moderate" | "expensive";
    wouldReturn: boolean;
    moodTags: string[];
  };
}

export interface MockUser {
  id: string;
  name: string;
  jobTitle: string;
  industry: string;
  values: string[];
  workStyle: string;
  blockMinutes: number;
  distance: number; // km
  schedulePref: string[];
  isWildcard?: boolean;
}

export interface Session {
  id: string;
  matchId: string;
  matchName: string;
  type: "coworking" | "social" | "mixed";
  place: string;
  scheduledAt: string; // ISO date
  status: "scheduled" | "in_progress" | "completed" | "cancelled";
  feedback?: SessionFeedback;
}

interface JuntoStore {
  // Profile
  profile: UserProfile | null;
  setProfile: (profile: UserProfile) => void;

  // Onboarding completion tracking
  onboardingCompleted: {
    values: boolean;
    wheel: boolean;
    ikigai: boolean;
    style: boolean;
  };

  // Values tournament
  values: OnboardingValues | null;
  setValues: (values: OnboardingValues) => void;

  // Wheel of Life
  wheel: OnboardingWheel | null;
  setWheel: (wheel: OnboardingWheel) => void;

  // Ikigai
  ikigai: OnboardingIkigai | null;
  setIkigai: (ikigai: OnboardingIkigai) => void;

  // Work preferences
  workPreferences: WorkPreferences | null;
  setWorkPreferences: (prefs: WorkPreferences) => void;

  // Sessions
  sessions: Session[];
  addSession: (session: Session) => void;
  updateSession: (id: string, updates: Partial<Session>) => void;

  // Matches available count
  matchesAvailable: number;
  unlockMatches: (count: number) => void;

  // Reset everything
  reset: () => void;
}

const initialOnboardingState = {
  values: false,
  wheel: false,
  ikigai: false,
  style: false,
};

export const useStore = create<JuntoStore>()(
  persist(
    (set) => ({
      profile: null,
      setProfile: (profile) => set({ profile }),

      onboardingCompleted: { ...initialOnboardingState },

      values: null,
      setValues: (values) =>
        set((state) => ({
          values,
          onboardingCompleted: { ...state.onboardingCompleted, values: true },
        })),

      wheel: null,
      setWheel: (wheel) =>
        set((state) => ({
          wheel,
          onboardingCompleted: { ...state.onboardingCompleted, wheel: true },
        })),

      ikigai: null,
      setIkigai: (ikigai) =>
        set((state) => ({
          ikigai,
          onboardingCompleted: { ...state.onboardingCompleted, ikigai: true },
        })),

      workPreferences: null,
      setWorkPreferences: (workPreferences) =>
        set((state) => ({
          workPreferences,
          onboardingCompleted: { ...state.onboardingCompleted, style: true },
        })),

      sessions: [],
      addSession: (session) =>
        set((state) => ({ sessions: [...state.sessions, session] })),
      updateSession: (id, updates) =>
        set((state) => ({
          sessions: state.sessions.map((s) =>
            s.id === id ? { ...s, ...updates } : s
          ),
        })),

      matchesAvailable: 3,
      unlockMatches: (count) =>
        set((state) => ({
          matchesAvailable: state.matchesAvailable + count,
        })),

      reset: () =>
        set({
          profile: null,
          onboardingCompleted: { ...initialOnboardingState },
          values: null,
          wheel: null,
          ikigai: null,
          workPreferences: null,
          sessions: [],
          matchesAvailable: 3,
        }),
    }),
    {
      name: "junto-store", // localStorage key
    }
  )
);
