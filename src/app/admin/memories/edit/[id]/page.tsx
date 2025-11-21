import { getMemory, getPenguins } from "@/lib/data";
import { EditMemoryClient } from "@/components/admin/EditMemoryClient";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EditAdminMemoryPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const memory = await getMemory(id);
    const penguins = await getPenguins();

    if (!memory) {
        notFound();
    }

    return <EditMemoryClient memory={memory} penguins={penguins} />;
}
