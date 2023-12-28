import { Skeleton } from '@/app/(admin)/components/packages/packagesUi'
import React from 'react'

const loading = () => {
  return (
  <div>
    <Skeleton width="12rem" height="2rem" />
    <Skeleton className='mt-8' width="10rem" height="2rem" />
    <div className='grid mt-4 grid-cols-[1fr_auto] gap-2'>
    <div className='grid grid-cols-1 gap-2'>
      <Skeleton width="40rem" height="3rem" />
      <Skeleton width="40rem" height="3rem" />
      <Skeleton width="40rem" height="3rem" />
      <Skeleton width="40rem" height="15rem" />
    </div>
    <div>
      <Skeleton width="26rem" height="16rem" />
    </div>
  </div>
  </div>
  )
}

export default loading