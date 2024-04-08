import { z } from "zod"

export const AuthCredentialsValidator = z.object({
    email: z.string().email(),
    password: z.string().min(8, {
        message: "La contraseña debe contener almenos 8 caracteres."
    }),
    // confirm: 
})

export type TAuthCredentialsValidator = z.infer<typeof AuthCredentialsValidator>
