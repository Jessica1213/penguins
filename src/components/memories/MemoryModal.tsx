"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Tag } from "lucide-react";
import Image from "next/image";
import { Memory } from "@/types/memory";
import { Penguin } from "@/types/penguin";

interface MemoryModalProps {
    memory: Memory | null;
    penguins: Penguin[];
    onClose: () => void;
}

export function MemoryModal({ memory, penguins, onClose }: MemoryModalProps) {
    if (!memory) return null;

    // Helper to get penguin details
    const getPenguinDetails = (id: string) => penguins.find(p => p.id === id);

    return (
        <AnimatePresence>
            {memory && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
                    <motion.div
                        layoutId={`m-${memory.id}`}
                        className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="md:w-2/3 bg-black flex items-center justify-center relative">
                            <Image
                                src={memory.imageUrl}
                                alt={memory.title}
                                fill
                                className="object-contain"
                            />
                        </div>
                        <div className="md:w-1/3 p-6 md:p-8 overflow-y-auto">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                                        {memory.title}
                                    </h3>
                                    <p className="text-ocean-600 dark:text-ocean-400 font-medium">
                                        {memory.location}
                                    </p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                >
                                    <X className="w-6 h-6 text-slate-500" />
                                </button>
                            </div>

                            <div className="space-y-6">
                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                    {memory.description}
                                </p>

                                {/* Tagged Penguins */}
                                {memory.penguinIds && memory.penguinIds.length > 0 && (
                                    <div>
                                        <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                                            <Tag className="w-4 h-4" />
                                            In this memory
                                        </h4>
                                        <div className="flex flex-wrap gap-3">
                                            {memory.penguinIds.map(id => {
                                                const penguin = getPenguinDetails(id);
                                                if (!penguin) return null;
                                                return (
                                                    <div key={id} className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 pr-3 rounded-full border border-slate-100 dark:border-slate-700">
                                                        <Image
                                                            src={penguin.images[0]}
                                                            alt={penguin.name}
                                                            width={32}
                                                            height={32}
                                                            className="rounded-full object-cover"
                                                        />
                                                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                                            {penguin.nickname || penguin.name}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                                    <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">
                                        <Calendar className="w-3 h-3" />
                                        <span>{new Date(memory.date).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
