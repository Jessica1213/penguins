"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Anchor, Settings, Fish, Bird } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSettings } from "@/context/SettingsContext";

const navItems = [
    { name: "Home", href: "/" },
    { name: "Catalog", href: "/penguins" },
    { name: "Memories", href: "/memories" },
    { name: "Admin", href: "/admin" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { isFeedingEnabled, toggleFeeding } = useSettings();

    return (
        <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="bg-ocean-600 text-white p-2 rounded-lg">
                                <Bird className="h-6 w-6" />
                            </div>
                            <span className="text-xl font-bold text-slate-900 dark:text-white">Jessica's Penguins</span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-4">
                            {navItems.map((item) => (
                                item.name === "Admin" ? (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="text-slate-400 hover:text-ocean-600 dark:text-slate-500 dark:hover:text-ocean-400 p-2 rounded-full transition-colors"
                                        title="Admin Area"
                                    >
                                        <Settings className="w-5 h-5" />
                                    </Link>
                                ) : (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="text-slate-600 hover:text-ocean-600 dark:text-slate-300 dark:hover:text-ocean-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                )
                            ))}

                            {/* Feeding Toggle */}
                            <button
                                onClick={toggleFeeding}
                                className={cn(
                                    "p-2 rounded-full transition-colors",
                                    isFeedingEnabled
                                        ? "text-ocean-600 bg-ocean-50 dark:text-ocean-400 dark:bg-ocean-900/20"
                                        : "text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
                                )}
                                title={isFeedingEnabled ? "Feeding Enabled" : "Feeding Disabled"}
                            >
                                <Fish className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-ocean-600 dark:text-slate-300 dark:hover:text-white focus:outline-none"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:text-ocean-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-900"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
