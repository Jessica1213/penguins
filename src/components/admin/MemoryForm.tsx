"use client";

import { useState } from "react";
import Image from "next/image";
import { Upload, MapPin, Calendar, Tag, Search, Loader2 } from "lucide-react";
import { upload } from "@vercel/blob/client";
import { Penguin } from "@/types/penguin";
import { Memory } from "@/types/memory";

interface MemoryFormProps {
    initialData?: Memory;
    onSubmit: (data: Omit<Memory, "id">) => Promise<void>;
    isSubmitting: boolean;
    penguins: Penguin[];
}

export function MemoryForm({ initialData, onSubmit, isSubmitting, penguins }: MemoryFormProps) {
    const [penguinSearch, setPenguinSearch] = useState("");
    const [imagePreview, setImagePreview] = useState<string | null>(initialData?.imageUrl || null);
    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        description: initialData?.description || "",
        location: initialData?.location || "",
        date: initialData?.date || "",
        penguinIds: initialData?.penguinIds || [],
    });



    const filteredPenguins = penguins.filter(p =>
        p.name.toLowerCase().includes(penguinSearch.toLowerCase()) ||
        (p.nickname && p.nickname.toLowerCase().includes(penguinSearch.toLowerCase()))
    );

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!imagePreview) return;

        await onSubmit({
            ...formData,
            imageUrl: imagePreview,
        });
    };

    const togglePenguin = (id: string) => {
        setFormData(prev => ({
            ...prev,
            penguinIds: prev.penguinIds.includes(id)
                ? prev.penguinIds.filter(pid => pid !== id)
                : [...prev.penguinIds, id]
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload */}
            <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Photo
                </label>
                <div className="relative aspect-video rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-ocean-500 dark:hover:border-ocean-500 transition-colors bg-slate-50 dark:bg-slate-800/50 overflow-hidden group">
                    {imagePreview ? (
                        <Image src={imagePreview} alt="Preview" fill className="object-cover" />
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
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                        type="text"
                        required
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
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
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
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
                    required
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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

                {/* Search Penguins */}
                <div className="relative mb-3">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search penguins..."
                        value={penguinSearch}
                        onChange={(e) => setPenguinSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-ocean-500"
                    />
                </div>

                <div className="max-h-48 overflow-y-auto p-1 space-y-1 custom-scrollbar">
                    <div className="flex flex-wrap gap-2">
                        {filteredPenguins.map((penguin) => (
                            <label
                                key={penguin.id}
                                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors has-[:checked]:bg-ocean-50 has-[:checked]:border-ocean-200 has-[:checked]:text-ocean-700 dark:has-[:checked]:bg-ocean-900/20 dark:has-[:checked]:border-ocean-800 dark:has-[:checked]:text-ocean-400"
                            >
                                <input
                                    type="checkbox"
                                    className="hidden"
                                    checked={formData.penguinIds.includes(penguin.id)}
                                    onChange={() => togglePenguin(penguin.id)}
                                />
                                <Image
                                    src={penguin.images[0]}
                                    alt={penguin.name}
                                    width={20}
                                    height={20}
                                    className="rounded-full object-cover"
                                />
                                <span className="text-sm">{penguin.nickname || penguin.name}</span>
                            </label>
                        ))}
                        {filteredPenguins.length === 0 && (
                            <p className="text-sm text-slate-500 dark:text-slate-400 italic w-full text-center py-2">
                                No penguins found.
                            </p>
                        )}
                    </div>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                    Selected: {formData.penguinIds.length} penguins
                </p>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                    type="button"
                    onClick={() => window.history.back()}
                    className="px-6 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2 bg-ocean-600 hover:bg-ocean-700 text-white font-medium rounded-xl shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? "Saving..." : "Save Memory"}
                </button>
            </div>
        </form>
    );
}
