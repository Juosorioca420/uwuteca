import React from 'react'
import { Header } from '../../../../payload/payload-types'
import { Gutter } from '../../Gutter'
import Link from 'next/link'

const HeaderComponent = ( {header} : {header : Header} ) => {
  return (
    <nav>
        <Gutter>
            <Link href = '/'>
                <img src = '/head-icon.png' alt = 'logo'/>
            </Link>
        </Gutter>
    </nav>
  )
}

export default HeaderComponent