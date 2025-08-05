import { SignOut } from "@/components/signout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CurrentProfile } from "@/lib/currentProfile";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: React.ReactNode }) {

    const profile = await CurrentProfile();
    if (!profile) {
        return redirect("/signup")
    };

    const user = await prisma.user.findUnique({
        where: {
            id: profile.id
        },
        select: {
            credits: true
        }
    });

    return (
        <div className="h-screen w-full flex flex-col items-center">
            <nav className="flex w-full h-20 px-6 items-center justify-between border-b fixed top-0 left-0 right-0 z-50 bg-white">
                <Link href="/">
                    <span className="font-bold text-xl">Thumbnails</span>
                </Link>
                <div className="flex items-center gap-4">
                    <Badge variant="secondary" className="py-2 text-sm">{user?.credits} credits left</Badge>
                    <Link href="/pricing">
                        <Button>
                            Buy credits
                        </Button>
                    </Link>
                    <SignOut />
                </div>
            </nav>
            {children}
        </div>
    )
}