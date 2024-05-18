import { z } from "zod";
import { privateProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { getPayloadClient } from "../getPayload";
import type Stripe from "stripe";
import { stripe } from "../lib/stripe";

export const paymentRouter = router({

    //procedimiento que solo aquellos autorizados pueden ejecutar 
    createSession: privateProcedure.input(z.object({ products_info: z.array( z.tuple( [z.string(), z.number()] ) ) }))
    .mutation(async ({ ctx, input }) => {

        const { user } = ctx
        let { products_info } = input

        if (products_info.length === 0){
            throw new TRPCError({ code: 'BAD_REQUEST'})
        }

        const payload = await getPayloadClient()

        const { docs: products } = await payload.find({
            collection: 'products',
            where:{
                id:{
                    in: products_info.map( ([id, qty]) => id )
                },
            },
        })

        const valid_products = products.filter( (product) => Boolean(product.priceId) )
        const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = []

        const order = await payload.create({
            collection: 'orders',
            data: {
              _isPaid: false,
              products: valid_products.map((p) => p.id),
              user: user.id,
            },
        })

        valid_products.forEach( (product) => {
            const qty = products_info.find( ([id, qty]) => id === product.id )?.[1] ?? 1
            line_items.push({
                price: product.priceId!,
                quantity: qty,
            })
        })

        try{
            const stripeSession =
                await stripe.checkout.sessions.create({

                    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
                    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/cart`,
                    payment_method_types: ['card', 'paypal'],
                    mode: 'payment',
                    metadata: {
                        userId: user.id,
                        orderId: order.id,
                    },
                    shipping_address_collection: { allowed_countries: ['CO', 'MX', 'AR', 'CL', 'UY'] },
                    line_items,
            })

            return { url: stripeSession.url }
        } 
        catch (err){
            return { url: null }
        }

    }),

})
