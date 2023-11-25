"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

const NavLinks = () => {
  const currentPass = usePathname();

  return (
    <nav className='py-4 relative rounded-3xl px-8 bg-slate-100 flex justify-between'>
        <Link className={`link  no-underline ${currentPass == '/' ? 'activeLink' : ''}`} href="/">About me</Link>
        <Link className={`link  no-underline ${currentPass == '/resume' ? 'activeLink' : ''}`} href="/resume">Resume</Link>
        <Link className={`link  no-underline ${currentPass == '/work-samples' ? 'activeLink' : ''}`} href="/work-samples">Work Samples</Link>
        <Link className={`link  no-underline ${currentPass == '/contact-me' ? 'activeLink' : ''}`} href="/contact-me">Contact me</Link>
    </nav>
  )
}

export default NavLinks