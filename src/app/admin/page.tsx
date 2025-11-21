import { getPenguins, getMemories } from "@/lib/data";
import { AdminDashboardClient } from "@/components/admin/AdminDashboardClient";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
    const penguins = await getPenguins();
    const memories = await getMemories();

    return (
        <AdminDashboardClient
            initialPenguins={penguins}
            initialMemories={memories}
        />
    );
}
