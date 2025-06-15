import { SignOut } from "@/components/signout";
import { Button } from "@/components/ui/button";
import { CurrentProfile } from "@/lib/currentProfile";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: React.ReactNode }) {

    const profile = await CurrentProfile();

    if (!profile) {
        return redirect("/signup")
    }

    const user = await prisma.user.findUnique({
        where: {
            id: profile.id
        },
        select: {
            credits: true
        }
    })

    return (
        <div className="h-screen w-full flex flex-col items-center overflow-y-scroll p-6">
            <nav className="flex w-full items-center justify-between pb-6 border-b">
                <Link href="/">
                    <span className="font-bold text-xl">Thumbnails</span>
                </Link>
                <div className="flex items-center gap-4">
                    <p>{user?.credits} credits left</p>
                    <Link href="/pricing">
                        <Button>
                            Buy more credits
                        </Button>
                    </Link>
                    <SignOut />
                </div>
            </nav>
            {children}
        </div>
    )
}