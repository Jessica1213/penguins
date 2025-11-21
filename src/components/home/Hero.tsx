"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
    return (
        <section className="relative h-[30vh] min-h-[500px] w-full overflow-hidden flex items-center justify-center">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1516633630966-0a23b7a336d2?q=80&w=2670&auto=format&fit=crop"
                    alt="Penguins in snow"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-slate-900/90" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight drop-shadow-lg">
                        Welcome to <span className="text-ocean-300">Jessica's Penguins</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-200 mb-10 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
                        Meet my adorable family of penguin dolls!
                        Each one has a unique personality, a story to tell, and a whole lot of love to give.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/penguins"
                            className="px-8 py-4 bg-ocean-600 hover:bg-ocean-500 text-white rounded-full font-semibold text-lg transition-all transform hover:scale-105 shadow-lg shadow-ocean-900/20 flex items-center gap-2"
                        >
                            Explore Catalog
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link
                            href="/memories"
                            className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm rounded-full font-semibold text-lg transition-all border border-white/20"
                        >
                            View Memories
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
            >
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2">
                    <div className="w-1 h-2 bg-white/50 rounded-full" />
                </div>
            </motion.div>
        </section>
    );
}
