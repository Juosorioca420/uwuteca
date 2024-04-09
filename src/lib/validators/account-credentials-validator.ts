import { z } from "zod"

export const AuthCredentialsValidator = z.object({
    email: z.string().email({
        message: 'Formato de correo invalido, porfavor ingrese un correo valido.',
    }),

    password: z.string().min(8, {
        message: 'La contraseña debe contener almenos 8 caracteres.',
    }),
    
    // confirm: 
})

export type TAuthCredentialsValidator = z.infer<typeof AuthCredentialsValidator>
