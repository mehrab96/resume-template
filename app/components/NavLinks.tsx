"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

const NavLinks = () => {
  const currentPass = usePathname();

  return (
    <nav className='py-4 relative rounded-3xl px-8 bg-slate-100 flex justify-between'>
        <Link className={`link ${currentPass == '/' ? 'activeLink' : ''}`} href="/">About me</Link>
        <Link className={`link ${currentPass == '/resume' ? 'activeLink' : ''}`} href="/resume">Resume</Link>
        <Link className={`link ${currentPass == '/work-samples' ? 'activeLink' : ''}`} href="/work-samples">Work samples</Link>
        <Link className={`link ${currentPass == '/contact-me' ? 'activeLink' : ''}`} href="/contact-me">Contact me</Link>
    </nav>
  )
}

export default NavLinks