"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Tag, Calendar } from "lucide-react";
import { Penguin } from "@/types/penguin";
import { Memory } from "@/types/memory";

interface GalleryItem {
    id: string;
    type: "penguin" | "memory";
    imageUrl: string;
    title: string;
    subtitle?: string;
    description?: string;
    date?: string;
    tags?: string[];
    penguinIds?: string[];
}

interface GlobalGalleryProps {
    penguins: Penguin[];
    memories: Memory[];
}

export function GlobalGallery({ penguins, memories }: GlobalGalleryProps) {
    const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

    // Combine and shuffle items
    const [shuffledItems, setShuffledItems] = useState<GalleryItem[]>([]);

    useEffect(() => {
        const items: GalleryItem[] = [
            ...penguins.flatMap(p => p.images.map((img, idx) => ({
                id: `p-${p.id}-${idx}`,
                type: "penguin" as const,
                imageUrl: img,
                title: p.name,
                subtitle: p.nickname,
                description: p.note,
                tags: [p.tag || "Penguin", p.country || "Unknown"],
            }))),
            ...memories.map(m => ({
                id: `m-${m.id}`,
                type: "memory" as const,
                imageUrl: m.imageUrl,
                title: m.title,
                subtitle: m.location,
                description: m.description,
                date: m.date,
                tags: ["Memory"],
                penguinIds: m.penguinIds,
            }))
        ];
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setShuffledItems(items.sort(() => Math.random() - 0.5));
    }, [penguins, memories]);

    // Helper to get penguin details
    const getPenguinDetails = (id: string) => penguins.find(p => p.id === id);

    return (
        <section className="py-16 bg-white dark:bg-slate-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                        Gallery
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                        A glimpse into the life of our penguin friends.
                    </p>
                </div>

                <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                    {shuffledItems.map((item) => (
                        <motion.div
                            key={item.id}
                            layoutId={item.id}
                            onClick={() => setSelectedItem(item)}
                            className="break-inside-avoid cursor-pointer group relative rounded-xl overflow-hidden"
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="relative w-full">
                                <Image
                                    src={item.imageUrl}
                                    alt={item.title}
                                    width={400}
                                    height={300}
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                        </motion.div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedItem && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedItem(null)}>
                        <motion.div
                            layoutId={selectedItem.id}
                            className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="md:w-2/3 bg-black flex items-center justify-center relative">
                                <Image
                                    src={selectedItem.imageUrl}
                                    alt={selectedItem.title}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <div className="md:w-1/3 p-6 md:p-8 overflow-y-auto">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                                            {selectedItem.title}
                                        </h3>
                                        {selectedItem.subtitle && (
                                            <p className="text-ocean-600 dark:text-ocean-400 font-medium">
                                                {selectedItem.subtitle}
                                            </p>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => setSelectedItem(null)}
                                        className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                    >
                                        <X className="w-6 h-6 text-slate-500" />
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    {selectedItem.description && (
                                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                            {selectedItem.description}
                                        </p>
                                    )}

                                    {/* Tagged Penguins */}
                                    {selectedItem.penguinIds && selectedItem.penguinIds.length > 0 && (
                                        <div>
                                            <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                                                <Tag className="w-4 h-4" />
                                                In this memory
                                            </h4>
                                            <div className="flex flex-wrap gap-3">
                                                {selectedItem.penguinIds.map(id => {
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
                                        {selectedItem.date && (
                                            <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">
                                                <Calendar className="w-3 h-3" />
                                                <span>{new Date(selectedItem.date).toLocaleDateString()}</span>
                                            </div>
                                        )}
                                        {selectedItem.tags?.map(tag => (
                                            <div key={tag} className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">
                                                <Tag className="w-3 h-3" />
                                                <span>{tag}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
