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
import { ZodError } from 'zod'
import { useRouter } from 'next/navigation'
import {toast} from 'sonner'
import { SignUpValidator, TypeSignUpValidator } from '@/lib/validators/signup-credentials-validator'
import Image from 'next/image'


const Page = () => {

    const { register, handleSubmit, formState: {errors}, } = useForm<TypeSignUpValidator>({
        resolver: zodResolver(SignUpValidator),
    })

    const router = useRouter()

    const {mutate, isLoading} = trpc.auth.createPayloadUser.useMutation({
      
      // manejar errores
      onError: (err) => {
        // error con el correo
        if (err.data?.code === 'CONFLICT') {
          toast.warning( 'Este correo ya se encuentra registrado.' )
          return
        }

        // error con la pswd
        if (err instanceof ZodError) {
          toast.error(err.issues[0].message)
          return
        }

        // error con la confirmacion


        // algun otro error con el servidor
        toast.error( 'Hubo un error en el servidor, porfavor intente de nuevo.' )
      },

      onSuccess: ({ sentToEmail }) => {
        toast.success( `Porfavor verifique su cuenta en ${sentToEmail}.` )
        router.push('/verify-email?to=' + sentToEmail)
      },

    })

    const onSubmit = ({ email, password, confirmPassword }: TypeSignUpValidator) => {
        mutate({email, password})
    }

    return (
      <main className='lg:min-h-full'>
      <div className='hidden lg:block h-80 overflow-hidden lg:absolute lg:h-full lg:w-1/2 lg:pr-4 xl:pr-12'>
        <Image
            fill
            src='/sign-up.png'
            className='h-full w-full object-cover object-center'
            alt='sign-in'
        />
      </div>

      <div>
        <div className='mx-auto max-w-2xl px-6 py-4 sm:px-6 sm:py-4 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-19 lg:py-4 xl:gap-x-24'>
          <div className='lg:col-start-2'>


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

                      {errors?.email && (
                        <p className='text-sm text-red-500'>
                          {errors.email.message}
                        </p>
                      )}

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
                        placeholder='Ingresa tu contraseña'

                      />
                      {/* <div className='text-sm text-gray-600'>La contraseña ha de ser de almenos 8 caracteres.</div> */}
                      {errors?.password && (
                        <p className='text-sm text-red-500'>
                          {errors.password.message}
                        </p>
                      )}

                    </div>


                    <div className='grid gap-1 py-2'>

                      <Label htmlFor='confirmacion'>Confirmacion</Label>
                      <Input
                        {...register('confirmPassword')}
                        type='password'
                        className={cn({
                          'focus-visible:ring-red-500':
                            errors.confirmPassword,
                        })}
                        placeholder='Confirma tu contraseña'

                      />
                      {/* <div className='text-sm text-gray-600'>La contraseña ha de ser de almenos 8 caracteres.</div> */}
                      {errors?.confirmPassword && (
                        <p className='text-sm text-red-500'>
                          {errors.confirmPassword.message}
                        </p>
                      )}

                    </div>
                      
                    <br></br>
                    <hr></hr>
                    <Button>Registrarse</Button>

                  </div>
                </form>
              </div>


              </div>
        </div>
      </div>

    </main>
    )
}

export default Page
