export interface Memory {
    id: string;
    title: string;
    description: string;
    location: string;
    date: string; // ISO date string YYYY-MM-DD
    imageUrl: string;
    penguinIds: string[]; // IDs of penguins in this memory
}
