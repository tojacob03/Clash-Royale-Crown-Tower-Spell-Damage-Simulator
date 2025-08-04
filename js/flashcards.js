const flashcards = [
  { spell: "Arrows", damage: 93 },
  { spell: "Earthquake", damage: 159 },
  { spell: "Fireball", damage: 207 },
  { spell: "Freeze", damage: 35 },
  { spell: "Giant Snowball", damage: 54 },
  { spell: "Goblin Curse", damage: 36 },
  { spell: "Lightning", damage: 317 },
  { spell: "Poison", damage: 184 },
  { spell: "Rage", damage: 54 },
  { spell: "Log", damage: 40 },
  { spell: "Tornado", damage: 27 },
  { spell: "Void (1 Target)", damage: 48 },
  { spell: "Void (2–4 Targets)", damage: 25 },
  { spell: "Void (5+ Targets)", damage: 17 },
  { spell: "Zap", damage: 58 },
  { spell: "Evo Zap", damage: 116 },
  { spell: "Rocket", damage: 371 },
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
  "Rocket": "rocket",
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
  backEl.textContent = `${damage} Damage (Level 11)`;

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
