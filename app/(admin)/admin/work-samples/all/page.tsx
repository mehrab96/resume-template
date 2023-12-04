"use client"
import { Badge, ContextMenu , Text } from '@radix-ui/themes';
import axios from 'axios';
import React, { useEffect, useState } from 'react'


interface Sample {
  id: string;
  title: string;
  slug: string;
  status: string;
  body: string;
  created_at: Date;
}


const AllSamplesPage = () => {

  const [samples , setSamples] = useState<Sample[]>([]);
  const [links , setLinks] = useState<PaginateLinks[]>([]);
  const [currentPage , setCurrentPage] = useState<any>([]);
  const [lastPage , setLastPage] = useState<string[]>([]);

  const getAllSamples = async (page: number) => {
    const response = await axios.get(`/api/work-sample?page=${page}`);
    if(response.status == 200){
      setSamples(response.data.data);
      setLinks(response.data.links);
      setCurrentPage(response.data.current_page);
      setLastPage(response.data.last_page);
    }
  }

  const paginateHandler = (type: string , page = null) => {
    switch(type){
      case 'prev' : 
      if(currentPage > 1) getAllSamples(currentPage - 1)
      break;
      case 'next' : 
      if(currentPage < lastPage) getAllSamples(currentPage + 1)
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
    <div className="!bg-white p-6 rounded-3xl shadow-[0_0_30px_rgba(0,0,0,0.06)]">
      <table className="table">
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
          {samples.map((sample , index) => (
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
                      <img src="/images/imagenotfound.webp" alt={sample?.title}/>
                    </div>                               
                  </div>
                </div>
              </td>
              <td>
                <div className="font-bold text-base">{sample.title}</div>
              </td>
              <td>
                {sample.status == 0 ? <Badge className='!text-sm' color="orange">pending</Badge> : <Badge className='!text-sm' color="green">publish</Badge>}
              </td>
              <td>
                { new Date(sample.created_at).toUTCString()}
              </td>
              <td>
              <ContextMenu.Root>
                <ContextMenu.Trigger>
                <Text className='text-sm font-semibold'>Details</Text>
                </ContextMenu.Trigger>
                <ContextMenu.Content>
                  <ContextMenu.Item shortcut="⌘ E">Edit</ContextMenu.Item>
                  <ContextMenu.Item shortcut="⌘ D">Show</ContextMenu.Item>
                  <ContextMenu.Separator />
                  <ContextMenu.Item shortcut="⌘ N">Delete</ContextMenu.Item>
                </ContextMenu.Content>
              </ContextMenu.Root>

              </td>
            </tr>
          ) )}
        </tbody>
      </table>

      <div className="join mt-10">
        <button onClick={() => paginateHandler('prev')} className="bg-gray-100 join-item btn-md">prev</button>
          {links.map((link , index) => (
            <button onClick={() => paginateHandler('setPage' , link.label)} className={`join-item btn-md ${currentPage == link.label && 'bg-slate-700 border-[1px] hover:scale-none bg-gray-100 h-4 hover:bg-slate-700 border-slate-800 !text-light-active'}`} key={index}>{link.label}</button>
          ))}
          <button onClick={() => paginateHandler('next')} className="bg-gray-100 join-item btn-md">next</button>
      </div>
    </div>
  )
}

export default AllSamplesPage