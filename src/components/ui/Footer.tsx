import { Heart } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-row items-center justify-between gap-4">
                <p className="text-slate-500 dark:text-slate-400 text-xs">
                    © {new Date().getFullYear()} Penguin Database.
                </p>
                <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                    <span>Made with</span>
                    <Heart className="h-3 w-3 text-red-500 fill-current" />
                </div>
            </div>
        </footer>
    );
}
