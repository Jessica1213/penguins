import { Pool } from "pg";
import { Penguin } from "@/types/penguin";
import { Memory } from "@/types/memory";

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

// Helper to transform DB rows to application types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapPenguin(row: any): Penguin {
    return {
        id: row.id,
        name: row.name,
        nickname: row.nickname,
        birthDate: row.birth_date ? new Date(row.birth_date).toISOString() : "",
        birthPlace: row.birth_place,
        weight: row.weight,
        height: row.height,
        tag: row.tag,
        group: row.group_name,
        country: row.country,
        personality: row.personality,
        note: row.note,
        images: row.images || [],
        createdAt: row.created_at ? new Date(row.created_at).toISOString() : new Date().toISOString(),
    };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapMemory(row: any): Memory {
    return {
        id: row.id,
        title: row.title,
        description: row.description,
        location: row.location,
        date: row.date ? new Date(row.date).toISOString() : "",
        imageUrl: row.image_url,
        penguinIds: row.penguin_ids || [],
    };
}

export async function getPenguins(): Promise<Penguin[]> {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM penguins ORDER BY name ASC');
        return result.rows.map(mapPenguin);
    } finally {
        client.release();
    }
}

export async function getPenguin(id: string): Promise<Penguin | undefined> {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM penguins WHERE id = $1', [id]);
        if (result.rows.length === 0) return undefined;
        return mapPenguin(result.rows[0]);
    } finally {
        client.release();
    }
}

export async function addPenguin(penguin: Omit<Penguin, "id" | "createdAt">): Promise<Penguin> {
    const client = await pool.connect();
    try {
        const result = await client.query(`
            INSERT INTO penguins (name, nickname, birth_date, birth_place, weight, height, tag, group_name, country, personality, note, images)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
            RETURNING *
        `, [
            penguin.name, penguin.nickname, penguin.birthDate, penguin.birthPlace,
            penguin.weight, penguin.height, penguin.tag, penguin.group,
            penguin.country, penguin.personality, penguin.note, penguin.images
        ]);
        return mapPenguin(result.rows[0]);
    } finally {
        client.release();
    }
}

export async function updatePenguin(id: string, penguin: Partial<Penguin>): Promise<Penguin | undefined> {
    const client = await pool.connect();
    try {
        // Build dynamic update query
        const fields: string[] = [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const values: any[] = [];
        let paramIndex = 1;

        if (penguin.name !== undefined) { fields.push(`name = $${paramIndex++}`); values.push(penguin.name); }
        if (penguin.nickname !== undefined) { fields.push(`nickname = $${paramIndex++}`); values.push(penguin.nickname); }
        if (penguin.birthDate !== undefined) { fields.push(`birth_date = $${paramIndex++}`); values.push(penguin.birthDate); }
        if (penguin.birthPlace !== undefined) { fields.push(`birth_place = $${paramIndex++}`); values.push(penguin.birthPlace); }
        if (penguin.weight !== undefined) { fields.push(`weight = $${paramIndex++}`); values.push(penguin.weight); }
        if (penguin.height !== undefined) { fields.push(`height = $${paramIndex++}`); values.push(penguin.height); }
        if (penguin.tag !== undefined) { fields.push(`tag = $${paramIndex++}`); values.push(penguin.tag); }
        if (penguin.group !== undefined) { fields.push(`group_name = $${paramIndex++}`); values.push(penguin.group); }
        if (penguin.country !== undefined) { fields.push(`country = $${paramIndex++}`); values.push(penguin.country); }
        if (penguin.personality !== undefined) { fields.push(`personality = $${paramIndex++}`); values.push(penguin.personality); }
        if (penguin.note !== undefined) { fields.push(`note = $${paramIndex++}`); values.push(penguin.note); }
        if (penguin.images !== undefined) { fields.push(`images = $${paramIndex++}`); values.push(penguin.images); }

        if (fields.length === 0) return getPenguin(id);

        values.push(id);
        const result = await client.query(`
            UPDATE penguins SET ${fields.join(", ")} WHERE id = $${paramIndex} RETURNING *
        `, values);

        if (result.rows.length === 0) return undefined;
        return mapPenguin(result.rows[0]);
    } finally {
        client.release();
    }
}

export async function deletePenguin(id: string): Promise<void> {
    const client = await pool.connect();
    try {
        await client.query('DELETE FROM penguins WHERE id = $1', [id]);
    } finally {
        client.release();
    }
}

export async function getMemories(): Promise<Memory[]> {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM memories ORDER BY date DESC');
        return result.rows.map(mapMemory);
    } finally {
        client.release();
    }
}

export async function getMemoriesByPenguin(penguinId: string): Promise<Memory[]> {
    const client = await pool.connect();
    try {
        // Postgres array contains operator @>
        const result = await client.query('SELECT * FROM memories WHERE penguin_ids @> $1::text[] ORDER BY date DESC', [[penguinId]]);
        return result.rows.map(mapMemory);
    } finally {
        client.release();
    }
}

export async function getMemory(id: string): Promise<Memory | undefined> {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM memories WHERE id = $1', [id]);
        if (result.rows.length === 0) return undefined;
        return mapMemory(result.rows[0]);
    } finally {
        client.release();
    }
}

export async function addMemory(memory: Omit<Memory, "id">): Promise<Memory> {
    const client = await pool.connect();
    try {
        const result = await client.query(`
            INSERT INTO memories (title, description, location, date, image_url, penguin_ids)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
        `, [
            memory.title, memory.description, memory.location,
            memory.date, memory.imageUrl, memory.penguinIds
        ]);
        return mapMemory(result.rows[0]);
    } finally {
        client.release();
    }
}

export async function updateMemory(id: string, memory: Partial<Memory>): Promise<Memory | undefined> {
    const client = await pool.connect();
    try {
        const fields: string[] = [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const values: any[] = [];
        let paramIndex = 1;

        if (memory.title !== undefined) { fields.push(`title = $${paramIndex++}`); values.push(memory.title); }
        if (memory.description !== undefined) { fields.push(`description = $${paramIndex++}`); values.push(memory.description); }
        if (memory.location !== undefined) { fields.push(`location = $${paramIndex++}`); values.push(memory.location); }
        if (memory.date !== undefined) { fields.push(`date = $${paramIndex++}`); values.push(memory.date); }
        if (memory.imageUrl !== undefined) { fields.push(`image_url = $${paramIndex++}`); values.push(memory.imageUrl); }
        if (memory.penguinIds !== undefined) { fields.push(`penguin_ids = $${paramIndex++}`); values.push(memory.penguinIds); }

        if (fields.length === 0) return getMemory(id);

        values.push(id);
        const result = await client.query(`
            UPDATE memories SET ${fields.join(", ")} WHERE id = $${paramIndex} RETURNING *
        `, values);

        if (result.rows.length === 0) return undefined;
        return mapMemory(result.rows[0]);
    } finally {
        client.release();
    }
}

export async function deleteMemory(id: string): Promise<void> {
    const client = await pool.connect();
    try {
        await client.query('DELETE FROM memories WHERE id = $1', [id]);
    } finally {
        client.release();
    }
}
