"use server";

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { sbMarkDoubleStarsPurchased } from "@/actions/user";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature") || "";

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err: any) {
    console.error("webhook signature verification failed", err.message);
    return NextResponse.json(
      { error: `webhook error: ${err.message}` },
      { status: 400 },
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.user_id;


        console.log(session);
        console.log(userId);

        await sbMarkDoubleStarsPurchased();

        console.log("stars purchase marked.");

        break;

      default:
        console.log();
    }
  } catch (err) {
    return NextResponse.json(
      { error: "failed to process webhook" },
      { status: 500 },
    );
  }

  return NextResponse.json({ received: true });
}
