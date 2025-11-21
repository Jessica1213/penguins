"use server";

import {
    addPenguin,
    updatePenguin,
    deletePenguin,
    addMemory,
    updateMemory,
    deleteMemory,
    getPenguins
} from "@/lib/data";
import { Penguin } from "@/types/penguin";
import { Memory } from "@/types/memory";
import { revalidatePath } from "next/cache";

export async function createPenguinAction(data: Omit<Penguin, "id" | "createdAt">) {
    await addPenguin(data);
    revalidatePath("/penguins");
    revalidatePath("/admin");
}

export async function updatePenguinAction(id: string, data: Partial<Penguin>) {
    await updatePenguin(id, data);
    revalidatePath(`/penguins/${id}`);
    revalidatePath("/penguins");
    revalidatePath("/admin");
}

export async function deletePenguinAction(id: string) {
    await deletePenguin(id);
    revalidatePath("/penguins");
    revalidatePath("/admin");
}

export async function createMemoryAction(data: Omit<Memory, "id">) {
    await addMemory(data);
    revalidatePath("/admin");
    revalidatePath("/memories");
}

export async function updateMemoryAction(id: string, data: Partial<Memory>) {
    await updateMemory(id, data);
    revalidatePath("/admin");
    revalidatePath("/memories");
}

export async function deleteMemoryAction(id: string) {
    await deleteMemory(id);
    revalidatePath("/admin");
    revalidatePath("/memories");
}

export async function getPenguinsAction() {
    return await getPenguins();
}
