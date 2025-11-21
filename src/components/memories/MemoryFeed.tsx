"use client";

import { Memory } from "@/types/memory";
import { MemoryCard } from "./MemoryCard";

interface MemoryFeedProps {
    memories: Memory[];
}

export function MemoryFeed({ memories }: MemoryFeedProps) {
    return (
        <div className="max-w-7xl mx-auto">
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
                {memories.map((memory) => (
                    <div key={memory.id} className="break-inside-avoid">
                        <MemoryCard memory={memory} />
                    </div>
                ))}
            </div>

            {memories.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-slate-500 dark:text-slate-400">No memories found yet.</p>
                </div>
            )}
        </div>
    );
}
