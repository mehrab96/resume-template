import React from 'react';

type Props = {
    color : string,
    coloropacity : string,
    
}

const PingComponent = ({color , coloropacity} : Props) => {
  return (
    <div className="relative items-center justify-center mt-[.15rem] flex h-3 w-3">
        <span className={`inline-flex absolute top-0 right-0 h-full w-full rounded-full ${coloropacity} opacity-75`}></span>
        <span className={`relative animate-pulse inline-flex rounded-full h-1.5 w-1.5 ${color}`}></span>
    </div>
  )
}

export default PingComponent