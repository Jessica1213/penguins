import { Penguin } from "@/types/penguin";
import { Memory } from "@/types/memory";

const MOCK_PENGUINS: Penguin[] = [
    {
        id: "1",
        name: "Pingu",
        nickname: "Noot Noot",
        birthDate: "2020-05-28",
        birthPlace: "Antarctica",
        weight: 3500, // grams
        height: 45, // cm
        tag: "Emperor",
        group: "The Originals",
        country: "Switzerland",
        personality: "Cheeky and loud",
        note: "The original clay penguin that started it all.",
        images: ["https://images.unsplash.com/photo-1598439210625-5067c578f3f6?q=80&w=2944&auto=format&fit=crop"],
        createdAt: new Date().toISOString(),
    },
    {
        id: "2",
        name: "Pinga",
        nickname: "Lil Sis",
        birthDate: "2021-08-15",
        birthPlace: "Igloo 7",
        weight: 2800, // grams
        height: 35, // cm
        tag: "Emperor",
        group: "The Originals",
        country: "Switzerland",
        personality: "Sweet and shy",
        note: "Pingu's little sister. Loves fish popsicles.",
        images: ["https://images.unsplash.com/photo-1551986782-d0169b3f8fa7?q=80&w=2555&auto=format&fit=crop"],
        createdAt: new Date().toISOString(),
    },
    {
        id: "3",
        name: "Rico",
        nickname: "Kaboom",
        birthDate: "2019-03-12",
        birthPlace: "Zoo Central",
        weight: 4100, // grams
        height: 50, // cm
        tag: "Adélie",
        group: "Madagascar Crew",
        country: "USA",
        personality: "Chaotic neutral",
        note: "Swallows everything. regurgitates tools.",
        images: ["https://images.unsplash.com/photo-1517783999520-f068d7431a60?q=80&w=2670&auto=format&fit=crop"],
        createdAt: new Date().toISOString(),
    },
    {
        id: "4",
        name: "Kowalski",
        nickname: "Analysis",
        birthDate: "2018-11-05",
        birthPlace: "Zoo Central",
        weight: 4300, // grams
        height: 52, // cm
        tag: "Adélie",
        group: "Madagascar Crew",
        country: "USA",
        personality: "Analytical and smart",
        note: "The brains of the operation.",
        images: ["https://images.unsplash.com/photo-1550947885-481b982842b9?q=80&w=2670&auto=format&fit=crop"],
        createdAt: new Date().toISOString(),
    },
];

const MOCK_MEMORIES: Memory[] = [
    {
        id: "1",
        title: "First Snow Day",
        description: "Pingu and Pinga experiencing their first real snow in the backyard! They built a tiny snowman.",
        location: "Backyard, Home",
        date: "2023-12-15",
        imageUrl: "https://images.unsplash.com/photo-1516633630966-0a23b7a336d2?q=80&w=2670&auto=format&fit=crop",
        penguinIds: ["1", "2"],
    },
    {
        id: "2",
        title: "Beach Vacation",
        description: "Took the whole crew to the beach. Rico tried to eat a crab.",
        location: "Sunny Beach, California",
        date: "2024-07-20",
        imageUrl: "https://images.unsplash.com/photo-1545063914-a1a6kcfa59cb?q=80&w=2670&auto=format&fit=crop",
        penguinIds: ["1", "2", "3", "4"],
    },
    {
        id: "3",
        title: "Coffee Date",
        description: "Kowalski analyzing the caffeine content of my morning brew.",
        location: "Local Cafe",
        date: "2024-03-10",
        imageUrl: "https://images.unsplash.com/photo-1515696955266-4f67e13219e8?q=80&w=2670&auto=format&fit=crop",
        penguinIds: ["4"],
    },
    {
        id: "4",
        title: "Hiking Adventure",
        description: "Reaching the summit! The view was amazing, but Pingu was just hungry.",
        location: "Blue Mountains",
        date: "2023-09-05",
        imageUrl: "https://images.unsplash.com/photo-1462888386010-e097f2b75079?q=80&w=2670&auto=format&fit=crop",
        penguinIds: ["1", "3"],
    }
];

export async function getPenguins(): Promise<Penguin[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return MOCK_PENGUINS;
}

export async function getPenguin(id: string): Promise<Penguin | undefined> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return MOCK_PENGUINS.find((p) => p.id === id);
}

export async function getMemories(): Promise<Memory[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return MOCK_MEMORIES.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getMemoriesByPenguin(penguinId: string): Promise<Memory[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return MOCK_MEMORIES.filter(m => m.penguinIds.includes(penguinId)).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getMemory(id: string): Promise<Memory | undefined> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return MOCK_MEMORIES.find((m) => m.id === id);
}
