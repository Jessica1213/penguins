"use client";

import { useState, useEffect } from "react";
import { Fish, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface FeedingButtonProps {
    penguinId: string;
    penguinName: string;
}

export function FeedingButton({ penguinId, penguinName }: FeedingButtonProps) {
    const [fishCount, setFishCount] = useState(0);
    const [isFeeding, setIsFeeding] = useState(false);
    const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);

    useEffect(() => {
        const savedCount = localStorage.getItem(`penguin_feed_${penguinId}`);
        if (savedCount) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setFishCount(parseInt(savedCount, 10));
        }
    }, [penguinId]);

    const handleFeed = (e: React.MouseEvent<HTMLButtonElement>) => {
        const newCount = fishCount + 1;
        setFishCount(newCount);
        localStorage.setItem(`penguin_feed_${penguinId}`, newCount.toString());
        setIsFeeding(true);

        // Add floating heart
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const newHeart = { id: Date.now(), x, y };
        setHearts((prev) => [...prev, newHeart]);

        // Remove heart after animation
        setTimeout(() => {
            setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
        }, 1000);

        // Reset feeding state
        setTimeout(() => setIsFeeding(false), 200);
    };

    return (
        <div className="flex flex-col items-center gap-3">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleFeed}
                className={cn(
                    "relative group flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg shadow-lg transition-all overflow-hidden",
                    "bg-gradient-to-r from-orange-400 to-orange-500 text-white hover:from-orange-500 hover:to-orange-600",
                    "border-b-4 border-orange-700 active:border-b-0 active:translate-y-1"
                )}
            >
                <Fish className={cn("w-6 h-6", isFeeding && "animate-bounce")} />
                <span>Feed {penguinName}</span>

                {/* Ripple Effect */}
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-2xl" />
            </motion.button>

            <div className="text-sm font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-4 py-1 rounded-full">
                {fishCount > 0 ? (
                    <span>
                        <span className="text-orange-500 font-bold">{fishCount}</span> fish eaten! Yum!
                    </span>
                ) : (
                    "Give me my first fish!"
                )}
            </div>

            {/* Floating Hearts Container */}
            <div className="absolute pointer-events-none">
                <AnimatePresence>
                    {hearts.map((heart) => (
                        <motion.div
                            key={heart.id}
                            initial={{ opacity: 1, y: 0, scale: 0.5 }}
                            animate={{ opacity: 0, y: -100, scale: 1.5 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8 }}
                            className="absolute text-red-500"
                            style={{ left: heart.x, top: heart.y - 50 }} // Offset to start above button
                        >
                            <Heart className="w-6 h-6 fill-current" />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}
