"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { Penguin, PenguinSortOption } from "@/types/penguin";
import { PenguinCard } from "./PenguinCard";

interface PenguinGridProps {
    penguins: Penguin[];
}

export function PenguinGrid({ penguins }: PenguinGridProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState<PenguinSortOption>("name");
    const [selectedTag, setSelectedTag] = useState<string | "all">("all");

    // Extract unique tags
    const tags = useMemo(() => {
        const allTags = penguins.map((p) => p.tag).filter(Boolean) as string[];
        return ["all", ...Array.from(new Set(allTags))];
    }, [penguins]);

    // Filter and Sort
    const filteredPenguins = useMemo(() => {
        return penguins
            .filter((p) => {
                const matchesSearch =
                    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    p.nickname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    p.country?.toLowerCase().includes(searchQuery.toLowerCase());
                const matchesTag = selectedTag === "all" || p.tag === selectedTag;
                return matchesSearch && matchesTag;
            })
            .sort((a, b) => {
                if (sortBy === "name") return a.name.localeCompare(b.name);
                if (sortBy === "birthDate")
                    return (a.birthDate || "").localeCompare(b.birthDate || "");
                if (sortBy === "country")
                    return (a.country || "").localeCompare(b.country || "");
                return 0;
            });
    }, [penguins, searchQuery, sortBy, selectedTag]);

    return (
        <div className="space-y-8">
            {/* Controls */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                    <input
                        type="text"
                        placeholder="Search penguins..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-ocean-500 transition-all"
                    />
                </div>

                <div className="flex gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                    <select
                        value={selectedTag}
                        onChange={(e) => setSelectedTag(e.target.value)}
                        className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-ocean-500"
                    >
                        {tags.map((tag) => (
                            <option key={tag} value={tag}>
                                {tag === "all" ? "All Tags" : tag}
                            </option>
                        ))}
                    </select>

                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as PenguinSortOption)}
                        className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-ocean-500"
                    >
                        <option value="name">Sort by Name</option>
                        <option value="birthDate">Sort by Date</option>
                        <option value="country">Sort by Country</option>
                    </select>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <AnimatePresence mode="popLayout">
                    {filteredPenguins.map((penguin) => (
                        <motion.div
                            key={penguin.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                        >
                            <PenguinCard penguin={penguin} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {filteredPenguins.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-slate-500 dark:text-slate-400 text-lg">
                        No penguins found matching your criteria. 🐧
                    </p>
                </div>
            )}
        </div>
    );
}
