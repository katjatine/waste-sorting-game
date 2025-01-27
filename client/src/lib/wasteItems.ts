export interface WasteItem {
  id: number;
  name: string;
  imageUrl: string;
  isPMD: boolean;
}

export const wasteItems: WasteItem[] = [
  {
    id: 1,
    name: "Plastic Fles",
    imageUrl: "https://images.unsplash.com/photo-1610725079793-6c7dfd7f2150",
    isPMD: true
  },
  {
    id: 2,
    name: "Glazen Pot",
    imageUrl: "https://images.unsplash.com/photo-1495556650867-99590cea3657",
    isPMD: false
  },
  {
    id: 3,
    name: "Drankkarton",
    imageUrl: "https://images.unsplash.com/photo-1523293915678-d126868e96f1",
    isPMD: true
  },
  {
    id: 4,
    name: "Conservenblik",
    imageUrl: "https://images.unsplash.com/photo-1606037150583-fb842a55bae7",
    isPMD: true
  },
  {
    id: 5,
    name: "Papieren Zak",
    imageUrl: "https://images.unsplash.com/photo-1472289065668-ce650ac443d2",
    isPMD: false
  }
];

export function getRandomWasteItems(count: number): WasteItem[] {
  const shuffled = [...wasteItems].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
