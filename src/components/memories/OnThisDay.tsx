"use client";

import { Memory } from "@/types/memory";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface OnThisDayProps {
    memories: Memory[];
}

export function OnThisDay({ memories }: OnThisDayProps) {
    // Filter memories for "today" (ignoring year)
    // For demo purposes, we'll just show the latest memory if no exact date match, 
    // or maybe just show a random one to ensure something always shows up.
    // Real logic:
    // const today = new Date();
    // const todaysMemories = memories.filter(m => {
    //     const d = new Date(m.date);
    //     return d.getMonth() === today.getMonth() && d.getDate() === today.getDate();
    // });

    // For demo: just pick the first one
    const memory = memories[0];

    if (!memory) return null;

    return (
        <section className="py-12 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-2 mb-6">
                    <Calendar className="w-5 h-5 text-ocean-600 dark:text-ocean-400" />
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">On This Day</h2>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-8 items-center">
                    <div className="w-full md:w-1/3 aspect-video md:aspect-square rounded-xl overflow-hidden relative group">
                        <img
                            src={memory.imageUrl}
                            alt={memory.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>

                    <div className="flex-1 text-center md:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ocean-50 dark:bg-ocean-900/30 text-ocean-700 dark:text-ocean-300 text-xs font-medium mb-4">
                            <Calendar className="w-3 h-3" />
                            <span>{new Date(memory.date).getFullYear()}</span>
                        </div>

                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                            {memory.title}
                        </h3>

                        <div className="flex items-center justify-center md:justify-start gap-2 text-slate-500 dark:text-slate-400 text-sm mb-4">
                            <MapPin className="w-4 h-4" />
                            <span>{memory.location}</span>
                        </div>

                        <p className="text-slate-600 dark:text-slate-300 mb-6 max-w-xl">
                            {memory.description}
                        </p>

                        <Link
                            href="/memories"
                            className="inline-flex items-center gap-2 text-ocean-600 dark:text-ocean-400 font-medium hover:underline"
                        >
                            <span>View all memories</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
