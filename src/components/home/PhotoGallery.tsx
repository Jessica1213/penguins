"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Penguin } from "@/types/penguin";

interface PhotoGalleryProps {
    penguins: Penguin[];
}

export function PhotoGallery({ penguins }: PhotoGalleryProps) {
    // Flatten all images from all penguins into a single array
    const allImages = penguins.flatMap((p) => p.images);
    const [currentIndex, setCurrentIndex] = useState(0);

    const changeImage = () => {
        if (allImages.length <= 1) return;
        let nextIndex;
        do {
            nextIndex = Math.floor(Math.random() * allImages.length);
        } while (nextIndex === currentIndex && allImages.length > 1);
        setCurrentIndex(nextIndex);
    };

    useEffect(() => {
        const interval = setInterval(changeImage, 4000); // Change every 4 seconds
        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIndex, allImages.length]); // Re-create interval when index changes to reset timer

    if (allImages.length === 0) return null;

    return (
        <section className="py-16 bg-white dark:bg-slate-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center mb-12 text-slate-900 dark:text-white">
                    Snapshot Gallery
                </h2>

                <div
                    className="relative w-full max-w-4xl mx-auto aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl bg-slate-100 dark:bg-slate-900 cursor-pointer group"
                    onClick={changeImage}
                >
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={currentIndex}
                            src={allImages[currentIndex]}
                            alt="Random Penguin"
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8 }}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </AnimatePresence>

                    {/* Hover Hint */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/10">
                        <span className="bg-black/50 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm">Click to shuffle</span>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent text-white text-center pointer-events-none">
                        <p className="text-sm font-medium opacity-80">Random Cuteness</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
