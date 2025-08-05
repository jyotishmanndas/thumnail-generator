import { CurrentProfile } from "@/lib/currentProfile"
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UploadDropzone } from "@/components/thumnail-creator/upload-dropzone";

export default async function Dashboard() {
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
        <div className="flex items-center justify-center h-screen w-full px-4 mt-20">
            <div className="flex flex-col items-center w-full">
                {user?.credits === 0 ? (
                    <div className="flex flex-col items-center">
                        <h1 className="scroll-m-20 text-center text-4xl font-bold tracking-tight text-balance">
                            Want to create a thumnail?
                        </h1>
                        <p className="text-muted-foreground leading-8">
                            Buy more credits to continue generating thumbnails.
                        </p>
                        <Link href="/pricing">
                            <Button className="flex items-center mt-3">
                                Buy credits
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <UploadDropzone />
                )}
            </div>
        </div>
    )
}