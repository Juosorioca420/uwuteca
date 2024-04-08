'use client'

import { trpc } from '@/trpc/client'
import Image from 'next/image'
import Link from 'next/link'
import { Loader2, MailCheck, XCircle } from 'lucide-react'
import { buttonVariants } from './ui/button'


interface VerifyEmailProps {
  token: string
}

const VerifyEmail = ({ token }: VerifyEmailProps) => {
  const { data, isLoading, isError } = trpc.auth.verifyEmail.useQuery( {token} )

  if (isError) {
    return (

      <div className='flex flex-col items-center gap-2'>

        <div className='relative mb-4 h-60 w-60 text-muted-foreground'>
            < Image 
                src='/verify/error.png' alt='error-correo-img' 
                layout="responsive" height={680} width={680}
            />
        </div>

        <XCircle className='h-10 w-10 text-red-600' />

        <h3 className='font-semibold text-xl'>
          Verificacion Fallida
        </h3>

        <p className='text-gray-600 text-center'>
          Usted ya ha sido verificado previamente o su Token es invalido o ha expirado.
        </p>
        <Link
          className={buttonVariants({ variant : 'link' })}
          href='/sign-in'>
          Intentelo de Nuevo.
        </Link>

      </div>
    )

  }


  if (data?.success) {
    return (

      <div className='flex h-full flex-col items-center justify-center'>

        <div className='relative mb-4 h-60 w-60 text-muted-foreground'>
            < Image 
                src='/verify/success.png' alt='success-correo-img' 
                layout="responsive" height={724} width={1156}
            />
        </div>

        <br></br>
        <br></br>
        <br></br>

        <MailCheck className='h-10 w-10 text-green-600' />

        <h3 className='font-semibold text-2xl'>
          ¡Verificacion Exitosa!
        </h3>

        <p className='text-gray-600 text-center mt-1'>
          Gracias por registrarse a la {' '}
          <span className='font-semibold text-blue-700' >UwUteca</span>.
        </p>

        <Link
          className={buttonVariants({ className: 'mt-4' })}
          href='/sign-in'>
          Ingresar
        </Link>

      </div>

    )
  }


  if (isLoading) {
    return (

      <div className='flex flex-col items-center gap-2 py-8'>
        <br></br>
        <br></br>
        <br></br>

        <Loader2 className='animate-spin h-11 w-11 text-zinc-400' />

        <h3 className='font-semibold text-xl'>
          Verificando...
        </h3>

        <p className='text-gray-600 text-sm'>
          Estamos terminando de verificar su nueva Cuenta. Esto tardara unos segundos más.
        </p>

      </div>

    )
  }


}

export default VerifyEmail
