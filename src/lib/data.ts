import { Penguin } from "@/types/penguin";

// Mock data for development
export const mockPenguins: Penguin[] = [
    {
        id: "1",
        name: "Pingu",
        nickname: "Noot Noot",
        birthDate: "2020-05-28",
        birthPlace: "Antarctica",
        weight: 1200,
        height: 30,
        tag: "Emperor",
        group: "The Originals",
        country: "Antarctica",
        personality: "Playful and clumsy",
        note: "Loves fish and his sister Pinga.",
        images: [
            "https://images.unsplash.com/photo-1598439210625-5067c578f3f6?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1551986782-d0169b3f8fa7?q=80&w=800&auto=format&fit=crop",
        ],
        createdAt: new Date().toISOString(),
    },
    {
        id: "2",
        name: "Kowalski",
        nickname: "The Brains",
        birthDate: "2019-11-15",
        birthPlace: "Central Park Zoo",
        weight: 1500,
        height: 35,
        tag: "Adelie",
        group: "Madagascar",
        country: "USA",
        personality: "Analytical and strategic",
        note: "Always has a plan.",
        images: [
            "https://images.unsplash.com/photo-1517783999520-f068d7431a60?q=80&w=800&auto=format&fit=crop",
        ],
        createdAt: new Date().toISOString(),
    },
    {
        id: "3",
        name: "Mumble",
        nickname: "Happy Feet",
        birthDate: "2021-02-14",
        birthPlace: "Iceberg",
        weight: 1100,
        height: 28,
        tag: "Emperor",
        group: "Dancers",
        country: "Antarctica",
        personality: "Rhythmic and brave",
        note: "Cannot sing, but can tap dance.",
        images: [
            "https://images.unsplash.com/photo-1462888381069-d5351d0a8851?q=80&w=800&auto=format&fit=crop",
        ],
        createdAt: new Date().toISOString(),
    },
];

export async function getPenguins(): Promise<Penguin[]> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockPenguins;
}

export async function getPenguinById(id: string): Promise<Penguin | undefined> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockPenguins.find((p) => p.id === id);
}
