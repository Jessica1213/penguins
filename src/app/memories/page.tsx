import { MemoryFeed } from "@/components/memories/MemoryFeed";
import { getMemories } from "@/lib/data";
import { Plus } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "Travel Memories | Penguin Database",
    description: "A collection of travel memories from our penguin friends.",
};

import { MemoriesContent } from "@/components/memories/MemoriesContent";

export default async function MemoriesPage() {
    const memories = await getMemories();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Travel Memories</h1>
                    <p className="text-slate-500 dark:text-slate-400">
                        A collection of adventures with my penguin family.
                    </p>
                </div>

            </div>

            <MemoriesContent memories={memories} />
        </div>
    );
}
