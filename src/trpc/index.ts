import { productQueryValidator } from "../lib/validators/product-query-validator"
import { authRouter } from "./auth-router"
import { z } from 'zod'
import { publicProcedure, router } from "./trpc"
import { getPayloadClient } from "../getPayload"


export const appRouter = router({


    auth : authRouter,

    getMainProducts: publicProcedure.input( z.object({
            limit: z.number().min(1).max(100),
            cursor: z.number().nullish(), // ultimo elemento retornado, puede servir para incluir paginacion
            query: productQueryValidator,
      })
    ).query( async ({ input }) => {

      const { query, cursor } = input
      // spreading que contiene caracteristicas, sirve si añadimos algun otro campo al query
      const { sort, limit, ...queryOpts } = query 

      const payload = await getPayloadClient()

      const parsedQueryOpts: Record< string, { equals: string } > = {}
      Object.entries(queryOpts).forEach(([key, value]) => {
        parsedQueryOpts[key] = { equals: value, }
      })

      const page = cursor || 1

      const { docs: items, hasNextPage, nextPage, } = await payload.find( {

        collection: 'products',
        where: {
          approvedForSale: {
            equals: 'approved',
          },
          ...parsedQueryOpts,
        },
        sort,
        depth: 1,
        limit,
        page,

      })

      return { items, nextPage: hasNextPage ? nextPage : null, }

    }),


})

export type Approuter = typeof appRouter
