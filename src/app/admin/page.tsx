"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Plus, Edit, Trash2, Search, LogOut, BookHeart, Calendar, MapPin } from "lucide-react";
import { Penguin } from "@/types/penguin";
import { Memory } from "@/types/memory";
import { getPenguins, getMemories, deleteMemory } from "@/lib/data";
import { cn } from "@/lib/utils";

import { MemoryModal } from "@/components/memories/MemoryModal";

export default function AdminDashboard() {
    const [penguins, setPenguins] = useState<Penguin[]>([]);
    const [memories, setMemories] = useState<Memory[]>([]);
    const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState<"penguins" | "memories">("penguins");
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        // Check auth
        const isAdmin = localStorage.getItem("isAdmin");
        if (!isAdmin) {
            router.push("/login");
            return;
        }

        // Set active tab from query param
        const tab = searchParams.get("tab");
        if (tab === "memories") {
            setActiveTab("memories");
        }

        // Fetch data
        getPenguins().then(setPenguins);
        getMemories().then(setMemories);
    }, [router, searchParams]);

    const filteredPenguins = penguins.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredMemories = memories.filter((m) =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDeletePenguin = (id: string) => {
        if (confirm("Are you sure you want to delete this penguin?")) {
            setPenguins(penguins.filter((p) => p.id !== id));
        }
    };

    const handleDeleteMemory = async (id: string) => {
        if (confirm("Are you sure you want to delete this memory?")) {
            await deleteMemory(id);
            setMemories(memories.filter((m) => m.id !== id));
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
                        <p className="text-slate-500 dark:text-slate-400">Manage your collection and memories</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link
                            href="/admin/new"
                            className="p-3 bg-ocean-600 hover:bg-ocean-700 text-white rounded-xl shadow-lg transition-colors group relative"
                            title="Add New Penguin"
                        >
                            <Plus className="w-5 h-5" />
                            <span className="sr-only">Add New Penguin</span>
                        </Link>
                        <Link
                            href="/admin/memories/new"
                            className="p-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-lg transition-colors group relative"
                            title="Add New Memory"
                        >
                            <BookHeart className="w-5 h-5" />
                            <span className="sr-only">Add New Memory</span>
                        </Link>
                        <button
                            onClick={() => {
                                localStorage.removeItem("isAdmin");
                                router.push("/penguins");
                            }}
                            className="p-3 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-colors"
                            title="Logout"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex space-x-1 rounded-xl bg-slate-200/50 dark:bg-slate-800/50 p-1 mb-6 w-fit">
                    <button
                        onClick={() => setActiveTab("penguins")}
                        className={cn(
                            "px-4 py-2 text-sm font-medium rounded-lg transition-all",
                            activeTab === "penguins"
                                ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                                : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                        )}
                    >
                        Penguins
                    </button>
                    <button
                        onClick={() => setActiveTab("memories")}
                        className={cn(
                            "px-4 py-2 text-sm font-medium rounded-lg transition-all",
                            activeTab === "memories"
                                ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                                : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                        )}
                    >
                        Memories
                    </button>
                </div>

                {/* Search */}
                <div className="mb-6 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder={`Search ${activeTab}...`}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-ocean-500"
                    />
                </div>

                {/* Content */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
                    <div className="overflow-x-auto">
                        {activeTab === "penguins" ? (
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800">
                                    <tr>
                                        <th className="px-6 py-4 text-sm font-semibold text-slate-500 dark:text-slate-400">Name</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-slate-500 dark:text-slate-400">Tag</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-slate-500 dark:text-slate-400">Country</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-slate-500 dark:text-slate-400 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {filteredPenguins.map((penguin) => (
                                        <tr key={penguin.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={penguin.images[0]}
                                                        alt={penguin.name}
                                                        className="w-10 h-10 rounded-full object-cover"
                                                    />
                                                    <div>
                                                        <div className="font-medium text-slate-900 dark:text-white">{penguin.name}</div>
                                                        <div className="text-xs text-slate-500">{penguin.nickname}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex px-2 py-1 rounded-full bg-ocean-50 dark:bg-ocean-900/30 text-ocean-700 dark:text-ocean-300 text-xs font-medium">
                                                    {penguin.tag}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                                                {penguin.country}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Link
                                                        href={`/admin/edit/${penguin.id}`}
                                                        className="p-2 text-slate-400 hover:text-ocean-600 hover:bg-ocean-50 dark:hover:bg-ocean-900/30 rounded-lg transition-colors"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDeletePenguin(penguin.id)}
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
                        ) : (
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
                                        <tr key={memory.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer" onClick={() => setSelectedMemory(memory)}>
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
                                            <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                                                <div className="flex justify-end gap-2">
                                                    <Link
                                                        href={`/admin/memories/edit/${memory.id}`}
                                                        className="p-2 text-slate-400 hover:text-ocean-600 hover:bg-ocean-50 dark:hover:bg-ocean-900/30 rounded-lg transition-colors"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDeleteMemory(memory.id)}
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
                        )}
                    </div>

                    {activeTab === "penguins" && filteredPenguins.length === 0 && (
                        <div className="p-8 text-center text-slate-500 dark:text-slate-400">
                            No penguins found.
                        </div>
                    )}

                    {activeTab === "memories" && filteredMemories.length === 0 && (
                        <div className="p-8 text-center text-slate-500 dark:text-slate-400">
                            No memories found.
                        </div>
                    )}
                </div>
            </div>

            <MemoryModal
                memory={selectedMemory}
                penguins={penguins}
                onClose={() => setSelectedMemory(null)}
            />
        </div>
    );
}
