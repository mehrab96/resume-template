"use client";
import { Grid } from '@radix-ui/themes'
import React, { useEffect } from 'react'
import useStoreGallery from '../../store/gallery';
import { Skeleton } from '../packages/packagesUi';

interface Props {
    multiple : boolean
}

const ShowAllGalleries = ({multiple} : Props) => {

    const items: number[] = [1,2,3,4,5,6,7,8];
    const {
        currentPage,
        lastPage,
        selectedGalleries,
        setSelectedGalleries,
        loader,
        links,
        galleries,
        getAllGalleries,
        deleteGallery,
    } = useStoreGallery();

    const paginateHandler = (type: string , page : number = 1) => {
        switch(type){
            case 'prev' : 
            if(currentPage > 1) getAllGalleries(parseInt(currentPage.toString()) - 1)
            break;
            case 'next' : 
            if(currentPage < lastPage) getAllGalleries(parseInt(currentPage.toString()) + 1)
            break;
            case 'setPage' : 
            if(currentPage <= lastPage && currentPage >= 1) getAllGalleries(page)
            break;
        }
    }
    

    
    useEffect(()=> {
        getAllGalleries(1);
    } , []);

  return (
    <div>
        <Grid gap="4" columns="4">
        {!loader && galleries.map((file , index) => (
            <div onClick={() => setSelectedGalleries(file , multiple)} key={index} 
            className={`card bg-base-100 border-2
             border-transparent shadow-xl 
             ${selectedGalleries.some(g => g.id == file.id) ? '!border-teal-600' : '' }`}>
            <figure className='h-[12rem]'>
                {file.url && <img className='w-full h-full object-cover' src={file.url} alt={file.name} />}
            </figure>
            <div className="px-4 py-3 w-full grid gap-1 grid-cols-1">
            <div className="font-bold w-full truncate !text-[.85rem]">{file.name}</div>                    
            <div className="font-bold truncate !text-[.85rem]">format: <span>{file.format}</span></div>                    
            <div className="font-bold truncate !text-[.85rem]">size: <span className='text-xs'>{file.size}</span></div>                    
            </div>
            <div className='grid justify-center mb-4'>
            <button className='bg-red-50 font-semibold text-sm text-red-700 rounded-2xl py-2 px-8' onClick={() => deleteGallery(file , index)}>Remove Media</button>
            </div>
        </div>
        ))}
        
        { loader  && items.map((item, index) => <Skeleton key={index} height="20rem"/>)}
        </Grid>
        <Grid>
            
        <div className="join mt-10">
        <button onClick={() => paginateHandler('prev')} className="join-item btn">prev</button>
            {links.map((link , index) => (
            <button onClick={() => paginateHandler('setPage' , link.page)} className={`join-item btn ${currentPage == link.page && 'bg-slate-700 border-[1px] hover:scale-none hover:bg-slate-700 border-slate-800 !text-light-active'}`} key={index}>{link.label}</button>
            ))}
            <button onClick={() => paginateHandler('next')} className="join-item btn">next</button>
        </div>          
        </Grid>
    </div>
  )
}

export default ShowAllGalleries
