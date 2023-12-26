import React, { useEffect, useState } from 'react';
import useStoreGallery from '../../store/gallery';
import ShowAllGalleries from './ShowAllGalleries';
import UploadForm from './Upload';
import { MdClose } from 'react-icons/md';

interface Props {
    multiple : boolean
}

const ModalGallery = ({multiple} : Props) => {

    const [currentTab , setCurrentTab] = useState(0);

    const {
        getAllGalleries,
    } = useStoreGallery();


    useEffect(()=> {
        getAllGalleries(1);
    } , []);

  return (
    <div>
        <dialog id="my_modal_2" className="modal">
        <div className="modal-box bg-white !h-[80vh] !max-h-[80vh] !w-[90vw] !max-w-[90vw]">
        <div className='grid grid-cols-[auto_auto] items-center justify-between'>
            <div role="tablist" className="tabs shadow-lg !bg-slate-100 py-2 px-2 tabs-boxed">
                <a onClick={() => setCurrentTab(0)} 
                role="tab"
                className={`tab ${currentTab == 0 && 'tabActive'}`}>Show All Media</a>
                <a onClick={() => setCurrentTab(1)} 
                role="tab"
                className={`tab ${currentTab == 1 && 'tabActive'}`}>Upload new Media</a>
            </div>
            <form method="dialog" className="flex items-center">
                <button className='border-none focus:outline-0'><MdClose className="text-3xl"/></button>
            </form>
        </div>
        <div className="overflow-y-scroll mt-3 !h-[66vh]">
            {currentTab == 0 ? <ShowAllGalleries select={true} multiple={multiple}/> : <UploadForm/>}
        </div>

        </div>
        <form method="dialog" className="modal-backdrop">
            <button>close</button>
        </form>
        </dialog>
    </div>
  )
}

export default ModalGallery