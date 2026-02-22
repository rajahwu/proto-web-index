// src/app/config.ts
export const config = {
  // In browser (Vite): use import.meta.env
  // In Node.js (tsx): use process.env (loaded by dotenv)
  supabaseUrl:
    (typeof import.meta !== "undefined" &&
      import.meta.env?.VITE_SUPABASE_URL) ||
    process.env.VITE_SUPABASE_URL ||
    "",
  supabaseKey:
    (typeof import.meta !== "undefined" &&
      import.meta.env?.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY) ||
    process.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY ||
    "",
};

export function assertConfig() {
  const missing: string[] = [];
  if (!config.supabaseUrl) missing.push("VITE_SUPABASE_URL");
  if (!config.supabaseKey)
    missing.push("VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY");
  if (missing.length) {
    throw new Error(
      `Missing required env var(s): ${missing.join(", ")}. Copy .env.example → .env and fill values.`,
    );
  }
}
