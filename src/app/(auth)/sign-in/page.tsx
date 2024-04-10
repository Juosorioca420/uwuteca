"use client"

import {trpc} from '@/trpc/client'
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { ArrowRight, KeyRound } from "lucide-react"
import Link from "next/link"
import {useForm} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AuthCredentialsValidator, TAuthCredentialsValidator } from "@/lib/validators/account-credentials-validator"
import { useRouter, useSearchParams  } from 'next/navigation'
import {toast} from 'sonner'

const Page = () => {

    const searchParams = useSearchParams()
    const isAdmin = searchParams.get('as') === 'admin'
    const origin = searchParams.get('origin')

    const { register, handleSubmit, formState: {errors}, } = useForm<TAuthCredentialsValidator>({
        resolver: zodResolver(AuthCredentialsValidator),
    })

    const router = useRouter()

    const {mutate: signIn, isLoading} = trpc.auth.signIn.useMutation({
      
        onSuccess : async () => {

            toast.success('Inicio de Sesion existoso.')
            router.refresh()

            if (origin){ 
                router.push(`/${origin}`) 
                return
            }
            if (isAdmin){ 
                router.push('/panel')
                return
            }

            router.push('/')
            router.refresh()

        },

        onError : (e) => {

            if ( e.data?.code === 'UNAUTHORIZED' ){
                toast.error('Correo o Contraseña incorrectos.')
            }

        },

    })

    const onSubmit = ({ email, password, }: TAuthCredentialsValidator) => {
        //send data to the server
        signIn({email, password})
    }

    const asAdmin = () => { router.push('?as=admin') }
    const asUser = () => { router.replace('/sign-in', undefined) }


    return (
        <>
          <div className='container relative flex pt-12 flex-col items-center justify-center lg:px-0'>
            <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
              <div className='flex flex-col items-center space-y-2 text-center'>
                <img src='/logo.png' width={115} height={45} alt="logo"/>
                <h1 className='text-2xl font-semibold tracking-tight'>
                  Iniciar Sesion
                </h1>
    
                <Link
                  className={buttonVariants({
                    variant: 'link',
                    className: 'gap-1',
                  })}
                  href='/sign-up'>
                  No tienes Cuenta?  Registrate
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
                        placeholder='contraseña'

                      />
                      {/* <div className='text-sm text-gray-600'>La contraseña ha de ser de almenos 8 caracteres.</div> */}
                      {errors?.password && (
                        <p className='text-sm text-red-500'>
                          {errors.password.message}
                        </p>
                      )}


                    </div>
                      
                    <Link   className= 'text-right text-sm text-semibold text-gray-600 flex items-end gap-1.5 justify-end' href='/pswd-forgot'>
                        Recuperar Contraseña 
                        <KeyRound className='h-3.5 w-3.5' />
                    </Link>

                    <br></br>
                    <hr></hr>

                    <Button>Iniciar Sesion</Button>

                  </div>
                </form>


                {/* <div className='relative'>
                        <div
                            aria-hidden='true'
                            className='absolute inset-0 flex items-center'>
                            <span className='w-full border-t' />
                        </div>
                        <div className='relative flex justify-center text-xs '>
                            <span className='bg-background px-2 text-gray-500'>
                            Administrador?
                            </span>
                        </div>
                </div>

                {isAdmin ? (
                    <Button
                        onClick={asAdmin}
                        variant='secondary'
                        disabled={isLoading}>
                        Continuar como Cliente 
                    </Button>
                    ) : (
                    <Button
                        onClick={asUser}
                        variant='secondary'
                        disabled={isLoading}>
                        Continuar como Administrador
                    </Button>
                )} */}

              </div>
            </div>
          </div>
        </>
    )
}

export default Page
