import { PenguinGrid } from "@/components/catalog/PenguinGrid";
import { getPenguins } from "@/lib/data";

export default async function CatalogPage() {
    const penguins = await getPenguins();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-10">
                    <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                        Penguin Colony
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
                        Meet the entire family! Browse through the collection, filter by personality, or search for your favorite little friend.
                    </p>
                </div>

                <PenguinGrid penguins={penguins} />
            </div>
        </div>
    );
}
