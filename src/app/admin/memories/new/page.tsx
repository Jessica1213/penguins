import { getPenguins } from "@/lib/data";
import { NewMemoryClient } from "@/components/admin/NewMemoryClient";

export const dynamic = "force-dynamic";

export default async function NewAdminMemoryPage() {
    const penguins = await getPenguins();

    return <NewMemoryClient penguins={penguins} />;
}
