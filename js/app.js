// js/app.js

// --- Schadensdaten und Icon-Dateinamen ---
const damageData = {
  "Arrows":             { "11": 93,   "15": 135 },
  "Earthquake":         { "11": 159,  "15": 234 },
  "Fireball":           { "11": 207,  "15": 300 },
  "Freeze":             { "11": 35,   "15": 51  },
  "Giant Snowball":     { "11": 54,   "15": 78  },
  "Goblin Curse":       { "11": 36,   "15": 54  },
  "Lightning":          { "11": 317,  "15": 462 },
  "Poison":             { "11": 184,  "15": 264 },
  "Rage":               { "11": 45,   "15": 65  },
  "Log":                { "11": 40,   "15": 58  },
  "Tornado":            { "11": 27,   "15": 38  },
  "Void (1 Target)":    { "11": 48,   "15": 70  },
  "Void (2–4 Targets)": { "11": 25,   "15": 37  },
  "Void (5+ Targets)":  { "11": 17,   "15": 26  },
  "Zap":                { "11": 58,   "15": 84  },
  "Evo Zap":            { "11": 116,  "15": 168 },
  "Rocket":             { "11": 371,  "15": 542 }
};

const filenameMap = {
  "Arrows":             "arrows",
  "Earthquake":         "earthquake",
  "Fireball":           "fireball",
  "Freeze":             "freeze",
  "Giant Snowball":     "giant_snowball",
  "Goblin Curse":       "goblin_curse",
  "Lightning":          "lightning",
  "Poison":             "poison",
  "Rage":               "rage",
  "Log":                "log",
  "Tornado":            "tornado",
  "Void (1 Target)":    "void",
  "Void (2–4 Targets)": "void",
  "Void (5+ Targets)":  "void",
  "Zap":                "zap",
  "Evo Zap":            "evo_zap",
  "Rocket":             "rocket"
};

const allSpells     = Object.keys(damageData);
let currentSpells   = [...allSpells];
let currentLevel    = "11";

function buildSpellSelectors() {
  const container = document.getElementById("spell-selectors");
  container.innerHTML = "";

  for (let i = 0; i < 4; i++) {
    const row = document.createElement("div");
    row.className = "flex items-center space-x-4";

    const img = document.createElement("img");
    img.className = "h-12 w-12 object-contain";
    row.appendChild(img);

    const sel = document.createElement("select");
    sel.className = `
      flex-1 appearance-none bg-white dark:bg-gray-800
      border border-gray-400 rounded-[7.5px] px-4 py-3 pr-10
      bg-[url('/img/ui/dropdown-inactive.svg')] bg-no-repeat bg-right bg-center
      text-gray-800 dark:text-gray-100
      focus:outline-none focus:ring-2 focus:ring-primary
    `.trim();

    let opts = `<option value="">-- none --</option>`;
    currentSpells.forEach(sp => {
      if (sp === "Zap/Evo") {
        opts += `<optgroup label="Zap options">
          <option value="Zap">Zap</option>
          <option value="Evo Zap">Evo Zap</option>
        </optgroup>`;
      } else {
        opts += `<option value="${sp}">${sp}</option>`;
      }
    });
    sel.innerHTML = opts;

    sel.addEventListener("change", () => {
      if (sel.value) {
        img.src = `img/spells/${filenameMap[sel.value]}.png`;
        img.alt = sel.value;
      } else {
        img.src = "";
        img.alt = "";
      }
      updateSelectOptions();
      document.getElementById("result").classList.add("hidden");
    });

    row.appendChild(sel);
    container.appendChild(row);
  }

  updateSelectOptions();
}

function updateSelectOptions() {
  const selects = Array.from(document.querySelectorAll("#spell-selectors select"));
  const chosen  = selects.map(s => s.value).filter(v => v);

  selects.forEach(sel => {
    const own = sel.value;
    const others = chosen.filter(v => v !== own);

    Array.from(sel.options).forEach(opt => {
      if (!opt.value) {
        opt.disabled = false;
        return;
      }
      const val = opt.value;
      const used = others.includes(val);
      const isVoid = val.startsWith("Void");
      const voidConflict = isVoid && others.some(v => v.startsWith("Void"));
      const zapConflict = (val === "Zap" && others.includes("Evo Zap")) ||
                          (val === "Evo Zap" && others.includes("Zap"));

      opt.disabled = used || voidConflict || zapConflict;
    });
  });
}

function calculateDamage() {
  let total = 0;
  document.querySelectorAll("#spell-selectors select").forEach(sel => {
    if (sel.value) total += damageData[sel.value][currentLevel];
  });
  const res = document.getElementById("result");
  res.textContent = `Total Damage @ Lvl ${currentLevel}: ${total}`;
  res.classList.remove("hidden");
}

function initLevelToggle() {
  document.querySelectorAll('input[name="level"]').forEach(rb => {
    rb.addEventListener("change", () => {
      currentLevel = rb.value;
      document.getElementById("result").classList.add("hidden");
    });
  });
}

function initSegmentedToggle() {
  const svgToggle = document.getElementById("level-toggle");
  if (!svgToggle) return;

  const updateSVG = () => {
    const isDark = document.documentElement.classList.contains("dark");
    const src = `img/segmented/segmented-${isDark ? "dark" : "light"}-${currentLevel}.svg`;
    svgToggle.setAttribute("src", src);
  };

  svgToggle.addEventListener("click", () => {
    currentLevel = currentLevel === "11" ? "15" : "11";
    document.querySelectorAll('input[name="level"]').forEach(rb => {
      rb.checked = rb.value === currentLevel;
    });
    document.getElementById("result").classList.add("hidden");
    updateSVG();
  });

  const observer = new MutationObserver(updateSVG);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

  updateSVG();
}

function importDeck() {
  const input = document.getElementById("deck-link").value.trim();
  const m = input.match(/[?&]deck=([^&]+)/);
  if (!m) return alert("Ungültiger Deck-Link");
  const ids = m[1].split(";");
  const mapId = {
    "28000001":"Arrows","28000014":"Earthquake","28000000":"Fireball",
    "28000005":"Freeze","28000017":"Giant Snowball","28000024":"Goblin Curse",
    "28000007":"Lightning","28000009":"Poison","28000002":"Rage",
    "28000011":"Log","28000012":"Tornado","28000023":"Void (1 Target)",
    "28000008":"Zap","28000003":"Rocket"
  };

  let spells = ids.map(id => mapId[id]).filter(n => n && damageData[n]);
  const hasZap  = spells.includes("Zap");
  const hasEvo  = spells.includes("Evo Zap");
  const voids   = spells.filter(s => s.startsWith("Void"));

  spells = Array.from(new Set(spells.filter(s => !["Zap","Evo Zap"].includes(s))));
  if (hasZap || hasEvo) spells.push("Zap/Evo");
  voids.length && spells.push(...voids.filter((v,i)=>voids.indexOf(v)===i));

  if (!spells.length) return alert("In diesem Deck keine Spells gefunden");

  currentSpells = spells;
  buildSpellSelectors();

  document.querySelectorAll("#spell-selectors select").forEach((sel,i) => {
    const sp = spells[i] || "";
    if (sp === "Zap/Evo") {
      sel.value = hasZap ? "Zap" : "Evo Zap";
    } else {
      sel.value = sp;
    }
    sel.dispatchEvent(new Event("change"));
  });
}

function resetDeck() {
  currentSpells = [...allSpells];
  buildSpellSelectors();
  document.getElementById("deck-link").value = "";
  document.getElementById("result").classList.add("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
  buildSpellSelectors();
  initLevelToggle();
  initSegmentedToggle();
  document.getElementById("calculate").addEventListener("click", calculateDamage);
  document.getElementById("import-deck").addEventListener("click", importDeck);
  document.getElementById("reset-deck").addEventListener("click", resetDeck);
});
