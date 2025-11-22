"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageViewerProps {
    images: string[];
    alt: string;
}

export function ImageViewer({ images, alt }: ImageViewerProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    if (!images.length) return null;

    return (
        <div className="relative group">
            <div className="relative aspect-square bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-lg border border-slate-100 dark:border-slate-800">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="relative w-full h-full"
                    >
                        <Image
                            src={images[currentIndex]}
                            alt={`${alt} - View ${currentIndex + 1}`}
                            fill
                            className="object-cover"
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-slate-900/80 text-slate-800 dark:text-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white dark:hover:bg-slate-800 z-10"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-slate-900/80 text-slate-800 dark:text-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white dark:hover:bg-slate-800 z-10"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/50 text-white text-xs backdrop-blur-sm z-10">
                    {currentIndex + 1} / {images.length}
                </div>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                    {images.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${currentIndex === idx
                                ? "border-ocean-500 ring-2 ring-ocean-200 dark:ring-ocean-900"
                                : "border-transparent opacity-70 hover:opacity-100"
                                }`}
                        >
                            <Image
                                src={img}
                                alt={`Thumbnail ${idx + 1}`}
                                fill
                                className="object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
