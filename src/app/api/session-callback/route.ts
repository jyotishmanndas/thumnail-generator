import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest){

    revalidatePath("/dashboard");
    redirect("/dashboard")
}