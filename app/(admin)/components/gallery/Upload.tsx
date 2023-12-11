import Dropzone from 'dropzone';
import "dropzone/dist/dropzone.css"
import React, { useEffect } from 'react'
import useStoreGallery from '../../store/gallery';

const UploadForm = () => {


    const {
        galleries,
        setGalleries,
       } = useStoreGallery();

    useEffect(()=> {        
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
            const jsonResponse = JSON.parse(res.xhr?.response);
            const currentGalleries = Array.isArray(galleries) ? galleries : [];
            currentGalleries.unshift(jsonResponse);
            setGalleries(currentGalleries);
        
          }
        });
    
        return () => {
          myGreatDropzone.destroy();
        };
      } , []);
  return (
    <div>
        <form action="/target" className="dropzone min-h-[12rem] !border-dashed" id="myGreatDropzone">
        </form>
    </div>
  )
}

export default UploadForm