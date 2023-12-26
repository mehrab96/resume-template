import authOptions from '@/app/auth/authOptions'
import { Avatar, Box, Grid } from '@radix-ui/themes'
import { getServerSession } from 'next-auth'
import React from 'react'

const Header = async () => {
const session = await getServerSession(authOptions);



  return (
    <Grid align="center" className='h-20 z-50 sticky top-0 bg-white right-0 w-full shadow-xl shadow-slate-300/30'>
        <Box className="navbar bg-base-100">
            <Box className="flex-1">
            <div className="flex-none">
            <button className="btn btn-square btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </button>
            </div>
            </Box>
            <Box className="flex-none">
            <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                <Avatar referrerPolicy='no-referrer' className='cursor-pointer' src={session?.user?.image!} fallback={session?.user?.name ? session?.user?.name.charAt(0) : '?'} size="3" radius='full'/>
                </div>
                </label>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52">
                <li>
                   <span>{session?.user?.email}</span>
                </li>
                <li><a>Settings</a></li>
                <li><a>Edit profile</a></li>
                </ul>
            </div>
            </Box>
        </Box>          
    </Grid>
  )
}

export default Header