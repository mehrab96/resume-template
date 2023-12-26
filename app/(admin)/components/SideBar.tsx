"use client"
import Link from 'next/link'
import React from 'react'
import { TbCertificate, TbDashboard } from 'react-icons/tb'
import { MdCastForEducation, MdEditNote, MdLogout, MdOutlineBusinessCenter, MdOutlinePermMedia, MdOutlinePhone } from "react-icons/md";
import { signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';


const SideBar = () => {
    const router = useRouter();

    const logoutHandler =  () => {
       
        signOut({ redirect: false }).then(() => {
			router.push('/')
            
		});
        
    }

  return (
    <div className='px-4 pr-6 mt-4 sticky top-6 right-0'>
        <figure className='w-full py-1 h-20'>
            <img className='w-full h-full object-contain' src="/images/Untitled.png" alt="" />
        </figure>
        <ul className="menu bg-slate-900/60 !text-light text-base rounded-box">
            <li>
                <Link className='!text-light' href="/admin/dashboard">
                    <TbDashboard className="text-xl"/>
                    <span>Dashboard</span>          
                </Link>
            </li>
            <li>
                <Link className='!text-light' href="/admin/media">
                    <MdOutlinePermMedia className="text-xl"/>
                    <span>Media Management</span>          
                </Link>
            </li>
            <li>
                <details color='!text-light'>
                <summary>
                    <MdOutlineBusinessCenter className="text-xl"/>
                    Work Samples
                </summary>
                <ul className='before:bg-slate-700'>
                    <li>
                        <Link className='!text-light' href="/admin/work-samples/all">
                            All Sample
                        </Link>
                    </li>
                    <li>
                        <Link className='!text-light' href="/admin/work-samples/create">
                            Add Sample
                        </Link>
                    </li>                  
                </ul>
                </details>
            </li>
            <li>
                <details color='!text-light'>
                <summary>
                    <TbCertificate className="text-xl"/>
                    My Experiences
                </summary>
                <ul className='before:bg-slate-700'>
                    <li>
                        <Link className='!text-light' href="/work-samples/all">
                            All Experiences
                        </Link>
                    </li>
                    <li>
                        <Link className='!text-light' href="/work-samples/create">
                            Add Experience
                        </Link>
                    </li>                  
                </ul>
                </details>
            </li>
            <li>
                <details color='!text-light'>
                <summary>
                    <MdCastForEducation className="text-xl"/>
                    My Education
                </summary>
                <ul className='before:bg-slate-700'>
                    <li>
                        <Link className='!text-light' href="/work-samples/all">
                            All Educations
                        </Link>
                    </li>
                    <li>
                        <Link className='!text-light' href="/work-samples/create">
                            Add Education
                        </Link>
                    </li>                  
                </ul>
                </details>
            </li>
            <li>
                <Link className='!text-light' href="/">
                    <MdEditNote className="text-xl"/>
                    <span>Edit Information</span>          
                </Link>
            </li>
            <li>
                <Link className='!text-light' href="/">
                    <MdOutlinePhone className="text-xl"/>
                    <span>Contact Me</span>          
                </Link>
            </li>    
            <li onClick={logoutHandler}>
                <span className='!text-light'>
                    <MdLogout className="text-xl"/>
                    <span>Sign out</span>          
                </span>
            </li>
        </ul>
    </div>
  )
}

export default SideBar