// fetchSpells.js

import dotenv from "dotenv";
dotenv.config();

import fetch from "node-fetch";
import fs from "fs";

const API_KEY = process.env.CR_API_KEY;
const API_URL = "https://api.clashroyale.com/v1/cards";

async function main() {
  console.log("Fetching cards from Clash Royale API…");

  const res = await fetch(API_URL, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);

  const data = await res.json();

  // Debug: Wo ist das Array?
  let cardsArray = null;
  if (Array.isArray(data)) {
    cardsArray = data;
    console.log("✅ Response is an Array with", cardsArray.length, "cards");
  }
  else if (Array.isArray(data.items)) {
    cardsArray = data.items;
    console.log("✅ Response.items is an Array with", cardsArray.length, "cards");
  }
  else if (Array.isArray(data.cards)) {
    cardsArray = data.cards;
    console.log("✅ Response.cards is an Array with", cardsArray.length, "cards");
  }
  else {
    console.error("❌ Cannot find cards array in response!");
    console.error(Object.keys(data));
    process.exit(1);
  }

  // Filtere nur Spell-Karten
  const spells = cardsArray.filter((card) => card.type === "Spell");
  console.log("🔍 Found", spells.length, "spells");

  const damageData   = {};
  const idToCardName = {};
  const iconUrls     = {};

  for (const card of spells) {
    idToCardName[card.id] = card.name;

    // manche Karten haben .levels, andere .stats; wir versuchen beides
    const lvl11 =
      card.levels?.[10]?.damage ??
      card.stats?.[10]?.damage ??
      0;
    const lvl15 =
      card.levels?.[14]?.damage ??
      card.stats?.[14]?.damage ??
      0;
    damageData[card.name] = { "11": lvl11, "15": lvl15 };

    // Icon-URL (medium oder small)
    iconUrls[card.name] =
      card.iconUrls?.medium ||
      card.iconUrls?.small ||
      "";
  }

  const output = { damageData, idToCardName, iconUrls };
  fs.writeFileSync("js/spellData.json", JSON.stringify(output, null, 2));
  console.log("✅ js/spellData.json erzeugt");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
