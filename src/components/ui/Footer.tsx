import { Heart } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center gap-4">
                <p className="text-slate-500 dark:text-slate-400 text-sm text-center">
                    © {new Date().getFullYear()} Penguin Database. All rights reserved.
                </p>
                <div className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
                    <span>Made with</span>
                    <Heart className="h-4 w-4 text-red-500 fill-current" />
                    <span>for the love of penguins</span>
                </div>
            </div>
        </footer>
    );
}
