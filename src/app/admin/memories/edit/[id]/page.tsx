"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { MemoryForm } from "@/components/admin/MemoryForm";
import { Memory } from "@/types/memory";
import { getMemory } from "@/lib/data";

export default function EditAdminMemoryPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [memory, setMemory] = useState<Memory | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getMemory(params.id).then((data) => {
            if (data) {
                setMemory(data);
            } else {
                router.push("/admin/memories");
            }
            setIsLoading(false);
        });
    }, [params.id, router]);

    const handleSubmit = async (data: Omit<Memory, "id">) => {
        setIsSubmitting(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Updating memory:", { id: params.id, ...data });
        router.push("/admin/memories");
        setIsSubmitting(false);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ocean-600"></div>
            </div>
        );
    }

    if (!memory) return null;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link
                    href="/admin/memories"
                    className="inline-flex items-center text-slate-500 hover:text-ocean-600 transition-colors mb-6"
                >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to Memories
                </Link>

                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Edit Memory</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                            Update the details of this memory.
                        </p>
                    </div>

                    <div className="p-6">
                        <MemoryForm
                            initialData={memory}
                            onSubmit={handleSubmit}
                            isSubmitting={isSubmitting}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
