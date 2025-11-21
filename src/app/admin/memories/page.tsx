"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Edit, Trash2, Search, ArrowLeft, Calendar, MapPin } from "lucide-react";
import { Memory } from "@/types/memory";
import { getMemories } from "@/lib/data";

export default function AdminMemoriesPage() {
    const [memories, setMemories] = useState<Memory[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    useEffect(() => {
        // Check auth
        const isAdmin = localStorage.getItem("isAdmin");
        if (!isAdmin) {
            router.push("/login");
            return;
        }

        // Fetch data
        getMemories().then(setMemories);
    }, [router]);

    const filteredMemories = memories.filter((m) =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this memory?")) {
            // Mock delete
            setMemories(memories.filter((m) => m.id !== id));
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link
                    href="/admin"
                    className="inline-flex items-center text-slate-500 hover:text-ocean-600 transition-colors mb-6"
                >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to Dashboard
                </Link>

                <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Memories</h1>
                        <p className="text-slate-500 dark:text-slate-400">Manage your travel memories</p>
                    </div>
                    <Link
                        href="/admin/memories/new"
                        className="inline-flex items-center px-6 py-3 bg-ocean-600 hover:bg-ocean-700 text-white font-medium rounded-xl shadow-lg transition-colors"
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        Add New Memory
                    </Link>
                </div>

                {/* Search */}
                <div className="mb-6 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search memories..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-ocean-500"
                    />
                </div>

                {/* List */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800">
                                <tr>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-500 dark:text-slate-400">Memory</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-500 dark:text-slate-400">Date</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-500 dark:text-slate-400">Location</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-500 dark:text-slate-400 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {filteredMemories.map((memory) => (
                                    <tr key={memory.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={memory.imageUrl}
                                                    alt={memory.title}
                                                    className="w-12 h-12 rounded-lg object-cover"
                                                />
                                                <div>
                                                    <div className="font-medium text-slate-900 dark:text-white">{memory.title}</div>
                                                    <div className="text-xs text-slate-500 truncate max-w-[200px]">{memory.description}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-slate-400" />
                                                {memory.date}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4 text-slate-400" />
                                                {memory.location}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    href={`/admin/memories/edit/${memory.id}`}
                                                    className="p-2 text-slate-400 hover:text-ocean-600 hover:bg-ocean-50 dark:hover:bg-ocean-900/30 rounded-lg transition-colors"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(memory.id)}
                                                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredMemories.length === 0 && (
                        <div className="p-8 text-center text-slate-500 dark:text-slate-400">
                            No memories found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
