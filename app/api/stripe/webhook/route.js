// app/api/stripe/webhook/route.js
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createSupabaseAdmin } from '@/lib/supabase-server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(req) {
  const body = await req.text()
  const sig  = req.headers.get('stripe-signature')

  let event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
  }

  const admin = createSupabaseAdmin()

  switch (event.type) {

    // ── Abonnement activé ────────────────────────────────
    case 'checkout.session.completed': {
      const session = event.data.object
      const userId  = session.metadata?.supabase_user_id
      if (userId) {
        await admin.from('profiles').update({
          plan: 'premium',
          stripe_subscription_id: session.subscription,
          subscribed_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }).eq('id', userId)
      }
      break
    }

    // ── Renouvellement réussi ────────────────────────────
    case 'invoice.payment_succeeded': {
      const invoice = event.data.object
      const customer = await stripe.customers.retrieve(invoice.customer)
      const userId = customer.metadata?.supabase_user_id
      if (userId) {
        await admin.from('profiles').update({
          plan: 'premium',
          updated_at: new Date().toISOString(),
        }).eq('id', userId)
      }
      break
    }

    // ── Abonnement annulé / expiré ───────────────────────
    case 'customer.subscription.deleted': {
      const sub = event.data.object
      const customer = await stripe.customers.retrieve(sub.customer)
      const userId = customer.metadata?.supabase_user_id
      if (userId) {
        await admin.from('profiles').update({
          plan: 'free',
          stripe_subscription_id: null,
          updated_at: new Date().toISOString(),
        }).eq('id', userId)
      }
      break
    }
  }

  return NextResponse.json({ received: true })
}

export const config = { api: { bodyParser: false } }
