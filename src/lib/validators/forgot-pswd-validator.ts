import { z } from "zod"

export const ForgotValidator = z.object({
    email: z.string().email({
        message: 'Formato de correo invalido, porfavor ingrese un correo valido.',
    }),
})

export type TypeForgotValidator = z.infer<typeof ForgotValidator>
