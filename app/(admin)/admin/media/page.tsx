"use client"
import axios from 'axios';
import React, {useEffect, useState} from 'react'
import Dropzone from 'dropzone';
import "dropzone/dist/dropzone.css"
import { Grid } from '@radix-ui/themes';

interface File {
  name: string;
  url: string;
  format: string;
  size: number;
}


const MediaPage = () => {

  const [files , setFiles] = useState<File[]>([]);
  const [links , setLinks] = useState<PaginateLinks[]>([]);
  const [currentPage , setCurrentPage] = useState<string[]>([]);
  const [lastPage , setLastPage] = useState<string[]>([]);
  

  const getAllGalleries = async (page) => {
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

  const paginateHandler = (type , page = null) => {
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

  useEffect(()=> {
    getAllGalleries(1);
    const myGreatDropzone = new Dropzone("#myGreatDropzone", {
      paramName: "file",
      maxFilesize: 2,
      method: 'POST',
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
        <form action="/target" className="dropzone" id="myGreatDropzone"></form>

        <Grid mt="8" gap="4" columns="4">
          {files.map((file , index) => (
            <div key={index} className="card bg-base-100 shadow-xl">
            <figure className='h-[12rem]'><img className='w-full h-full object-cover' src={file.url} alt={file.name} /></figure>
            <div className="card-body">
              <span className="card-title collapse !text-sm">{file.name}</span>                    
              <span className="card-title collapse !text-sm">{file.format}</span>                    
              <span className="card-title collapse !text-sm">{file.size}</span>                    
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