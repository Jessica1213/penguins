"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Upload, MapPin, Calendar, Tag, Loader2 } from "lucide-react";
import Link from "next/link";
import { Penguin } from "@/types/penguin";
import { createMemoryAction } from "@/app/actions";
import { upload } from "@vercel/blob/client";
import { Memory } from "@/types/memory";

interface PublicNewMemoryClientProps {
    penguins: Penguin[];
}

export function PublicNewMemoryClient({ penguins }: PublicNewMemoryClientProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        const file = e.target.files[0];
        setIsUploading(true);

        try {
            const newBlob = await upload(file.name, file, {
                access: 'public',
                handleUploadUrl: '/api/upload',
            });

            setImagePreview(newBlob.url);
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Failed to upload image. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!imagePreview) return;

        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        const penguinIds = formData.getAll("penguinIds") as string[];

        const memoryData: Omit<Memory, "id"> = {
            title: formData.get("title") as string,
            description: formData.get("description") as string,
            location: formData.get("location") as string,
            date: formData.get("date") as string,
            imageUrl: imagePreview,
            penguinIds: penguinIds,
        };

        try {
            await createMemoryAction(memoryData);
            router.push("/memories");
            router.refresh();
        } catch (error) {
            console.error("Failed to create memory:", error);
            setIsSubmitting(false);
            alert("Failed to create memory. Please try again.");
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Link
                href="/memories"
                className="inline-flex items-center text-slate-500 hover:text-ocean-600 transition-colors mb-6"
            >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Memories
            </Link>

            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">New Memory</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                        Share a new adventure with the world.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Photo
                        </label>
                        <div className="relative aspect-video rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-ocean-500 dark:hover:border-ocean-500 transition-colors bg-slate-50 dark:bg-slate-800/50 overflow-hidden group">
                            {imagePreview ? (
                                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full">
                                    {isUploading ? (
                                        <Loader2 className="w-8 h-8 text-slate-400 mb-2 animate-spin" />
                                    ) : (
                                        <Upload className="w-8 h-8 text-slate-400 mb-2" />
                                    )}
                                    <span className="text-sm text-slate-500">{isUploading ? 'Uploading...' : 'Click to upload photo'}</span>
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                onChange={handleImageUpload}
                                required={!imagePreview}
                                disabled={isUploading}
                            />
                        </div>
                    </div>

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Title
                        </label>
                        <input
                            name="title"
                            type="text"
                            required
                            placeholder="e.g., First Snow Day"
                            className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-ocean-500"
                        />
                    </div>

                    {/* Location & Date */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                <div className="flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    <span>Location</span>
                                </div>
                            </label>
                            <input
                                name="location"
                                type="text"
                                required
                                placeholder="e.g., Antarctica"
                                className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-ocean-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    <span>Date</span>
                                </div>
                            </label>
                            <input
                                name="date"
                                type="date"
                                required
                                className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-ocean-500"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Description
                        </label>
                        <textarea
                            name="description"
                            required
                            rows={3}
                            placeholder="What happened?"
                            className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-ocean-500"
                        />
                    </div>

                    {/* Tag Penguins */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            <div className="flex items-center gap-1">
                                <Tag className="w-3 h-3" />
                                <span>Tag Penguins</span>
                            </div>
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {penguins.map((penguin) => (
                                <label
                                    key={penguin.id}
                                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors has-[:checked]:bg-ocean-50 has-[:checked]:border-ocean-200 has-[:checked]:text-ocean-700 dark:has-[:checked]:bg-ocean-900/20 dark:has-[:checked]:border-ocean-800 dark:has-[:checked]:text-ocean-400"
                                >
                                    <input type="checkbox" name="penguinIds" value={penguin.id} className="hidden" />
                                    <span className="text-sm">{penguin.nickname || penguin.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                        <Link
                            href="/memories"
                            className="px-6 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-2 bg-ocean-600 hover:bg-ocean-700 text-white font-medium rounded-xl shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? "Posting..." : "Post Memory"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
