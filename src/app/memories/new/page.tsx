import { getPenguins } from "@/lib/data";
import { PublicNewMemoryClient } from "@/components/memories/PublicNewMemoryClient";

export const dynamic = "force-dynamic";

export default async function NewMemoryPage() {
    const penguins = await getPenguins();

    return <PublicNewMemoryClient penguins={penguins} />;
}
