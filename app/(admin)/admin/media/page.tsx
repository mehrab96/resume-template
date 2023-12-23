"use client";
import React from 'react'
import useStoreGallery from '../../store/gallery';
import UploadForm from '../../components/gallery/Upload';
import ShowAllGalleries from '../../components/gallery/ShowAllGalleries';
import { Skeleton } from '../../components/packages/packagesUi';


const MediaPage = () => {

 const {
  loader,
 } = useStoreGallery();
  

  return (
    <div>
       {loader ? (
        <Skeleton height="12rem"/>
      ) : (
        <UploadForm/>
      )}
        <div className='mt-8'>
          <ShowAllGalleries multiple={false}/>
        </div>
    </div>
  )
}

export default MediaPage