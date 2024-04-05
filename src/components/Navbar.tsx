import React from 'react'
import MaxWidthWrapper from './MaxWidthWrapper'
import Link from 'next/link'
import Image from 'next/image'
import { Icons } from './Icons'
import NavItems from './NavItems'

const Navbar = () => {
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


                    </div>

                </div>
            </MaxWidthWrapper>

        </header>

    </div>
  )
}

export default Navbar
