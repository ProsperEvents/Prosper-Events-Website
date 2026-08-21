# Prosper Events Website

Production website for Prosper Events, built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Cocktail Classes ticketing setup

The ticket checkout uses Stripe Checkout. Add the values in `.env.example` to the production environment (and a local `.env.local` for testing), then configure Stripe to send the `checkout.session.completed` event to:

`https://prosperevents.ca/api/stripe/webhook`

Confirmation and cancellation emails are sent through Resend. Authenticate `prosperevents.ca` in Resend and create the sender `Theliau@prosperevents.ca`; Gmail routing does not need to change. The initial inventory is 14 tickets per night, with the first 10 completed tickets across both dates automatically priced at 20% off.
