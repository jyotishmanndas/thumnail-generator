import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";
import { redirect } from "next/navigation";
import { prisma } from "./db";

export async function CurrentProfile() {

    const session = await getServerSession(authOptions)

    if (!session) {
        return redirect("/signup")
    }

    const profile = await prisma.user.findUnique({
        where: {
            id: session?.user.id
        }
    })
    return profile;
}