import { Hero } from "@/components/home/Hero";
import { PhotoGallery } from "@/components/home/PhotoGallery";
import { getPenguins } from "@/lib/data";

export default async function Home() {
  const penguins = await getPenguins();

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <PhotoGallery penguins={penguins} />
    </div>
  );
}
