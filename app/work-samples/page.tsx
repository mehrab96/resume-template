"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import {MdArrowRightAlt} from 'react-icons/md'

const WorkSamplesPage = () => {

  const [samples , setSamples] = useState([
    {title: 'sample 1' , image: '/images/imagenotfound.webp'},
    {title: 'sample 2' , image: '/images/imagenotfound.webp'},
    {title: 'sample 3' , image: '/images/imagenotfound.webp'},
    {title: 'sample 4' , image: '/images/imagenotfound.webp'},
  ]);

  return (
    <main>
      <div className="highlight">
        <span className="font-black text-xl text-primary-active relative">
          Work Samples
        </span>
        <section className="grid mt-6 grid-cols-2 max-sm:grid-cols-1 gap-6 ltr:text-left rtl:text-right">
          {samples.map((sample , index) => (
            <article key={index}>
            <figure className="h-52 relative group overflow-hidden border-[1px] rounded-xl">
                <Link href="`/work-samples/${item.slug}`" className="flex rtl:flex-row-reverse ltr:flex-row-reverse items-center justify-center text-light font-semibold absolute opacity-0 visibility-hidden transition-all duration-500 hover:opacity-100 group-hover:visibility-visible top-0 right-0 w-full h-full bg-primary-active/80">                                 
                    <span className='flex'>More Information</span>
                    <MdArrowRightAlt className="flex mt-[.07rem] text-2xl"/>                
                </Link>
                <Image width={400} height={400} className="w-full object-cover h-full" src={sample.image} alt="item.title" />
            </figure>
            </article>
          ))}
           
        </section>
      </div>
    </main>
  )
}

export default WorkSamplesPage