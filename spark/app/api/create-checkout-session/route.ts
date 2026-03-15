"use server";

import Stripe from "stripe";
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price: "price_1TAvpNRfOyY8ssTMMIEMI9sK",
        quantity: 1,
      },
    ],
    success_url: "https://localhost:3000/shop/success",
    cancel_url: "https://localhost:3000/shop",
    metadata: {
      user_id: user.id,                       
    },
  });

  return NextResponse.json({ url: session.url });
}
