"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
    return (
        <section className="relative overflow-hidden py-20 sm:py-32 bg-ice-50 dark:bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6"
                    >
                        Welcome to the <span className="text-ocean-600 dark:text-ocean-400">Penguin Paradise</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 mb-10 leading-relaxed"
                    >
                        Discover the wonderful world of my penguin dolls. Each one has a unique personality, story, and charm. I hope you love them as much as I do!
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    >
                        <Link
                            href="/penguins"
                            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-ocean-600 hover:bg-ocean-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                        >
                            Explore the Colony
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-0 pointer-events-none">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-ice-200 dark:bg-ocean-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-50 animate-blob"></div>
                <div className="absolute top-0 -right-24 w-96 h-96 bg-ice-300 dark:bg-ocean-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-32 left-20 w-96 h-96 bg-ice-100 dark:bg-ocean-950 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
            </div>
        </section>
    );
}
