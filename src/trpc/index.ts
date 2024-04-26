import { productQueryValidator } from "../lib/validators/product-query-validator"
import { authRouter } from "./auth-router"
import { z } from 'zod'
import { publicProcedure, router } from "./trpc"
import { getPayloadClient } from "../getPayload"
import { equal } from "assert"


export const appRouter = router({


    auth : authRouter,

    getMainProducts: publicProcedure.input( z.object({
            limit: z.number().min(1).max(100),
            cursor: z.number().nullish(), // ultimo elemento retornado, puede servir para incluir paginacion
            query: productQueryValidator,
      })
    ).query( async ({ input }) => {

      const { query, cursor } = input
      const { sort, limit, category } = query 

      const payload = await getPayloadClient()

      const page = cursor || 1

      const { docs: items, hasNextPage, nextPage, } = await payload.find( {

        collection: 'products',
        where: {
          approvedForSale: {
            equals: 'approved',
          },
          'category.name' : {equals: category},
        },
        sort,
        depth: 1,
        limit,
        page,

      })

      return { items, nextPage: hasNextPage ? nextPage : null, }

    }),

    getAllCategories: publicProcedure.input(z.object({limit: z.number().min(1).max(10),})).
    query(async ({input}) => {
      const {limit} = input
      const payload = await getPayloadClient();

      const {docs : categories} = await payload.find({
        collection : 'category',
        limit,
      })

      const categoryNames = categories.map(category => category.name);
      payload.logger.info(categoryNames)
      
      return categoryNames
    }),

})

export type Approuter = typeof appRouter
