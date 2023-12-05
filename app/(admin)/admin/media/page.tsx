"use client";
import React from 'react'
import useStoreGallery from '../../store/gallery';
import UploadForm from '../../components/gallery/Upload';
import ShowAllGalleries from '../../components/gallery/ShowAllGalleries';

const MediaPage = () => {

 const {
  loader,
 } = useStoreGallery();
  

  return (
    <div>
       {loader ? (
        <p>Loading...</p>
      ) : (
        <UploadForm/>
      )}
        <div className='mt-8'>
          <ShowAllGalleries/>
        </div>
    </div>
  )
}

export default MediaPage