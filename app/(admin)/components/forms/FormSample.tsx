"use client";
import { Button, Grid, TextFieldInput, Text, Select } from '@radix-ui/themes'
import React, { useState  } from 'react';
import {zodResolver} from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form"
import { WorkSamplesSchema } from '../../validations/validationSchemas';
import { z } from 'zod';
import { MdCloudUpload } from 'react-icons/md';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

type WorkSampleForm = z.infer<typeof WorkSamplesSchema>;





const FormSample = () => {

        const [error , setError] = useState('');
        const [isSubmitting , setSubmitting] = useState(false);
        const [body , setBody] = useState('');
        const [status , setStatus] = useState('');
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


        const {
            register,
            handleSubmit,
            formState : {errors}
          } = useForm<WorkSampleForm>({
            resolver: zodResolver(WorkSamplesSchema)
          });
    

        const getEditorHandler = (editor: any) => {
            setBody(editor.getData());
        }

        const submitSample = handleSubmit(async (data) => {
            //
        });
        
    
        

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
                        <Select.Root size="3" onValueChange={(value) => setStatus(value)}  defaultValue="0">
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
                        config={editorConfiguration}
                        editor={ClassicEditor}                
                       />                        
                    </Grid>
                </Grid>
                <Grid>
                    <aside className='w-[26rem]'>
                        <div className="h-52 border-[1.5px] grid justify-center border-dashed text-center content-center items-center rounded-md dark:border-gray-300 border-gray-300">                    
                            <div className="bg-gray-100 p-4 w-10 h-10 m-auto rounded-md grid items-center content-center justify-center">
                               <MdCloudUpload className="flex text-2xl" />
                            </div>
                            <p className="pt-3 font-bold text-sm opacity-90 dark:text-text-light">Click and choose your photo</p>
                            <p className="pt-1 font-medium text-xs opacity-70 dark:text-text-light">You can upload new image whenever modal has opened</p>
                        </div>
                    </aside>
                </Grid>
            </Grid>
            
            
            <Button size="3" className='w-52 !mt-4 !cursor-pointer !bg-slate-800'>Store Sample</Button>
            
           
        </form>
    </div>
  )
}


export default FormSample