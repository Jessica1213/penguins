import { getMemories, getPenguins } from "@/lib/data";
import { MemoriesContent } from "../../components/memories/MemoriesContent";

export const metadata = {
    title: "Travel Memories | Jessica's Penguins",
    description: "A collection of travel memories from our penguin friends.",
};

export default async function MemoriesPage() {
    const memories = await getMemories();
    const penguins = await getPenguins();

    return (
        <div className="relative min-h-screen">
            {/* Decorative Background Elements */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-ocean-200/20 dark:bg-ocean-900/20 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen animate-float" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-200/20 dark:bg-purple-900/20 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen animate-float" style={{ animationDelay: "-2s" }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/50 via-transparent to-transparent dark:from-slate-950/50 dark:via-transparent dark:to-transparent" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
                <div className="flex flex-col items-center text-center mb-16 space-y-4">
                    <div className="inline-flex items-center justify-center p-2 bg-ocean-50 dark:bg-ocean-900/30 rounded-full mb-4">
                        <span className="text-ocean-600 dark:text-ocean-400 text-sm font-medium px-3">
                            ✨ Travel Diaries
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
                        Travel Memories
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        A collection of adventures with my penguin family. From snowy peaks to sunny beaches, follow our journey around the world.
                    </p>
                </div>

                <MemoriesContent memories={memories} penguins={penguins} />
            </div>
        </div>
    );
}
