import { Client } from "pg";
import { NextResponse } from "next/server";

const MOCK_PENGUINS = [
    {
        id: "11111111-1111-1111-1111-111111111111",
        name: "Pingu",
        nickname: "Noot Noot",
        birthDate: "2020-05-28",
        birthPlace: "Antarctica",
        weight: 3500,
        height: 45,
        tag: "Emperor",
        group: "The Originals",
        country: "Switzerland",
        personality: "Cheeky and loud",
        note: "The original clay penguin that started it all.",
        images: ["https://images.unsplash.com/photo-1598439210625-5067c578f3f6?q=80&w=2944&auto=format&fit=crop"],
        createdAt: new Date().toISOString(),
    },
    {
        id: "22222222-2222-2222-2222-222222222222",
        name: "Pinga",
        nickname: "Lil Sis",
        birthDate: "2021-08-15",
        birthPlace: "Igloo 7",
        weight: 2800,
        height: 35,
        tag: "Emperor",
        group: "The Originals",
        country: "Switzerland",
        personality: "Sweet and shy",
        note: "Pingu's little sister. Loves fish popsicles.",
        images: ["https://images.unsplash.com/photo-1551986782-d0169b3f8fa7?q=80&w=2555&auto=format&fit=crop"],
        createdAt: new Date().toISOString(),
    },
    {
        id: "33333333-3333-3333-3333-333333333333",
        name: "Rico",
        nickname: "Kaboom",
        birthDate: "2019-03-12",
        birthPlace: "Zoo Central",
        weight: 4100,
        height: 50,
        tag: "Adélie",
        group: "Madagascar Crew",
        country: "USA",
        personality: "Chaotic neutral",
        note: "Swallows everything. regurgitates tools.",
        images: ["https://images.unsplash.com/photo-1517783999520-f068d7431a60?q=80&w=2670&auto=format&fit=crop"],
        createdAt: new Date().toISOString(),
    },
    {
        id: "44444444-4444-4444-4444-444444444444",
        name: "Kowalski",
        nickname: "Analysis",
        birthDate: "2018-11-05",
        birthPlace: "Zoo Central",
        weight: 4300,
        height: 52,
        tag: "Adélie",
        group: "Madagascar Crew",
        country: "USA",
        personality: "Analytical and smart",
        note: "The brains of the operation.",
        images: ["https://images.unsplash.com/photo-1550947885-481b982842b9?q=80&w=2670&auto=format&fit=crop"],
        createdAt: new Date().toISOString(),
    },
];

const MOCK_MEMORIES = [
    {
        id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
        title: "First Snow Day",
        description: "Pingu and Pinga experiencing their first real snow in the backyard! They built a tiny snowman.",
        location: "Backyard, Home",
        date: "2023-12-15",
        imageUrl: "https://images.unsplash.com/photo-1516633630966-0a23b7a336d2?q=80&w=2670&auto=format&fit=crop",
        penguinIds: ["11111111-1111-1111-1111-111111111111", "22222222-2222-2222-2222-222222222222"],
    },
    {
        id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
        title: "Beach Vacation",
        description: "Took the whole crew to the beach. Rico tried to eat a crab.",
        location: "Sunny Beach, California",
        date: "2024-07-20",
        imageUrl: "https://images.unsplash.com/photo-1545063914-a1a6kcfa59cb?q=80&w=2670&auto=format&fit=crop",
        penguinIds: ["11111111-1111-1111-1111-111111111111", "22222222-2222-2222-2222-222222222222", "33333333-3333-3333-3333-333333333333", "44444444-4444-4444-4444-444444444444"],
    },
    {
        id: "cccccccc-cccc-cccc-cccc-cccccccccccc",
        title: "Coffee Date",
        description: "Kowalski analyzing the caffeine content of my morning brew.",
        location: "Local Cafe",
        date: "2024-03-10",
        imageUrl: "https://images.unsplash.com/photo-1515696955266-4f67e13219e8?q=80&w=2670&auto=format&fit=crop",
        penguinIds: ["44444444-4444-4444-4444-444444444444"],
    },
    {
        id: "dddddddd-dddd-dddd-dddd-dddddddddddd",
        title: "Hiking Adventure",
        description: "Reaching the summit! The view was amazing, but Pingu was just hungry.",
        location: "Blue Mountains",
        date: "2023-09-05",
        imageUrl: "https://images.unsplash.com/photo-1462888386010-e097f2b75079?q=80&w=2670&auto=format&fit=crop",
        penguinIds: ["11111111-1111-1111-1111-111111111111", "33333333-3333-3333-3333-333333333333"],
    },
];

export async function GET() {
    console.log("Attempting to connect to database...");
    console.log("POSTGRES_URL exists:", !!process.env.POSTGRES_URL);

    const client = new Client({
        connectionString: process.env.POSTGRES_URL,
        ssl: {
            rejectUnauthorized: false // Required for some Vercel/Prisma connections
        }
    });

    try {
        await client.connect();
        console.log("Connected successfully!");

        // Create Penguins Table
        await client.query(`
            CREATE TABLE IF NOT EXISTS penguins (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                name VARCHAR(255) NOT NULL,
                nickname VARCHAR(255),
                birth_date DATE,
                birth_place VARCHAR(255),
                weight INTEGER,
                height INTEGER,
                tag VARCHAR(255),
                group_name VARCHAR(255),
                country VARCHAR(255),
                personality TEXT,
                note TEXT,
                images TEXT[],
                created_at TIMESTAMP DEFAULT NOW()
            );
        `);

        // Create Memories Table
        await client.query(`
            CREATE TABLE IF NOT EXISTS memories (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                title VARCHAR(255) NOT NULL,
                description TEXT,
                location VARCHAR(255),
                date DATE,
                image_url TEXT,
                penguin_ids TEXT[], 
                created_at TIMESTAMP DEFAULT NOW()
            );
        `);

        // Seed Penguins
        for (const penguin of MOCK_PENGUINS) {
            const existing = await client.query('SELECT id FROM penguins WHERE id = $1', [penguin.id]);
            if (existing.rows.length === 0) {
                await client.query(`
                INSERT INTO penguins (id, name, nickname, birth_date, birth_place, weight, height, tag, group_name, country, personality, note, images, created_at)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
            `, [penguin.id, penguin.name, penguin.nickname, penguin.birthDate, penguin.birthPlace, penguin.weight, penguin.height, penguin.tag, penguin.group, penguin.country, penguin.personality, penguin.note, penguin.images, penguin.createdAt]);
            }
        }

        // Seed Memories
        for (const memory of MOCK_MEMORIES) {
            const existing = await client.query('SELECT id FROM memories WHERE id = $1', [memory.id]);
            if (existing.rows.length === 0) {
                await client.query(`
                INSERT INTO memories (id, title, description, location, date, image_url, penguin_ids)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
            `, [memory.id, memory.title, memory.description, memory.location, memory.date, memory.imageUrl, memory.penguinIds]);
            }
        }

        await client.end();
        return NextResponse.json({ message: "Database seeded successfully" }, { status: 200 });
    } catch (error) {
        console.error("Seed Error Details:", error);
        // @ts-ignore
        return NextResponse.json({ error: error.message, details: error }, { status: 500 });
    }
}
