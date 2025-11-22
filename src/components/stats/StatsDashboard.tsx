"use client";

import { Penguin } from "@/types/penguin";
import { Crown, Users, Scale, Ruler, Cake, PieChart, Award } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface StatMetric {
    label: string;
    value: string | number;
    icon: React.ElementType;
    color: string;
}

interface Distribution {
    label: string;
    count: number;
    percentage: number;
}

interface StatsDashboardProps {
    totalPenguins: number;
    averageAge: number;
    averageWeight: number;
    averageHeight: number;
    speciesDistribution: Distribution[];
    groupDistribution: Distribution[];
    facts: {
        oldest?: Penguin;
        youngest?: Penguin;
        tallest?: Penguin;
        heaviest?: Penguin;
    };
}

export function StatsDashboard({
    totalPenguins,
    averageAge,
    averageWeight,
    averageHeight,
    speciesDistribution,
    groupDistribution,
    facts
}: StatsDashboardProps) {

    const metrics: StatMetric[] = [
        { label: "Total Penguins", value: totalPenguins, icon: Users, color: "text-blue-500" },
        { label: "Average Age", value: `${averageAge} yrs`, icon: Cake, color: "text-pink-500" },
        { label: "Avg Weight", value: `${(averageWeight / 1000).toFixed(1)} kg`, icon: Scale, color: "text-orange-500" },
        { label: "Avg Height", value: `${averageHeight} cm`, icon: Ruler, color: "text-green-500" },
    ];

    return (
        <div className="space-y-12">
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {metrics.map((metric, index) => (
                    <motion.div
                        key={metric.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800"
                    >
                        <div className={`p-3 rounded-xl bg-opacity-10 w-fit mb-4 ${metric.color.replace('text-', 'bg-')}`}>
                            <metric.icon className={`w-6 h-6 ${metric.color}`} />
                        </div>
                        <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
                            {metric.value}
                        </div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">
                            {metric.label}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Top 1 Facts */}
            <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                    <Crown className="w-5 h-5 text-yellow-500" />
                    Hall of Fame
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {facts.oldest && (
                        <Link href={`/penguins/${facts.oldest.id}`} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-4 hover:shadow-md transition-shadow">
                            <Image src={facts.oldest.images[0]} alt={facts.oldest.name} width={48} height={48} className="rounded-full object-cover" />
                            <div>
                                <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Oldest</div>
                                <div className="font-bold text-slate-900 dark:text-white">{facts.oldest.name}</div>
                                <div className="text-xs text-slate-500">{new Date(facts.oldest.birthDate || "").getFullYear()}</div>
                            </div>
                        </Link>
                    )}
                    {facts.youngest && (
                        <Link href={`/penguins/${facts.youngest.id}`} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-4 hover:shadow-md transition-shadow">
                            <Image src={facts.youngest.images[0]} alt={facts.youngest.name} width={48} height={48} className="rounded-full object-cover" />
                            <div>
                                <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Youngest</div>
                                <div className="font-bold text-slate-900 dark:text-white">{facts.youngest.name}</div>
                                <div className="text-xs text-slate-500">{new Date(facts.youngest.birthDate || "").getFullYear()}</div>
                            </div>
                        </Link>
                    )}
                    {facts.tallest && (
                        <Link href={`/penguins/${facts.tallest.id}`} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-4 hover:shadow-md transition-shadow">
                            <Image src={facts.tallest.images[0]} alt={facts.tallest.name} width={48} height={48} className="rounded-full object-cover" />
                            <div>
                                <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Tallest</div>
                                <div className="font-bold text-slate-900 dark:text-white">{facts.tallest.name}</div>
                                <div className="text-xs text-slate-500">{facts.tallest.height} cm</div>
                            </div>
                        </Link>
                    )}
                    {facts.heaviest && (
                        <Link href={`/penguins/${facts.heaviest.id}`} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-4 hover:shadow-md transition-shadow">
                            <Image src={facts.heaviest.images[0]} alt={facts.heaviest.name} width={48} height={48} className="rounded-full object-cover" />
                            <div>
                                <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Heaviest</div>
                                <div className="font-bold text-slate-900 dark:text-white">{facts.heaviest.name}</div>
                                <div className="text-xs text-slate-500">{(facts.heaviest.weight || 0) / 1000} kg</div>
                            </div>
                        </Link>
                    )}
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Species Distribution */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                            <Award className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Species Breakdown</h3>
                    </div>
                    <div className="space-y-5">
                        {speciesDistribution.map((item, index) => (
                            <div key={item.label}>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="font-medium text-slate-700 dark:text-slate-300">{item.label}</span>
                                    <span className="text-slate-500 dark:text-slate-400">{item.count} ({item.percentage}%)</span>
                                </div>
                                <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${item.percentage}%` }}
                                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                                        className="h-full bg-purple-500 rounded-full"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Group Distribution */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-ocean-100 dark:bg-ocean-900/30 rounded-lg">
                            <PieChart className="w-5 h-5 text-ocean-600 dark:text-ocean-400" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Group Distribution</h3>
                    </div>
                    <div className="space-y-5">
                        {groupDistribution.map((item, index) => (
                            <div key={item.label}>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="font-medium text-slate-700 dark:text-slate-300">{item.label}</span>
                                    <span className="text-slate-500 dark:text-slate-400">{item.count} ({item.percentage}%)</span>
                                </div>
                                <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${item.percentage}%` }}
                                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                                        className="h-full bg-ocean-500 rounded-full"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}