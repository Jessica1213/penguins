import { Hero } from "@/components/home/Hero";
import { HomeHighlights } from "@/components/home/HomeHighlights";
import { GlobalGallery } from "@/components/gallery/GlobalGallery";
import { getPenguins, getMemories } from "@/lib/data";

export default async function Home() {
  const penguins = await getPenguins();
  const memories = await getMemories();

  // Select random featured penguin
  const featuredPenguin = penguins[Math.floor(Math.random() * penguins.length)];
  // Select memory (first one for now, or logic for today)
  const featuredMemory = memories[0];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <HomeHighlights memory={featuredMemory} penguin={featuredPenguin} />
      <GlobalGallery penguins={penguins} memories={memories} />
    </main>
  );
}
