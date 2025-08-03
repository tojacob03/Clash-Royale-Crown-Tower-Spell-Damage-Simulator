// inspectCard.js

import dotenv from "dotenv";
dotenv.config();

import fetch from "node-fetch";

const API_KEY = process.env.CR_API_KEY;
const API_URL = "https://api.clashroyale.com/v1/cards";

async function main() {
  const res = await fetch(API_URL, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);

  const data = await res.json();
  const cards = Array.isArray(data.items) ? data.items : data;
  const card = cards[0];

  console.log("Erstes Card-Objekt (nur Keys):");
  console.log(Object.keys(card).sort().join("\n• "), "\n");

  console.log("Beispiel-Wert für einen Spell-Fall:");
  // Falls es hier eine Unterstruktur zum Typ gibt, siehst du es hier
  console.dir(card, { depth: 2, colors: true });

  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
