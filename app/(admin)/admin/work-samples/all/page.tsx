"use client"
import { Button , DropdownMenu, TextField } from '@radix-ui/themes';
import React, { useEffect ,useState} from 'react';
import useStoreSample from '@/app/(admin)/store/sample';
import { Skeleton } from '@/app/(admin)/components/packages/packagesUi';
import Link from 'next/link';
import PingComponent from '@/app/(admin)/components/part/PingComponent';
import { MdDeleteOutline, MdFilter, MdFilter1, MdFilterAlt, MdFilterListAlt, MdGroupRemove, MdOutlineFilter, MdOutlineFilterList, MdOutlineSearch } from 'react-icons/md';

const AllSamplesPage = () => {
  const items: number[] = [1,2,3,4,5,6];
  const [checkboxValues, setCheckboxValues]= useState<any>([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [columns, setColumns] = useState<string>(`grid-cols-[4rem_4rem_8rem_1fr_10rem_1fr_7rem]`);

  const { 
    samples,
    getAllSamples,
    deleteSample,
    setEmptySamples,
    searchTerm,
    setSearchTerm,
    deleteSelectSamples,
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

  const handleCheckboxChange = (id:any) => {
    const isChecked = checkboxValues.includes(id);
    if (isChecked) {
      setCheckboxValues(checkboxValues.filter((value:number) => value !== id));
    } else {
      setCheckboxValues([...checkboxValues, id]);
    }
  };

  const selectAll = () => {
    if (selectAllChecked) {
      setCheckboxValues([]);
    } else {
      setCheckboxValues(samples.map((sample) => sample.id));
    }
    setSelectAllChecked(!selectAllChecked);
  };

  const searchHandle = (search: string) => {
    setSearchTerm(search)
  }

 

  useEffect(() => {
   
    const delaySearch = setTimeout(() => {    
      getAllSamples(1);
    }, 500);
    
    return () => {
      clearTimeout(delaySearch);
      setEmptySamples();
    };
  }, [searchTerm]);

  return (
    <div className="!bg-white p-3 rounded-3xl shadow-[0_0_30px_rgba(0,0,0,0.03)]">
      <div className='grid py-3 items-center grid-cols-[auto_auto] justify-between'>
        <div className='grid py-3 items-center grid-cols-[auto_auto] gap-2 justify-start'>
          <span className='font-normal pl-2'>Search:</span>
          <TextField.Root color='indigo' className='w-72' radius='large'>
            <TextField.Slot>
              <MdOutlineSearch height="16" width="16" />
            </TextField.Slot>
            <TextField.Input variant="soft" value={searchTerm!} onChange={(value) => searchHandle(value.target.value)} className="w-[18rem] !h-10 !focus:outline-none !border-0 !ring-0 !outline-0" placeholder="Search data…" />
          </TextField.Root>
        </div>

        <div className='grid grid-cols-[auto_auto] gap-x-2 justify-start items-center'>
          {checkboxValues.length >= 1 && <Button className='!h-10 !cursor-pointer' onClick={()=>deleteSelectSamples(checkboxValues)} color="crimson" variant="soft">
            <span>Remove All</span>
            <MdDeleteOutline className='text-lg'/>
          </Button>}
          
 
          <DropdownMenu.Root>
            <DropdownMenu.Trigger color="indigo" className='!h-10 !px-4'>
              <Button variant="soft" className='!cursor-pointer'>
                Filter
                <MdOutlineFilterList className='text-lg'/>
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item color="indigo" className='!cursor-pointer w-28' >
              Edit
              </DropdownMenu.Item>
              <DropdownMenu.Item color="indigo" className='!cursor-pointer'>Show</DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>

        

      </div>
      <div className="w-full mt-4">
        {/* head */}
        <div className='grid px-4 grid-cols-1'>
          <div className={`text-[.89rem]
          grid ${columns}
           text-gray-800 border-b-none !h-14 font-bold`}>
            <div className='pl-4'>#</div>
            <div className=''>
              <label className="checkbox ">
                  <input
                  className='checkbox'
                  onChange={selectAll}
                  type="checkbox"/>
              </label>
            </div>
            <div>Image</div>
            <div>Title</div>
            <div>Status</div>
            <div>Publish Time</div>
            <div>Action</div>
          </div>
        </div>
        <div className='grid grid-cols-1 gap-6'>    
          {!loader && samples.map((sample , index) => (
            <div className={`!border-gray-100 h-[5.5rem] px-4 grid items-center ${columns} border-[1px] rounded-3xl`} key={index}>
              <div className='pl-4'>
                <span className='font-semibold'>{index + 1}</span>
              </div>
              <div className='grid content-center items-center'>
                <label className="checkbox flex">
                    <input
                    className='checkbox'
                     value={sample.id} 
                     id={sample.id}
                     checked={checkboxValues.includes(sample.id)}
                     onChange={() => handleCheckboxChange(sample.id)}
                    type="checkbox"/>
                </label>
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask !rounded-lg w-16 h-16">
                      <img src={sample.image ? sample.image : '/images/imagenotfound.webp'} alt={sample?.title}/>
                    </div>                               
                  </div>
                </div>
              </div>
              <div>
                <div className="font-semibold text-sm">{sample.title}</div>
              </div>
              <div className='relative'>
                {sample.status == "0" ? <div className='grid grid-cols-[auto_auto] items-center justify-start gap-2'>
                  <PingComponent color="bg-orange-500" coloropacity="bg-orange-200"/>
                  <span className='text-orange-500 font-semibold text-sm'>pending</span>
                </div> : <div className='grid grid-cols-[auto_auto] items-center justify-start gap-2'>
                  <PingComponent color="bg-green-500" coloropacity="bg-green-200"/>
                  <span className='text-green-500 font-semibold text-sm'>pending</span>
                </div>}
              </div>
              <div className='font-semibold text-sm'>
                { new Date(sample.created_at).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                }
              </div>
              <div>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Button variant="soft" color="indigo" className='!cursor-pointer !px-4 !py-1 !text-xs'>
                    Options
                  </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                <Link href={`edit/${sample.id}`}>
                <DropdownMenu.Item color="indigo" className='!cursor-pointer'>
                  Edit
                  </DropdownMenu.Item>
                </Link>              
                  <DropdownMenu.Item color="indigo" className='!cursor-pointer'>Show</DropdownMenu.Item>
                  <DropdownMenu.Separator />
                  <DropdownMenu.Item  className='!cursor-pointer' onClick={() => deleteSample(sample , index)} color="red">
                    Delete
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
              </div>
            </div>
          ) )}
          {loader && items.map((item , index) => 
            <div className={`grid h-24 px-4 ${columns}
             border-gray-100 border-[1px] items-center rounded-3xl`} key={index}>
              <div className='pl-3 mt-1'><Skeleton className='w-full' width=".8rem"  height=".8rem"/></div> 
              <div><Skeleton className='w-full' width="1.5rem" inline  height="1.5rem"/></div> 
              <div><Skeleton className='w-full' width="4rem" inline height="4rem"/></div> 
              <div><Skeleton className='w-full' width="12rem" inline height="2rem"/></div> 
              <div><Skeleton className='w-full' width="7rem" inline height="2rem"/></div> 
              <div><Skeleton className='w-full' width="10rem" inline height="2rem"/></div>
               <div><Skeleton className='w-full' width="6rem" inline height="2rem"/></div>
            </div>
          )}
        </div>
      </div>

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

function debounce(arg0: (query: any) => void, arg1: number) {
  throw new Error('Function not implemented.');
}
