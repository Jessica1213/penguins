import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, Weight, Ruler, Tag, Globe, Heart } from "lucide-react";
import { getPenguinById } from "@/lib/data";
import { ImageViewer } from "@/components/catalog/ImageViewer";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function PenguinDetailPage({ params }: PageProps) {
    const { id } = await params;
    const penguin = await getPenguinById(id);

    if (!penguin) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <Link
                    href="/penguins"
                    className="inline-flex items-center text-slate-600 dark:text-slate-400 hover:text-ocean-600 dark:hover:text-ocean-400 mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Colony
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left Column: Images */}
                    <div>
                        <ImageViewer images={penguin.images} alt={penguin.name} />
                    </div>

                    {/* Right Column: Details */}
                    <div className="space-y-8">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
                                    {penguin.name}
                                </h1>
                                <span className="px-3 py-1 rounded-full bg-ocean-100 dark:bg-ocean-900 text-ocean-700 dark:text-ocean-300 text-sm font-semibold">
                                    {penguin.tag}
                                </span>
                            </div>
                            {penguin.nickname && (
                                <p className="text-xl text-slate-500 dark:text-slate-400 italic">
                                    "{penguin.nickname}"
                                </p>
                            )}
                        </div>

                        {/* Bio / Note */}
                        {penguin.note && (
                            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
                                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-slate-900 dark:text-white">
                                    <Heart className="w-5 h-5 text-red-500" />
                                    About {penguin.name}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                    {penguin.note}
                                </p>
                            </div>
                        )}

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1 text-sm">
                                    <Calendar className="w-4 h-4" />
                                    Birth Date
                                </div>
                                <div className="font-semibold text-slate-900 dark:text-white">
                                    {penguin.birthDate || "Unknown"}
                                </div>
                            </div>

                            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1 text-sm">
                                    <MapPin className="w-4 h-4" />
                                    Birth Place
                                </div>
                                <div className="font-semibold text-slate-900 dark:text-white">
                                    {penguin.birthPlace || "Unknown"}
                                </div>
                            </div>

                            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1 text-sm">
                                    <Globe className="w-4 h-4" />
                                    Country
                                </div>
                                <div className="font-semibold text-slate-900 dark:text-white">
                                    {penguin.country || "Unknown"}
                                </div>
                            </div>

                            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1 text-sm">
                                    <Tag className="w-4 h-4" />
                                    Group
                                </div>
                                <div className="font-semibold text-slate-900 dark:text-white">
                                    {penguin.group || "None"}
                                </div>
                            </div>

                            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1 text-sm">
                                    <Weight className="w-4 h-4" />
                                    Weight
                                </div>
                                <div className="font-semibold text-slate-900 dark:text-white">
                                    {penguin.weight ? `${penguin.weight}g` : "Unknown"}
                                </div>
                            </div>

                            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1 text-sm">
                                    <Ruler className="w-4 h-4" />
                                    Height
                                </div>
                                <div className="font-semibold text-slate-900 dark:text-white">
                                    {penguin.height ? `${penguin.height}cm` : "Unknown"}
                                </div>
                            </div>
                        </div>

                        {/* Personality */}
                        {penguin.personality && (
                            <div className="bg-ocean-50 dark:bg-ocean-950/50 p-6 rounded-2xl border border-ocean-100 dark:border-ocean-900">
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-ocean-900 dark:text-ocean-100 mb-2">
                                    Personality
                                </h3>
                                <p className="text-ocean-800 dark:text-ocean-200">
                                    {penguin.personality}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
