import { getPenguins } from "@/lib/data";
import { StatsDashboard } from "@/components/stats/StatsDashboard";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "Statistics | Jessica's Penguins",
    description: "Fun facts and figures about our penguin collection.",
};

export default async function StatsPage() {
    const penguins = await getPenguins();

    // Calculate Statistics
    const totalPenguins = penguins.length;

    // Average Age
    const now = new Date();
    const totalAge = penguins.reduce((acc, p) => {
        if (!p.birthDate) return acc;
        const birthDate = new Date(p.birthDate);
        const age = (now.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
        return acc + age;
    }, 0);
    const averageAge = totalPenguins > 0 ? Math.round((totalAge / totalPenguins) * 10) / 10 : 0;

    // Average Weight & Height
    const totalWeight = penguins.reduce((acc, p) => acc + (p.weight || 0), 0);
    const totalHeight = penguins.reduce((acc, p) => acc + (p.height || 0), 0);
    const averageWeight = totalPenguins > 0 ? Math.round(totalWeight / totalPenguins) : 0;
    const averageHeight = totalPenguins > 0 ? Math.round(totalHeight / totalPenguins) : 0;

    // Distributions
    const calculateDistribution = (key: "tag" | "group") => {
        const counts: Record<string, number> = {};
        penguins.forEach(p => {
            const value = p[key] || "Unknown";
            counts[value] = (counts[value] || 0) + 1;
        });

        return Object.entries(counts)
            .map(([label, count]) => ({
                label,
                count,
                percentage: Math.round((count / totalPenguins) * 100)
            }))
            .sort((a, b) => b.count - a.count);
    };

    const speciesDistribution = calculateDistribution("tag");
    const groupDistribution = calculateDistribution("group");

    // Top 1 Facts
    const oldest = [...penguins].sort((a, b) => new Date(a.birthDate || "").getTime() - new Date(b.birthDate || "").getTime())[0];
    const youngest = [...penguins].sort((a, b) => new Date(b.birthDate || "").getTime() - new Date(a.birthDate || "").getTime())[0];
    const tallest = [...penguins].sort((a, b) => (b.height || 0) - (a.height || 0))[0];
    const heaviest = [...penguins].sort((a, b) => (b.weight || 0) - (a.weight || 0))[0];

    const facts = {
        oldest,
        youngest,
        tallest,
        heaviest
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <Link
                        href="/penguins"
                        className="inline-flex items-center text-sm text-slate-500 hover:text-ocean-600 dark:text-slate-400 dark:hover:text-ocean-400 transition-colors mb-4"
                    >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Back to Catalog
                    </Link>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                        Collection Statistics
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2">
                        Analyzing the data behind our waddling friends.
                    </p>
                </div>

                <StatsDashboard
                    totalPenguins={totalPenguins}
                    averageAge={averageAge}
                    averageWeight={averageWeight}
                    averageHeight={averageHeight}
                    speciesDistribution={speciesDistribution}
                    groupDistribution={groupDistribution}
                    facts={facts}
                />
            </div>
        </div>
    );
}
