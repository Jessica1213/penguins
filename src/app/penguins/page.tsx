import { PenguinGrid } from "@/components/catalog/PenguinGrid";
import { getPenguins } from "@/lib/data";
import Link from "next/link";
import { BarChart3 } from "lucide-react";

export default async function CatalogPage() {
    const penguins = await getPenguins();

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-slate-50 to-ice-100 dark:from-slate-950 dark:to-ocean-950 py-12">
            {/* Iceberg Background Illusion */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Deep Ocean Gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-ocean-600/20 to-transparent dark:from-ocean-900/40" />

                {/* Floating Ice Shapes */}
                <div className="absolute top-20 -left-20 w-96 h-96 bg-white/40 dark:bg-white/5 rounded-full blur-3xl mix-blend-overlay" />
                <div className="absolute bottom-40 -right-20 w-[30rem] h-[30rem] bg-ice-300/30 dark:bg-ocean-500/10 rounded-full blur-3xl mix-blend-overlay" />

                {/* Geometric Ice Shards */}
                <div className="absolute top-1/4 right-10 w-0 h-0 border-l-[50px] border-l-transparent border-b-[100px] border-b-white/20 dark:border-b-white/5 border-r-[50px] border-r-transparent rotate-12 blur-sm" />
                <div className="absolute bottom-1/3 left-10 w-0 h-0 border-l-[80px] border-l-transparent border-b-[160px] border-b-ice-200/20 dark:border-b-white/5 border-r-[80px] border-r-transparent -rotate-12 blur-sm" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


                <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div className="text-center sm:text-left">
                        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
                            Penguin Colony
                        </h1>
                        <p className="text-slate-600 dark:text-slate-300 max-w-2xl text-lg">
                            Meet the entire family! Browse through the collection, filter by personality, or search for your favorite little friend in our icy paradise.
                        </p>
                    </div>
                    <Link
                        href="/penguins/stats"
                        className="inline-flex items-center justify-center p-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700"
                        title="View Statistics"
                    >
                        <BarChart3 className="w-5 h-5" />
                    </Link>
                </div>

                <PenguinGrid penguins={penguins} />
            </div>
        </div>
    );
}
