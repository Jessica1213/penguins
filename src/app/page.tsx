import { Hero } from "@/components/home/Hero";
import { PhotoGallery } from "@/components/home/PhotoGallery";
import { FeaturedPenguin } from "@/components/home/FeaturedPenguin";
import { getPenguins } from "@/lib/data";

export default async function Home() {
  const penguins = await getPenguins();

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Hero />
      <FeaturedPenguin penguins={penguins} />
      <PhotoGallery penguins={penguins} />
    </main>
  );
}
