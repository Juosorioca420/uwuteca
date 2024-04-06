import React from 'react'
import MaxWidthWrapper from './MaxWidthWrapper'
import Link from 'next/link'
import Image from 'next/image'
import { Icons } from './Icons'
import NavItems from './NavItems'
import { buttonVariants } from './ui/button'
import Cart from './Cart'

const Navbar = () => {
    
    const user = null

  return (
    <div className='bg-white sticky z-50 top-0 inset-x-0 h-24'>

        <header className='relative bg-white'>

            <MaxWidthWrapper>
                <div className='border-b border-gray-300'>

                    <div className='flex h-24 items-center'>
                        

                        <div className='ml-0 flex lg:ml-0'>
                            <Link href='/'> 
                                < Image src='/head-icon.png' alt='logo' width={155} height={45}/>
                            </Link>
                        </div>

                        <div className='hidden z-50 lg:ml-8 lg:block lg:self-stretch'>
                            <NavItems />
                        </div>

                        
                        <div className='ml-auto flex items-center'>
                            <div className='hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6'>
                            {user ? null : (
                                <Link
                                href='/sign-in'
                                className={buttonVariants({
                                    variant: 'default',
                                })}>
                                Iniciar Sesion
                                </Link>
                            )}

                            {user ? null : (
                                <span
                                className='h-6 w-px bg-gray-300'
                                aria-hidden='true'
                                />
                            )}

                            {user ? (
                                <p></p>// <UserAccountNav user={user} />
                            ) : (
                                <Link
                                href='/sign-up'
                                className={buttonVariants({
                                    variant: 'ghost',
                                })}>
                                Registrarse
                                </Link>
                            )}

                            {user ? (
                                <span
                                className='h-6 w-px bg-gray-300'
                                aria-hidden='true'
                                />
                            ) : null}

                            {user ? null : (
                                <div className='flex lg:ml-6'>
                                <span
                                    className='h-6 w-px bg-gray-300'
                                    aria-hidden='true'
                                />
                                </div>
                            )}

                            <div className='ml-4 flow-root lg:ml-6'>
                                <Cart />
                            </div>
                            </div>
                        </div>


                    </div>

                </div>
            </MaxWidthWrapper>

        </header>

    </div>
  )
}

export default Navbar
