"use client"
import { Badge, Button , DropdownMenu } from '@radix-ui/themes';
import React, { useEffect ,useState} from 'react';
import useStoreSample from '@/app/(admin)/store/sample';
import { Skeleton } from '@/app/(admin)/components/packages/packagesUi';
import Link from 'next/link';

const AllSamplesPage = () => {
  const items: number[] = [1,2,3,4,5,6];
  const [checkboxValues, setCheckboxValues]= useState<any>([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);


  const { 
    samples,
    getAllSamples,
    deleteSample,
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
    
    return () => clearTimeout(delaySearch);
  }, [searchTerm]);

  return (
    <div className="!bg-white p-3 rounded-3xl shadow-[0_0_30px_rgba(0,0,0,0.03)]">
      <div className='grid py-3 items-center grid-cols-[auto_auto] justify-between'>
        <div className='grid py-3 items-center grid-cols-[auto_auto] gap-2 justify-start'>
          <span className='font-normal pl-2'>Search:</span>
          <input type="text" value={searchTerm!} onChange={(value) => searchHandle(value.target.value)} placeholder="Type here..." className="input input-sm input-bordered w-[18rem] !h-10 max-w-xs" />
        </div>

        {checkboxValues.length >= 1 && <button onClick={()=>deleteSelectSamples(checkboxValues)} className="btn btn-sm !h-10 btn-outline btn-error hover:!text-light">Remove All</button>}
      </div>
      <table className="table w-full">
        {/* head */}
        <thead>
          <tr className='text-[.96rem] text-gray-800 border-b-gray-200 !h-14 font-bold'>
            <th className='w-4'>#</th>
            <th className='flex mt-1'>
              <label className="checkbox ">
                  <input
                  className='checkbox'
                  onChange={selectAll}
                  type="checkbox"/>
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
                <span className='font-semibold'>{index + 1}</span>
              </td>
              <td className='h-28 grid content-center items-center'>
                <label className="checkbox">
                    <input
                    className='checkbox'
                     value={sample.id} 
                     id={sample.id}
                     checked={checkboxValues.includes(sample.id)}
                     onChange={() => handleCheckboxChange(sample.id)}
                    type="checkbox"/>
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
                <Link href={`edit/${sample.id}`}>
                <DropdownMenu.Item className='!cursor-pointer'>
                  Edit
                  </DropdownMenu.Item>
                </Link>              
                  <DropdownMenu.Item className='!cursor-pointer'>Show</DropdownMenu.Item>
                  <DropdownMenu.Separator />
                  <DropdownMenu.Item className='!cursor-pointer' onClick={() => deleteSample(sample , index)} color="red">
                    Delete
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
              </td>
            </tr>
          ) )}
          {loader && items.map((item , index) => 
            <tr className='border-b-gray-100' key={index}>
              <td><Skeleton className='w-full' width="1rem" height="1rem"/></td> 
              <td><Skeleton className='w-full' width="2rem" height="2rem"/></td> 
              <td><Skeleton className='w-full' width="5rem" inline height="4rem"/></td> 
              <td><Skeleton className='w-full' width="20rem" inline height="2rem"/></td> 
              <td><Skeleton className='w-full' width="8rem" inline height="2rem"/></td> 
              <td><Skeleton className='w-full' width="10rem" inline height="2rem"/></td>
               <td><Skeleton className='w-full' width="7rem" inline height="3rem"/></td>
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

function debounce(arg0: (query: any) => void, arg1: number) {
  throw new Error('Function not implemented.');
}
