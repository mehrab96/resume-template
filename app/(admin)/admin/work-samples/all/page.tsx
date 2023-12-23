"use client"
import { Badge, Button , DropdownMenu } from '@radix-ui/themes';
import React, { useEffect } from 'react';
import useStoreSample from '@/app/(admin)/store/sample';
import { Skeleton } from '@/app/(admin)/components/packages/packagesUi';

const AllSamplesPage = () => {
  const items: number[] = [1,2,3,4,5,6];
  const { 
    samples,
    getAllSamples,
    deleteSample,
    currentPage,
    loader,
    lastPage,
    links,
  } = useStoreSample();

  const paginateHandler = (type: string , page: number = 0) => {
    switch(type){
      case 'prev' : 
      if(currentPage > 1) getAllSamples(parseInt(currentPage.toString()) - 1)
      break;
      case 'next' : 
      if(currentPage < lastPage) getAllSamples(parseInt(currentPage.toString()) + 1)
      break;
      case 'setPage' : 
      if(currentPage <= lastPage && currentPage >= 1) getAllSamples(page)
      break;
    }
  }

  useEffect(()=> {
    getAllSamples(1);
  } , []);

 

  return (
    <div className="!bg-white p-3 rounded-3xl shadow-[0_0_30px_rgba(0,0,0,0.03)]">
      <table className="table w-full">
        {/* head */}
        <thead>
          <tr className='text-sm border-b-gray-200 font-bold'>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>Image</th>
            <th>Title</th>
            <th>Status</th>
            <th>Publish Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>    
          {!loader && samples.map((sample , index) => (
            <tr className='border-b-gray-100' key={index}>
              <td>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </td>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask !rounded-lg w-20 h-20">
                      <img src={sample.image ? sample.image : '/images/imagenotfound.webp'} alt={sample?.title}/>
                    </div>                               
                  </div>
                </div>
              </td>
              <td>
                <div className="font-bold text-base">{sample.title}</div>
              </td>
              <td>
                {sample.status == "0" ? <Badge className='!text-sm !py-1.5 !px-3.5' color="orange">pending</Badge> : <Badge className='!text-sm !py-1.5 !px-3.5' color="green">publish</Badge>}
              </td>
              <td>
                { new Date(sample.created_at).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                }
              </td>
              <td>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Button variant="soft" className='!cursor-pointer'>
                    Options
                  </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Item shortcut="⌘ E">Edit</DropdownMenu.Item>
                  <DropdownMenu.Item shortcut="⌘ D">Show</DropdownMenu.Item>
                  <DropdownMenu.Separator />
                  <DropdownMenu.Item onClick={() => deleteSample(sample , index)} shortcut="⌘ ⌫" color="red">
                    Delete
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
              </td>
            </tr>
          ) )}
          {loader && items.map((item , index) => 
            <tr className='border-b-gray-100' key={index}>
              <td><Skeleton className='w-full' inline height="4rem"/></td> 
              <td><Skeleton className='w-full' inline height="4rem"/></td> 
              <td><Skeleton className='w-full' inline height="4rem"/></td> 
              <td><Skeleton className='w-full' inline height="4rem"/></td> 
              <td><Skeleton className='w-full' inline height="4rem"/></td>
               <td><Skeleton className='w-full' inline height="4rem"/></td>
            </tr>
          )}
        </tbody>
      </table>

      {!loader && lastPage > 1 && (
        <div className="join mt-10">
        <button onClick={() => paginateHandler('prev')} className="bg-gray-100 join-item btn-md">prev</button>
          {links && links.map((link , index) => (
            <button onClick={() => paginateHandler('setPage' , link.page)} className={`join-item btn-md ${currentPage == link.page && 'bg-slate-700 border-[1px] hover:scale-none h-4 hover:bg-slate-700 border-slate-800 !text-light-active'}`} key={index}>{link.label}</button>
          ))}
          <button onClick={() => paginateHandler('next')} className="bg-gray-100 join-item btn-md">next</button>
      </div>
      )}
    </div>
  )
}

export default AllSamplesPage