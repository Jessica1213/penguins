"use client";

import { useMemo } from "react";
import { Memory } from "@/types/memory";
import { MemoryCard } from "./MemoryCard";
import { YearNavigation } from "./YearNavigation";

interface MemoriesContentProps {
    memories: Memory[];
}

export function MemoriesContent({ memories }: MemoriesContentProps) {
    // Group memories by year
    const memoriesByYear = useMemo(() => {
        const groups: Record<number, Memory[]> = {};
        memories.forEach(memory => {
            const year = new Date(memory.date).getFullYear();
            if (!groups[year]) {
                groups[year] = [];
            }
            groups[year].push(memory);
        });
        return groups;
    }, [memories]);

    // Get sorted years (descending)
    const years = useMemo(() => {
        return Object.keys(memoriesByYear)
            .map(Number)
            .sort((a, b) => b - a);
    }, [memoriesByYear]);

    return (
        <div className="flex flex-col lg:flex-row gap-8">
            <aside className="hidden lg:block lg:w-48 flex-shrink-0">
                <YearNavigation years={years} />
            </aside>

            <div className="flex-1 space-y-16">
                {years.map((year) => (
                    <section key={year} id={`year-${year}`} className="scroll-mt-24">
                        <div className="flex items-center gap-4 mb-8">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                {year}
                            </h2>
                            <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
                        </div>

                        <div className="columns-1 sm:columns-2 gap-8 space-y-8">
                            {memoriesByYear[year].map((memory) => (
                                <div key={memory.id} className="break-inside-avoid">
                                    <MemoryCard memory={memory} />
                                </div>
                            ))}
                        </div>
                    </section>
                ))}

                {memories.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-slate-500 dark:text-slate-400">No memories found yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
