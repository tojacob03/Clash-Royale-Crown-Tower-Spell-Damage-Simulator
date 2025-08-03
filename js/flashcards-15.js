// js/flashcards-15.js

const flashcards = [
  { spell: "Arrows", damage: 135 },
  { spell: "Earthquake", damage: 234 },
  { spell: "Fireball", damage: 300 },
  { spell: "Freeze", damage: 51 },
  { spell: "Giant Snowball", damage: 78 },
  { spell: "Goblin Curse", damage: 54 },
  { spell: "Lightning", damage: 462 },
  { spell: "Poison", damage: 264 },
  { spell: "Rage", damage: 65 },
  { spell: "Log", damage: 58 },
  { spell: "Tornado", damage: 38 },
  { spell: "Void (1 Target)", damage: 70 },
  { spell: "Void (2–4 Targets)", damage: 37 },
  { spell: "Void (5+ Targets)", damage: 26 },
  { spell: "Zap", damage: 84 },
  { spell: "Evo Zap", damage: 168 },
  { spell: "Rocket", damage: 542 }
];

const filenameMap = {
  "Arrows": "arrows",
  "Earthquake": "earthquake",
  "Fireball": "fireball",
  "Freeze": "freeze",
  "Giant Snowball": "giant_snowball",
  "Goblin Curse": "goblin_curse",
  "Lightning": "lightning",
  "Poison": "poison",
  "Rage": "rage",
  "Log": "log",
  "Tornado": "tornado",
  "Void (1 Target)": "void",
  "Void (2–4 Targets)": "void",
  "Void (5+ Targets)": "void",
  "Zap": "zap",
  "Evo Zap": "evo_zap",
  "Rocket": "rocket"
};

let currentIndex = 0;
let flipped = false;

const cardEl = document.getElementById("flashcard");
const frontEl = document.getElementById("card-front");
const backEl = document.getElementById("card-back");

function updateCard() {
  const { spell, damage } = flashcards[currentIndex];
  const iconPath = `img/spells/${filenameMap[spell]}.png`;

  frontEl.innerHTML = `
    <div class="flex flex-col items-center space-y-4">
      <img src="${iconPath}" alt="${spell}" class="h-16 w-16 object-contain" />
      <span>${spell}</span>
    </div>
  `;
  backEl.textContent = `${damage} Damage (Level 15)`;

  flipped = false;
  cardEl.classList.remove("rotate-y-180");
}

document.getElementById("next-card").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % flashcards.length;
  updateCard();
});

cardEl.addEventListener("click", () => {
  flipped = !flipped;
  cardEl.classList.toggle("rotate-y-180", flipped);
});

updateCard();
