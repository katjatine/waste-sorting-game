export interface WasteItem {
  id: number;
  name: string;
  imageUrl: string;
  category: 'PMD' | 'REST' | 'GFT' | 'GLAS' | 'PAPIER';
  difficulty: 'easy' | 'medium' | 'hard';
  explanation: string;
}

export const wasteItems: WasteItem[] = [
  {
    id: 1,
    name: "Plastic Fles",
    imageUrl: "https://images.unsplash.com/photo-1610725079793-6c7dfd7f2150",
    category: "PMD",
    difficulty: "easy",
    explanation: "Plastic flessen horen bij PMD omdat ze gerecycleerd kunnen worden tot nieuwe plastic producten."
  },
  {
    id: 2,
    name: "Glazen Pot",
    imageUrl: "https://images.unsplash.com/photo-1495556650867-99590cea3657",
    category: "GLAS",
    difficulty: "easy",
    explanation: "Glazen potten gaan in de glascontainer voor recyclage tot nieuw glas."
  },
  {
    id: 3,
    name: "Drankkarton",
    imageUrl: "https://images.unsplash.com/photo-1523293915678-d126868e96f1",
    category: "PMD",
    difficulty: "medium",
    explanation: "Drankkartons zijn gemaakt van verschillende materialen maar horen bij PMD omdat ze speciaal gerecycleerd kunnen worden."
  },
  {
    id: 4,
    name: "Conservenblik",
    imageUrl: "https://images.unsplash.com/photo-1606037150583-fb842a55bae7",
    category: "PMD",
    difficulty: "medium",
    explanation: "Metalen verpakkingen zoals conservenblikken gaan bij PMD voor recyclage tot nieuw metaal."
  },
  {
    id: 5,
    name: "Papieren Zak",
    imageUrl: "https://images.unsplash.com/photo-1472289065668-ce650ac443d2",
    category: "PAPIER",
    difficulty: "easy",
    explanation: "Papier en karton worden apart ingezameld om te recycleren tot nieuw papier."
  },
  {
    id: 6,
    name: "Bananenschil",
    imageUrl: "https://images.unsplash.com/photo-1481349518771-20055b2a7b24",
    category: "GFT",
    difficulty: "medium",
    explanation: "Fruit- en groenteresten zijn biologisch afbreekbaar en horen bij GFT voor compostering."
  },
  {
    id: 7,
    name: "Plastic Speelgoed",
    imageUrl: "https://images.unsplash.com/photo-1558060370-d644479cb6f7",
    category: "REST",
    difficulty: "hard",
    explanation: "Plastic speelgoed is geen verpakking en kan niet bij PMD. Dit hoort bij restafval."
  }
];

export interface GameSettings {
  difficulty: 'easy' | 'medium' | 'hard';
  categories: WasteItem['category'][];
  itemCount: number;
}

const DEFAULT_SETTINGS: GameSettings = {
  difficulty: 'easy',
  categories: ['PMD', 'REST'],
  itemCount: 10
};

export function getRandomWasteItems(settings: GameSettings = DEFAULT_SETTINGS): WasteItem[] {
  const filteredItems = wasteItems.filter(item => 
    settings.categories.includes(item.category) && 
    (settings.difficulty === 'hard' || item.difficulty === settings.difficulty)
  );

  const shuffled = [...filteredItems].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, settings.itemCount);
}