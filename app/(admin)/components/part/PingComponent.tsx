import React from 'react';

type Props = {
    color : string
}

const PingComponent = ({color} : Props) => {
  return (
    <div className="relative items-center justify-center mt-[.1rem] flex h-3 w-3">
        <span className={`inline-flex absolute top-0 right-0 h-full w-full rounded-full bg-${color}-200 opacity-75`}></span>
        <span className={`relative animate-pulse inline-flex rounded-full h-1.5 w-1.5 bg-${color}-500`}></span>
    </div>
  )
}

export default PingComponent