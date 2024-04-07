"use client"

import {trpc} from '@/trpc/client'
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
import Image from "next/image"
import { use } from 'react'
import { useRouter } from 'next/router'

const Page = () => {

    const { register, handleSubmit, formState: {errors}, } = useForm<TAuthCredentialsValidator>({
        resolver: zodResolver(AuthCredentialsValidator),
    })

    // const router = useRouter()

    const {mutate, isLoading} = trpc.auth.createPayloadUser.useMutation({})

    const onSubmit = ({ email, password, }: TAuthCredentialsValidator) => {
        //send data to the server
        //coincide una cuenta existente con el email -> error.email
        //enviar correo de verificacion

        mutate({email, password})
    }

    return (
        <>
          <div className='container relative flex pt-20 flex-col items-center justify-center lg:px-0'>
            <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
              <div className='flex flex-col items-center space-y-2 text-center'>
                <img src='/logo.png' width={115} height={45} alt="logo"/>
                <h1 className='text-2xl font-semibold tracking-tight'>
                  Registrar Cuenta
                </h1>
    
                <Link
                  className={buttonVariants({
                    variant: 'link',
                    className: 'gap-1.5',
                  })}
                  href='/sign-in'>
                  Ya estas registrado?  Inicia Sesion
                  <ArrowRight className='h-4 w-4' />
                </Link>
              </div>
    
              <div className='grid gap-6'>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className='grid gap-2'>

                    <div className='grid gap-1 py-2'>
                      <Label htmlFor='email'>E-mail</Label>
                      <Input
                        {...register('email')}
                        className={cn({
                          'focus-visible:ring-red-500':
                            errors.email,
                        })}
                        placeholder='nombre@example.com'
                      />

                      {/* {errors?.email && (
                        <p className='text-sm text-red-500'>
                          {errors.email.message}
                        </p>
                      )} */}
                    </div>
    
                    <div className='grid gap-1 py-2'>
                      <Label htmlFor='password'>Contraseña</Label>
                      <Input
                        {...register('password')}
                        type='password'
                        className={cn({
                          'focus-visible:ring-red-500':
                            errors.password,
                        })}
                        placeholder='contraseña'

                      />

                      {/* {errors?.password && (
                        <p className='text-sm text-red-500'>
                          {errors.password.message}
                        </p>
                      )} */}
                    </div>
    
                    <Button>Registrarse</Button>

                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )
}

export default Page
