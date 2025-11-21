"use client";

import { cn } from "@/lib/utils";

interface YearNavigationProps {
    years: number[];
}

export function YearNavigation({ years }: YearNavigationProps) {
    const scrollToYear = (year: number) => {
        const element = document.getElementById(`year-${year}`);
        if (element) {
            const offset = 100; // Adjust for sticky header/navbar
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    return (
        <div className="sticky top-24 space-y-2">
            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
                Timeline
            </h3>

            <div className="space-y-1">
                {years.map((year) => (
                    <button
                        key={year}
                        onClick={() => scrollToYear(year)}
                        className="block w-full text-left px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-ocean-600 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-ocean-400 transition-colors"
                    >
                        {year}
                    </button>
                ))}
            </div>
        </div>
    );
}
