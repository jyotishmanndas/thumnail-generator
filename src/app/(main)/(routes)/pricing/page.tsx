
import { PricingCard } from "@/components/pricing-card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { env } from "process";

export default function Pricing() {
    return (
        <div className=" w-full h-full flex flex-col items-center justify-center">
            <Link href="/dashboard" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Go back</span>
            </Link>
           <PricingCard priceId={process.env.STRIPE_100_PACK} />
        </div>
    )
}