"use client"

import { Icons } from "@/components/Icons"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import {useForm} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {ZodEffects, z} from 'zod'
import { AuthCredentialsValidator, TAuthCredentialsValidator } from "@/lib/validators/account-credentials-validator"

const Page = () => {

    const {register, handleSubmit, formState: {errors}} = useForm<TAuthCredentialsValidator>({
        resolver: zodResolver(AuthCredentialsValidator),
    })

    const onSubmit = ({email, password}: TAuthCredentialsValidator) => {
        //send data to the server
    }

    return <>
        <div className="container relative flex pt-20 flex-col items-center justifiy-center lg:px-0">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm: w-[350px]">
                <div className="flex flex-col items-center space-y-2 text-center">
                    <Icons.logo className="h-20 w-20"/>
                    <h1 className="text-2x1 font-bold">
                        Crear cuenta
                    </h1>

                    <Link
                    className={buttonVariants({
                        variant:"link",
                        className: "gap-1.5"
                    })}
                    href={"/sign-in"}>
                        Ya tienes cuenta? Inicia sesion
                        <ArrowRight className="h-4 w-4" />
                    </Link>

                    <div className="grid gap-6">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid gap-2">
                                <div className="grid gap-1 py-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input 
                                    {...register('email')}
                                    className={cn({
                                        "focus-visible:ring-red-500": errors.email,
                                    })}
                                    placeholder="nombre@ejemplo.com"/>
                                </div>
                                <div className="grid gap-1 py-2">
                                    <Label htmlFor="password">Contraseña</Label>
                                    <Input 
                                    {...register('password')}
                                    className={cn({
                                        "focus-visible:ring-red-500": errors.password,
                                    })}
                                    placeholder="Password"/>
                                </div>
                                <Button>Iniciar sesion</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Page