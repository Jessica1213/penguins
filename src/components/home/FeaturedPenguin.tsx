"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Penguin } from "@/types/penguin";

interface FeaturedPenguinProps {
    penguins: Penguin[];
}

export function FeaturedPenguin({ penguins }: FeaturedPenguinProps) {
    const [featured, setFeatured] = useState<Penguin | null>(null);

    useEffect(() => {
        if (penguins.length > 0) {
            // Simple random selection on mount
            const randomIndex = Math.floor(Math.random() * penguins.length);
            setFeatured(penguins[randomIndex]);
        }
    }, [penguins]);

    if (!featured) return null;

    return (
        <section className="py-16 bg-ice-50 dark:bg-slate-900/50 border-y border-ice-100 dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    {/* Image Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full md:w-1/2 relative"
                    >
                        <div className="relative aspect-square max-w-md mx-auto rounded-full overflow-hidden border-8 border-white dark:border-slate-800 shadow-2xl">
                            <img
                                src={featured.images[0]}
                                alt={featured.name}
                                className="w-full h-full object-cover animate-waddle"
                            />
                        </div>
                        {/* Decorative Elements */}
                        <div className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full font-bold shadow-lg transform rotate-12 flex items-center gap-2">
                            <Sparkles className="w-4 h-4" />
                            Star of the Day
                        </div>
                    </motion.div>

                    {/* Content Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-full md:w-1/2 text-center md:text-left"
                    >
                        <h2 className="text-ocean-600 dark:text-ocean-400 font-semibold tracking-wide uppercase mb-2">
                            Penguin of the Moment
                        </h2>
                        <h3 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                            Meet {featured.name}
                        </h3>
                        <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                            {featured.note ? featured.note.slice(0, 150) + "..." : `Say hello to ${featured.nickname || featured.name}! This adorable penguin from ${featured.country} is waiting to meet you.`}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                            <Link
                                href={`/penguins/${featured.id}`}
                                className="inline-flex items-center px-8 py-4 bg-ocean-600 hover:bg-ocean-700 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                            >
                                Get to Know Me
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                                <span className="px-3 py-1 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700">
                                    {featured.tag}
                                </span>
                                <span className="px-3 py-1 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700">
                                    {featured.country}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
