"use client";

import { Memory } from "@/types/memory";
import { MapPin, Calendar, Tag } from "lucide-react";
import { motion } from "framer-motion";

interface MemoryCardProps {
    memory: Memory;
}

export function MemoryCard({ memory }: MemoryCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800"
        >
            {/* Image Header */}
            <div className="relative aspect-square sm:aspect-video w-full overflow-hidden">
                <img
                    src={memory.imageUrl}
                    alt={memory.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <h3 className="text-white font-bold text-lg">{memory.title}</h3>
                    <div className="flex items-center gap-2 text-white/80 text-xs mt-1">
                        <MapPin className="w-3 h-3" />
                        <span>{memory.location}</span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(memory.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                </div>

                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-4">
                    {memory.description}
                </p>

                {/* Tags */}
                {memory.penguinIds.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-1 text-xs text-ocean-600 dark:text-ocean-400 font-medium">
                            <Tag className="w-3 h-3" />
                            <span>With:</span>
                        </div>
                        {/* In a real app, we would look up penguin names here. For now, just showing IDs or a placeholder */}
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                            {memory.penguinIds.length} penguin{memory.penguinIds.length !== 1 ? 's' : ''}
                        </span>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
