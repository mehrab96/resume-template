import Link from 'next/link'
import React from 'react'
import { TbCertificate, TbDashboard } from 'react-icons/tb'
import { MdCastForEducation, MdEditNote, MdLogout, MdOutlineBusinessCenter, MdOutlinePhone } from "react-icons/md";

const SideBar = () => {
  return (
    <div className='px-4 pr-6 mt-4'>
        <ul className="menu bg-slate-900/60 !text-light text-base rounded-box">
            <li>
                <Link className='!text-light' href="/">
                    <TbDashboard className="text-xl"/>
                    <span>Dashboard</span>          
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
                        <Link className='!text-light' href="/work-samples/all">
                            All Sample
                        </Link>
                    </li>
                    <li>
                        <Link className='!text-light' href="/work-samples/create">
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
            <li>
                <Link className='!text-light' href="/">
                    <MdLogout className="text-xl"/>
                    <span>Sign out</span>          
                </Link>
            </li>
        </ul>
    </div>
  )
}

export default SideBar