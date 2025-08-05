"use server";

import { CurrentProfile } from "@/lib/currentProfile";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function Credit() {
    const profile = await CurrentProfile();

    if (!profile) {
        throw new Error("Unauthorized")
    };

    await prisma.user.update({
        where: {
            id: profile.id
        },
        data: {
            credits: {
                decrement: 1
            }
        }
    });
    revalidatePath("/dashboard");
    return { success: true }
}