import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PenguinForm } from "@/components/admin/PenguinForm";

export default function NewPenguinPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link
                    href="/admin"
                    className="inline-flex items-center text-slate-600 dark:text-slate-400 hover:text-ocean-600 dark:hover:text-ocean-400 mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Dashboard
                </Link>

                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Add New Penguin</h1>

                <PenguinForm />
            </div>
        </div>
    );
}
