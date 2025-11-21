"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { MemoryForm } from "@/components/admin/MemoryForm";
import { Memory } from "@/types/memory";

export default function NewAdminMemoryPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (data: Omit<Memory, "id">) => {
        setIsSubmitting(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Creating memory:", data);
        router.push("/admin/memories");
        setIsSubmitting(false);
    };

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
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">New Memory</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                            Share a new adventure with the world.
                        </p>
                    </div>

                    <div className="p-6">
                        <MemoryForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
                    </div>
                </div>
            </div>
        </div>
    );
}
