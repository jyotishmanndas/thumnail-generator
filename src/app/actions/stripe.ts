"use server"

import { CurrentProfile } from "@/lib/currentProfile";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import Stripe from "stripe"

export async function redirectToBillingSession(priceId: string | undefined) {

    if (![process.env.STRIPE_100_PACK].includes(priceId)) {
        throw new Error("invalid priceId")
    }

    const profile = await CurrentProfile();

    if (!profile) {
        throw new Error("Unauthorized")
    }

    const user = await prisma.user.findUnique({
        where: {
            id: profile.id
        },
        select: {
            stripeCustomerId: true
        }
    })

    if (!user?.stripeCustomerId) {
        throw new Error("User has no stripe customerId")
    };

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    const session = await stripe.checkout.sessions.create({
        line_items: [{
            price: priceId,
            quantity: 1
        }],
        customer: user.stripeCustomerId,
        mode: "payment",
        success_url: `http://localhost:3000/api/session-callback`
    })

    if (!session.url) {
        throw new Error("No session url ")
    }

    redirect(session.url)
}