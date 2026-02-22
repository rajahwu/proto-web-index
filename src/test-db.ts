import 'dotenv/config';
import { supabase, LITE_GAME_TABLES } from "./app/config/supabase";

async function testConnection() {
  console.log("🔍 Testing Supabase connection...");

  // Test 1: Fetch levels
  const { data: levels, error: levelsError } = await supabase
    .from(LITE_GAME_TABLES.LEVELS)
    .select("*");

  if (levelsError) {
    console.error("❌ Levels fetch failed:", levelsError);
  } else {
    console.log("✅ Levels:", levels);
  }

  // Test 2: Fetch cards
  const { data: cards, error: cardsError } = await supabase
    .from(LITE_GAME_TABLES.CARDS)
    .select("*");

  if (cardsError) {
    console.error("❌ Cards fetch failed:", cardsError);
  } else {
    console.log("✅ Cards count:", cards?.length);
  }

  // Test 3: Create test player
  const { data: player, error: playerError } = await supabase
    .from(LITE_GAME_TABLES.PLAYERS)
    .insert({
      username: "test_player",
      character_class: "seraph",
      character_name: "Testiel",
    })
    .select()
    .single();

  if (playerError) {
    console.error("❌ Player creation failed:", playerError);
  } else {
    console.log("✅ Test player created:", player);

    // Clean up
    await supabase.from(LITE_GAME_TABLES.PLAYERS).delete().eq("id", player.id);
    console.log("✅ Test player deleted");
  }
}

testConnection();
