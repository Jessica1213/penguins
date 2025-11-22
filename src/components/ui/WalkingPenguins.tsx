"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Fish } from "lucide-react";
import { Penguin } from "@/types/penguin";
import { useSettings } from "@/context/SettingsContext";

interface WalkingPenguin extends Penguin {
    x: number;
    direction: "left" | "right";
    speed: number;
    state: "walking" | "eating" | "reacting";
    reaction?: "happy" | "disgust" | "begging";
    reactionEmoji?: string;
}

interface DroppedFish {
    id: number;
    x: number;
    y: number;
    style: { color: string; scale: number };
}





// Separate component for the actual rendering to keep logic clean? 
// Or just put it all in one. 
// Let's refactor to use window click listener.

export function WalkingPenguinsOverlay({ penguins }: { penguins: Penguin[] }) {
    const { isFeedingEnabled } = useSettings();
    const [walkers, setWalkers] = useState<WalkingPenguin[]>([]);
    const [fishes, setFishes] = useState<DroppedFish[]>([]);

    // Initialize walkers
    useEffect(() => {
        if (penguins.length === 0) return;

        const initialWalkers: WalkingPenguin[] = [];
        // Shuffle penguins to get random unique ones
        const shuffled = [...penguins].sort(() => 0.5 - Math.random());
        // Select 3 to 5 penguins, but not more than available
        const count = Math.min(shuffled.length, Math.floor(Math.random() * 3) + 3);

        for (let i = 0; i < count; i++) {
            const penguin = shuffled[i];
            initialWalkers.push({
                ...penguin,
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth - 100 : 1000),
                direction: Math.random() > 0.5 ? "right" : "left",
                speed: Math.random() * 1 + 0.5,
                state: "walking",
            });
        }
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setWalkers(initialWalkers);
    }, [penguins]);

    // Movement Loop
    useEffect(() => {
        const interval = setInterval(() => {
            setWalkers((prev) =>
                prev.map((p) => {
                    if (p.state !== "walking") return p;
                    let newX = p.x + (p.direction === "right" ? p.speed : -p.speed);
                    let newDirection = p.direction;

                    const maxWidth = typeof window !== 'undefined' ? window.innerWidth : 1000;

                    if (newX < 0) { newX = 0; newDirection = "right"; }
                    else if (newX > maxWidth - 100) { newX = maxWidth - 100; newDirection = "left"; }

                    if (Math.random() < 0.005) newDirection = p.direction === "right" ? "left" : "right";

                    return { ...p, x: newX, direction: newDirection };
                })
            );
        }, 16);
        return () => clearInterval(interval);
    }, []);

    // Fish Styles
    // Global Click Listener
    useEffect(() => {
        if (!isFeedingEnabled) return;

        const fishStyles = [
            { color: "text-orange-500", scale: 1 },
            { color: "text-blue-500", scale: 0.9 },
            { color: "text-red-500", scale: 1.1 },
            { color: "text-yellow-500", scale: 0.8 },
            { color: "text-emerald-500", scale: 1 },
            { color: "text-purple-500", scale: 1.2 },
        ];

        const handleGlobalClick = (e: MouseEvent) => {
            // 1. Restrict to bottom area (e.g., bottom 35% of screen) where penguins walk
            // This prevents fish from falling when working on forms in the top/middle
            const safeZoneHeight = window.innerHeight * 0.35;
            if (e.clientY < window.innerHeight - safeZoneHeight) return;

            // 2. Strict check for interactive elements
            // Don't drop fish if clicking on a button, link, input, label, textarea, or inside a form
            const target = e.target as HTMLElement;
            if (
                target.closest('button') ||
                target.closest('a') ||
                target.closest('input') ||
                target.closest('label') ||
                target.closest('textarea') ||
                target.closest('select') ||
                target.closest('form') ||
                target.closest('.no-fish-drop')
            ) return;

            const styleIndex = Math.floor(Math.random() * fishStyles.length);
            const newFish = {
                id: Date.now(),
                x: e.clientX,
                y: e.clientY,
                style: fishStyles[styleIndex]
            };
            setFishes((prev) => [...prev, newFish]);

            setTimeout(() => {
                setFishes((prev) => prev.filter((f) => f.id !== newFish.id));

                setWalkers((prev) => {
                    return prev.map((p) => {
                        const penguinCenter = p.x + 40; // approx center
                        const dist = Math.abs(penguinCenter - newFish.x);
                        // Check if fish landed near penguin (y-axis check: fish falls to bottom)
                        // We assume fish falls to the footer level.

                        if (dist < 80 && p.state === "walking") {
                            const reactions: ("happy" | "disgust" | "begging")[] = ["happy", "disgust", "begging"];
                            const reaction = reactions[Math.floor(Math.random() * reactions.length)];
                            let emoji = "😋";
                            if (reaction === "disgust") emoji = "🤢";
                            if (reaction === "begging") emoji = "🥺";
                            return { ...p, state: "reacting", reaction, reactionEmoji: emoji };
                        }
                        return p;
                    });
                });

                // Reset
                setTimeout(() => {
                    setWalkers((prev) => prev.map((p) => (p.state === "reacting" ? { ...p, state: "walking" } : p)));
                }, 2000);

            }, 1000); // Fall duration
        };

        window.addEventListener('click', handleGlobalClick);
        return () => window.removeEventListener('click', handleGlobalClick);
    }, [isFeedingEnabled]);

    if (!isFeedingEnabled) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
            {/* Fishes */}
            <AnimatePresence>
                {fishes.map((fish) => (
                    <motion.div
                        key={fish.id}
                        initial={{ opacity: 1, x: fish.x, y: fish.y, rotate: 0, scale: fish.style.scale }}
                        animate={{ y: window.innerHeight - 80, rotate: 360 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 1, ease: "easeIn" }}
                        className={`absolute ${fish.style.color}`}
                    >
                        <Fish className="w-8 h-8 fill-current" />
                    </motion.div>
                ))}
            </AnimatePresence>

            {/* Penguins */}
            <div className="absolute bottom-10 left-0 right-0 h-24">
                {walkers.map((p, i) => (
                    <motion.div
                        key={`${p.id}-${i}`}
                        className="absolute bottom-0 w-20 h-20 cursor-pointer pointer-events-auto"
                        animate={{ x: p.x }}
                        transition={{ duration: 0, ease: "linear" }} // Manual update via state
                    >
                        <div className="relative w-full h-full">
                            {/* Reaction Bubble */}
                            <AnimatePresence>
                                {p.state === "reacting" && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0, y: 10 }}
                                        animate={{ opacity: 1, scale: 1, y: -40 }}
                                        exit={{ opacity: 0, scale: 0 }}
                                        className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white border-2 border-slate-200 rounded-full p-2 shadow-lg z-50 text-2xl"
                                    >
                                        {p.reactionEmoji}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Penguin Image */}
                            <Image
                                src={p.images[0]}
                                alt={p.name}
                                fill
                                className={
                                    "object-contain drop-shadow-lg transition-transform " +
                                    (p.direction === "left" ? "scale-x-[-1]" : "") + " " +
                                    (p.state === "walking" ? "animate-waddle" : "")
                                }
                            />
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
