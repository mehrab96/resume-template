"use client";
import { Button, Grid, TextFieldInput, Text, Select } from '@radix-ui/themes'
import React, { useEffect, useRef, useState  } from 'react';
import {zodResolver} from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form"
import { WorkSamplesSchema } from '../../validations/validationSchemas';
import { z } from 'zod';
import { MdCloudUpload } from 'react-icons/md';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import toast from 'react-hot-toast';
import Spinner from './Spinner';
import ModalGallery from '../gallery/ModalGallery';
import useStoreGallery from '../../store/gallery';
import useStoreSample from '../../store/sample';


type WorkSampleForm = z.infer<typeof WorkSamplesSchema>;

interface Props {
    edit: boolean | null
}

const FormSample = ({edit} : Props) => {

    const [isSubmitting , setSubmitting] = useState(false);
    const [sampleId, setSampleId] = useState("");
    const [body , setBody] = useState('');
    const [editorInstance , setEditorInstance]= useState<any>(undefined);
    const [status , setStatus] = useState("0");
    const editorConfiguration = {
        toolbar: [
            'heading',
            '|',
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            '|',
            'outdent',
            'indent',
            '|',
            'imageUpload',
            'blockQuote',
            'insertTable',
            'mediaEmbed',
            'undo',
            'redo'
        ]
    };

    const isMountedRef = useRef(true);
    
    const {
        setModal,
        selectedGalleries,
        setEmptySelectedGalleries,
        setSelectGallery
    } = useStoreGallery();

    const {
        sample,
        setEmptySample
    } = useStoreSample();

    const {
        setValue,
        register,
        handleSubmit,
        reset,
        formState : {errors}
        } = useForm<WorkSampleForm>({
        resolver: zodResolver(WorkSamplesSchema)
        });


    const getEditorHandler = (editor: any) => {
        setBody(editor.getData());
        setEditorInstance(editor);
    }

    const submitSample = handleSubmit(async (data) => {
        setSubmitting(true);
        if(edit && sampleId){
            const response = await axios.put(`/api/work-sample/${sampleId}` , {
                title : data.title,
                slug : data.slug,
                status : status,
                body : body,
                image : selectedGalleries[0]?.url ? selectedGalleries[0]?.url : '',
            });
            if(response.status == 200){
                toast.success('The sample has updated');
                console.log(response.data);
            }
        }else{
            const response = await axios.post('/api/work-sample' , {
                title : data.title,
                slug : data.slug,
                status : status,
                body : body,
                image : selectedGalleries[0]?.url ? selectedGalleries[0]?.url : '',
            });
            if(response.status == 201){
                toast.success('Successfully created!');
                console.log(response.data);
                resetForm();
            }
        }
        
        setSubmitting(false);
    });

   


    useEffect(() => {  
        isMountedRef.current = true;
        if(sample){
            setSampleId(sample.id )
            setValue('slug' ,sample.slug )
            setValue('title' ,sample.title )
            setSelectGallery([{
                url : sample.image,
                id: 0,
                format: '',
                name: '',
                path: '',
                size: 0,
                created_at : new Date(Date.now())
            }])
            setBody(sample.body);
            setStatus(sample.status ? "1" : "0" );
            if (editorInstance) {
                editorInstance.setData(sample.body);
            }
        }

        return () => {
            if (isMountedRef.current && !sample) {
                setEmptySample();
                setEmptySelectedGalleries()
              }
              isMountedRef.current = false;
        };
    }, [sample])

    

    const resetForm = () => {
        reset();
        setBody('')
        setStatus("0")
        setEmptySelectedGalleries()
        if(editorInstance){
            editorInstance.setData('');
        }
    }

 

  return (
    <div>
        <div className="text-sm breadcrumbs">
          <ul>
            <li><a>Admin</a></li> 
            <li><a>Add Your Work Sample</a></li> 
          </ul>
        </div>

        <h2 className='my-8 font-bold'>Add Work Sample</h2>

        <form onSubmit={submitSample} className='grid w-full gap-2 grid-cols-1'>
            <Grid columns="1fr auto" align="start" gap="4">                
                <Grid columns="1" gap="3" align="start">
                    <Grid columns="1" gap="3">
                        <TextFieldInput size="3" className='placeholder:text-sm' placeholder='type your title' {...register('title')}></TextFieldInput>
                        {
                            errors.title &&
                            <Text color="red" className='h-7' size="2" as="p">{errors.title?.message}</Text>
                        }
                    </Grid>
                    <Grid>
                        <TextFieldInput size="3" className='placeholder:text-sm' placeholder='type your slug' {...register('slug')}></TextFieldInput>
                        {
                             errors.slug &&
                            <Text className='h-7' color="red" size="2" as="p">{errors.slug?.message}</Text>
                        }
                    </Grid>
                    <Grid>
                        <Select.Root size="3" onValueChange={(value) => setStatus(value)} value={status}  defaultValue={status}>
                        <Select.Trigger />
                        <Select.Content position="popper">
                            <Select.Item value="0">pending</Select.Item>
                            <Select.Item value="1">publish</Select.Item>
                        </Select.Content>
                        </Select.Root>
                    </Grid>
                    <Grid>
                    <CKEditor    
                        onChange={ (event, editor ) => getEditorHandler(editor)}   
                        data={body}  
                        config={editorConfiguration}
                        editor={ClassicEditor}                
                       />                        
                    </Grid>
                </Grid>
                <Grid>
                    <aside className='w-[26rem]'>
                        <div onClick={() => setModal()} className="h-52 border-[1.5px] grid justify-center border-dashed text-center content-center items-center rounded-md dark:border-gray-300 border-gray-300">                    
                            {!selectedGalleries.length && (
                                <div>
                                    <div className="bg-gray-100 p-4 w-10 h-10 m-auto rounded-md grid items-center content-center justify-center">
                                    <MdCloudUpload className="flex text-2xl" />
                                    </div>
                                    <p className="pt-3 font-bold text-sm opacity-90 dark:text-text-light">Click and choose your photo</p>
                                    <p className="pt-1 font-medium text-xs opacity-70 dark:text-text-light">You can upload new image whenever modal has opened</p>
                                </div>
                            )}
                            {selectedGalleries.length >= 1 && (
                                <figure className='max-h-40 w-auto'>
                                    <img className='w-auto object-contain max-h-40' src={selectedGalleries[0]?.url} alt="" />
                                </figure>
                            )}
                        </div>
                    </aside>
                </Grid>
            </Grid> 
            {edit && <Button  size="3" className='!mt-4 w-44 !cursor-pointer !text-light !bg-slate-800' disabled={isSubmitting}>{isSubmitting ?  (
                <div className='flex items-center gap-3'><span className='flex text-base items-center'>processing</span><Spinner /></div>
            ) : 'Upload Sample'}</Button>}
            {!edit && <Button  size="3" className='!mt-4 w-44 !cursor-pointer !text-light !bg-slate-800' disabled={isSubmitting}>{isSubmitting ?  (
                <div className='flex items-center gap-3'><span className='flex text-base items-center'>processing</span><Spinner /></div>
            ) : 'Store Sample'}</Button>}
            
        </form>

        <ModalGallery multiple={false} />
    </div>
  )
}


export default FormSample