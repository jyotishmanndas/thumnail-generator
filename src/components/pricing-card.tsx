"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { redirectToBillingSession } from "@/app/actions/stripe";

export function PricingCard({priceId} : {priceId: string | undefined}) {
    return (
        <Card className="w-72 h-fit">
            <CardHeader>
                <CardTitle className="text-center text-xl">
                    Pricing
                </CardTitle>
                <div className="flex items-center justify-center gap-2 pt-3">
                    <span className="text-3xl font-bold">$1.16</span>
                    <span className="text-muted-foreground">/one-time</span>
                </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-300" />
                    <span className="text-sm">Create upto 1000 designs</span>
                </div>
                <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-300" />
                    <span className="text-sm">All customization features</span>
                </div>
                <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-300" />
                    <span className="text-sm">Access to new features</span>
                </div>
            </CardContent>
            <CardFooter>
                <Button onClick={async() => await redirectToBillingSession(priceId)} className="w-full">Buy now</Button>
            </CardFooter>
        </Card>
    )
}