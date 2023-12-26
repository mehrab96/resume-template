"use client";
import FormSample from '@/app/(admin)/components/forms/FormSample';
import useStoreSample from '@/app/(admin)/store/sample'
import React, { useEffect } from 'react'

type Props = {
    params : {
        id : string
    }
}

const EditSamplePage = ({ params }: Props) => {

    const { 
        getSample,
    } = useStoreSample();

    useEffect(()=> {
        
        getSample(params.id);
    } , []);

      
  return (
    <div>
        <FormSample edit={true} />
    </div>
  )
}

export default EditSamplePage