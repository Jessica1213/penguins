export interface Penguin {
    id: string;
    name: string;
    nickname?: string;
    birthDate?: string; // ISO date string YYYY-MM-DD
    birthPlace?: string;
    weight?: number; // in g
    height?: number; // in cm
    tag?: string;
    group?: string;
    country?: string;
    personality?: string;
    note?: string;
    images: string[]; // Array of image URLs
    createdAt: string;
}

export type PenguinSortOption = "name" | "birthDate" | "country";
