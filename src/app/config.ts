export const config = {
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL as string,
  supabaseKey: import.meta.env.VITE_SUPABASE_ANON_KEY as string,
};

export function assertConfig() {
  const missing: string[] = [];
  if (!config.supabaseUrl) missing.push("VITE_SUPABASE_URL");
  if (!config.supabaseKey) missing.push("VITE_SUPABASE_ANON_KEY");

  if (missing.length) {
    throw new Error(
      `Missing required env var(s): ${missing.join(", ")}. Copy .env.example → .env and fill values.`,
    );
  }
}
