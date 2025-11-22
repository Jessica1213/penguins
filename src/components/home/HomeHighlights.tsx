"use client";

import { Memory } from "@/types/memory";
import { Penguin } from "@/types/penguin";
import { Calendar, Star, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

import Image from "next/image";

interface HomeHighlightsProps {
    memory: Memory | undefined;
    penguin: Penguin | undefined;
}

export function HomeHighlights({ memory, penguin }: HomeHighlightsProps) {
    return (
        <section className="py-16 bg-slate-50 dark:bg-slate-900/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                        Daily Highlights
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-2">
                        A look back in time and a star of the moment.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* On This Day Card */}
                    {memory && (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-xl border border-slate-100 dark:border-slate-800 flex flex-col"
                        >
                            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
                                <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-full text-orange-600 dark:text-orange-400">
                                    <Calendar className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-white">On This Day</h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        {new Date(memory.date).getFullYear()}
                                    </p>
                                </div>
                            </div>

                            <div className="relative aspect-video w-full overflow-hidden group">
                                <Image
                                    src={memory.imageUrl}
                                    alt={memory.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                                    <p className="text-white font-medium flex items-center gap-2">
                                        <MapPin className="w-4 h-4" />
                                        {memory.location}
                                    </p>
                                </div>
                            </div>

                            <div className="p-6 flex-1 flex flex-col">
                                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                                    {memory.title}
                                </h4>
                                <p className="text-slate-600 dark:text-slate-300 mb-6 flex-1">
                                    {memory.description}
                                </p>
                                <Link
                                    href="/memories"
                                    className="inline-flex items-center text-ocean-600 dark:text-ocean-400 font-medium hover:underline"
                                >
                                    View all memories <ArrowRight className="w-4 h-4 ml-1" />
                                </Link>
                            </div>
                        </motion.div>
                    )}

                    {/* Featured Penguin Card */}
                    {penguin && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-xl border border-slate-100 dark:border-slate-800 flex flex-col"
                        >
                            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
                                <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-full text-yellow-600 dark:text-yellow-400">
                                    <Star className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-white">Star of the Day</h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        Meet {penguin.name}
                                    </p>
                                </div>
                            </div>

                            <div className="relative aspect-video w-full overflow-hidden group">
                                <Image
                                    src={penguin.images[0]}
                                    alt={penguin.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>

                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                                        {penguin.name}
                                    </h4>
                                    <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-300">
                                        {penguin.tag}
                                    </span>
                                </div>
                                <p className="text-slate-600 dark:text-slate-300 mb-6 flex-1 italic">
                                    &quot;{penguin.note}&quot;
                                </p>
                                <Link
                                    href={`/penguins/${penguin.id}`}
                                    className="inline-flex items-center text-ocean-600 dark:text-ocean-400 font-medium hover:underline"
                                >
                                    Meet {penguin.name} <ArrowRight className="w-4 h-4 ml-1" />
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
}
