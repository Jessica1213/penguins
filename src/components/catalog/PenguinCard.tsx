import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MapPin, Weight } from "lucide-react";
import { Penguin } from "@/types/penguin";

interface PenguinCardProps {
    penguin: Penguin;
}

export function PenguinCard({ penguin }: PenguinCardProps) {
    return (
        <Link href={`/penguins/${penguin.id}`}>
            <div className="group relative bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-800 hover:-translate-y-1">
                <div className="aspect-square relative overflow-hidden bg-slate-50 dark:bg-slate-800">
                    <img
                        src={penguin.images[0]}
                        alt={penguin.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:animate-waddle"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-950/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-ocean-700 dark:text-ocean-300 shadow-sm">
                        {penguin.tag}
                    </div>
                </div>

                <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-ocean-600 dark:group-hover:text-ocean-400 transition-colors">
                                {penguin.name}
                            </h3>
                            {penguin.nickname && (
                                <p className="text-sm text-slate-500 dark:text-slate-400 italic">
                                    "{penguin.nickname}"
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2 mt-4">
                        <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                            <Calendar className="w-4 h-4 mr-2 text-ocean-500" />
                            <span>{penguin.birthDate}</span>
                        </div>
                        <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                            <MapPin className="w-4 h-4 mr-2 text-ocean-500" />
                            <span>{penguin.country}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
