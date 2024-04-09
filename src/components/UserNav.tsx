'use client'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button } from "./ui/button"
import { User } from "../payload-types"
import Link from "next/link"
import { useAuth } from '@/hooks/useAuth'

const UserNav = ( {user} : {user: User} ) => {

    const {signOut} = useAuth()

    return (
        <DropdownMenu>

            
        <DropdownMenuTrigger asChild className='overflow-visible'>
            <Button variant='ghost' size='sm' className='relative'>
            Cuenta
            </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent className='bg-white w-60' align='end'>

            <div className='flex items-center justify-start gap-2 p-2'>
            <div className='flex flex-col space-y-0.5 leading-none'>
                <p className='font-medium text-sm text-black'>
                {user.email}
                </p>
            </div>
            </div>

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
                <Link href='/panel'> 
                    {user.role === 'admin' ? 
                        (<b className='text-blue-800'>Panel de Administrador</b>) 
                        : ('Perfil') 
                    } 
                </Link>
            </DropdownMenuItem>

            <DropdownMenuItem  className='cursor-pointer' onClick={signOut}>
                Cerrar Sesion
            </DropdownMenuItem>

        </DropdownMenuContent>

        
        </DropdownMenu>
    )

}

export default UserNav
