import { z } from 'zod'

export const productQueryValidator = z.object({
  category: z.string().optional(),
  sort: z.enum(['asc', 'desc']).optional(),
  limit: z.number().optional(),
})

export type TypeProductQueryValidator = z.infer<typeof productQueryValidator>
