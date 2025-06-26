import { Button } from "@/components/ui/button";
import { CurrentProfile } from "@/lib/currentProfile";
import { redirect } from "next/navigation";
import Dashboard from "./(main)/(routes)/dashboard/page";
import SignUpPage from "./(auth)/signup/page";

export default async function Home() {

  const profile = await CurrentProfile();

  if (profile) {
    return redirect("/dashboard")
  };

  return <SignUpPage />
}
