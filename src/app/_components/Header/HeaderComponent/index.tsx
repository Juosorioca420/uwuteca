'use client' // para que nos deje usar hooks

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAllFormFields } from 'payload/components/forms'

import { Header } from '../../../../payload/payload-types'
import { noHeaderFooterUrls } from '../../../constants'
import { Gutter } from '../../Gutter' // Es un sub-contendor con caracteristicas de padding definidas
import MobileNav from '../MobileNav'
import { HeaderNav } from '../Nav'

import classes from './index.module.scss'

const HeaderComponent = ({ header }: { header: Header }) => {
  const ref = usePathname() // hook para obtener el path name

  return (
    <nav
      className={[classes.header, noHeaderFooterUrls.includes(ref) && classes.hide]
        .filter(Boolean)
        .join(' ')}
    >
      {' '}
      {/* filter(boolean) activa .hide del login y signup */}
      <Gutter className={classes.wrap}>
        <Link href="/">
          <img className={classes.logo} src="/head-icon.png" alt="logo" />
        </Link>

        <HeaderNav header={header} />
        {/* <MobileNav header = {header} />  de momento el Nav estandar se ajusta bien */}
      </Gutter>
    </nav>
  )
}

export default HeaderComponent
