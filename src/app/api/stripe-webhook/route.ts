import { prisma } from "@/lib/db";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: NextRequest) {

    const body = await req.text();
    const sign = headers().get("Stripe-Signature");
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    let event: Stripe.Event;

    try {
        if (!sign || !webhookSecret) {
            return
        }

        event = Stripe.webhooks.constructEvent(body, sign, webhookSecret);
    } catch (error) {
        return new NextResponse("Webhook error", { status: 400 })
    }

    switch (event.type) {
        case "checkout.session.completed":
            const session = event.data.object;
            const customerId = session.customer as string;
            const retrievedSession = await stripe.checkout.sessions.retrieve(
                session.id,
                {
                    expand: [
                        "line_items"
                    ]
                }
            );

            const lineItems = retrievedSession.line_items;
            if (lineItems && lineItems.data.length > 0) {
                const priceId = lineItems.data[0]?.price?.id ?? undefined;

                if (priceId) {
                    let creditsToaAdd = 0;

                    // switch(priceId){
                    //     case process.env.STRIPE_100_PACK:

                    // }
                    if (process.env.STRIPE_100_PACK) {
                        creditsToaAdd = 1000
                    }

                    if (creditsToaAdd > 0) {
                        await prisma.user.update({
                            where: {
                                stripeCustomerId: customerId
                            },
                            data: {
                                credits: {
                                    increment: creditsToaAdd
                                }
                            }
                        })
                    }
                }
            }
            break;
        default:
            console.log("Unhandled event type" + event.type);
    }

    return new NextResponse(JSON.stringify({ recieved: true }))

}