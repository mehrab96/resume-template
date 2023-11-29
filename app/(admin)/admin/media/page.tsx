"use client"
import axios from 'axios';
import React, {useEffect, useState} from 'react'
import Dropzone from 'dropzone';
import "dropzone/dist/dropzone.css"
import { Grid } from '@radix-ui/themes';

interface File {
  id: string;
  name: string;
  url: string;
  format: string;
  size: number;
}


const MediaPage = () => {

  const [files , setFiles] = useState<File[]>([]);
  const [links , setLinks] = useState<PaginateLinks[]>([]);
  const [currentPage , setCurrentPage] = useState<any>([]);
  const [lastPage , setLastPage] = useState<string[]>([]);
  

  const getAllGalleries = async (page: number) => {
    const response = await axios.post('/api/upload/all',{
      page: page
    });
    if(response.status == 200){
      setFiles(response.data.data);
      setLinks(response.data.links);
      setCurrentPage(response.data.current_page);
      setLastPage(response.data.last_page);
    }
  }

  const paginateHandler = (type: string , page = null) => {
    switch(type){
      case 'prev' : 
      if(currentPage > 1) getAllGalleries(currentPage - 1)
      break;
      case 'next' : 
      if(currentPage < lastPage) getAllGalleries(currentPage + 1)
      break;
      case 'setPage' : 
      if(currentPage <= lastPage && currentPage >= 1) getAllGalleries(page)
      break;
    }
  }


  const removeMediaHandler = async (file: File , index: number) => {
    const res = await axios.post(`/api/upload/delete` , {id : file.id});
    if(res.status == 200){
      const newArray = [...files.slice(0, index), ...files.slice(index + 1)];
      setFiles(newArray);
    }
    
  }

  useEffect(()=> {
    getAllGalleries(1);
    const myGreatDropzone = new Dropzone("#myGreatDropzone", {
      paramName: "file",
      maxFilesize: 2,
      method: 'POST',
      dictDefaultMessage: `<div className='grid content-center justify-center grid-rows-[auto_auto] items-center'>
      <h1 className="!font-bold !text-2xl"><b>Drag and drop files here</b></h1>
      <p className="!font-medium !text-lg">Your can click and choose your files</p>
      </div>`,
      url: '/api/upload',
      headers: {},
      accept: function (file, done) {
        file.name === "justinbieber.jpg" ? done("Naha, you don't.") : done();
      },
      success: (res) => {
        setFiles(oldArray => [JSON.parse(res.xhr?.response) , ...oldArray])
      }
    });

    return () => {
      myGreatDropzone.destroy();
    };
  } , []);


  return (
    <div>
        <form action="/target" className="dropzone grid content-center justify-center grid-rows-[auto_auto] h-[12rem] !border-dashed" id="myGreatDropzone">
        </form>
      
        <Grid mt="8" gap="4" columns="4">
          {files.map((file , index) => (
            <div key={index} className="card bg-base-100 shadow-xl">
            <figure className='h-[12rem]'><img className='w-full h-full object-cover' src={file.url} alt={file.name} /></figure>
            <div className="px-4 py-3 w-full grid gap-1 grid-cols-1">
              <div className="font-bold w-full truncate !text-[.85rem]">{file.name}</div>                    
              <div className="font-bold truncate !text-[.85rem]">format: <span>{file.format}</span></div>                    
              <div className="font-bold truncate !text-[.85rem]">size: <span className='text-xs'>{file.size}</span></div>                    
            </div>
            <div className='grid justify-center mb-4'>
            <button className='bg-red-50 font-semibold text-sm text-red-700 rounded-2xl py-2 px-8' onClick={() => removeMediaHandler(file , index)}>Remove Media</button>
            </div>
          </div>
          ))}
        </Grid>
        <Grid>
          
        <div className="join mt-10">
        <button onClick={() => paginateHandler('prev')} className="join-item btn">prev</button>
          {links.map((link , index) => (
            <button onClick={() => paginateHandler('setPage' , link.label)} className={`join-item btn ${currentPage == link.label && 'bg-slate-700 border-[1px] hover:scale-none hover:bg-slate-700 border-slate-800 !text-light-active'}`} key={index}>{link.label}</button>
          ))}
          <button onClick={() => paginateHandler('next')} className="join-item btn">next</button>
        </div>
          
        </Grid>
    </div>
  )
}

export default MediaPage