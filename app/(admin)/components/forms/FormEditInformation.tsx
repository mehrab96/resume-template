"use client";
import { Button, Grid, TextFieldInput, Text } from '@radix-ui/themes'
import React, { useState  } from 'react';
import {zodResolver} from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form"
import { useRouter } from 'next/navigation';
import { InformationSchema } from '../../validations/validationSchemas';
import { z } from 'zod';



type InformationForm = z.infer<typeof InformationSchema>;


const FormNewIssue = () => {
    const [error , setError] = useState('');
    const [isSubmitting , setSubmitting] = useState(false);
    
    const router = useRouter();

    

    const {
        register,
        handleSubmit,
        formState : {errors}
      } = useForm<InformationForm>({
        resolver: zodResolver(InformationSchema)
      });

    const submitIssue = handleSubmit(async (data) => {
            console.log('test');
            
    });

  return (
    <div>
        <div className="text-sm breadcrumbs">
          <ul>
            <li><a>Admin</a></li> 
            <li><a>Edit Your Information</a></li> 
          </ul>
        </div>

        <h2 className='my-8 font-bold'>Edit Information</h2>

        <form onSubmit={submitIssue} className='grid w-full gap-2 grid-cols-1'>
          <Grid columns="2" gap="4">
            <Grid>
              <TextFieldInput size="3" placeholder='name' {...register('name')}></TextFieldInput>
              <Text color="red" className='h-7' size="2" as="p">{errors.name?.message}</Text>
            </Grid>
            <Grid>
              <TextFieldInput size="3" placeholder='fullname' {...register('fullname')}></TextFieldInput>
              <Text className='h-7' color="red" size="2" as="p">{errors.fullname?.message}</Text>
            </Grid>
          </Grid>
        
          <Grid columns="2" gap="4">
            <Grid>
              <TextFieldInput size="3" placeholder='phone' {...register('phone')}></TextFieldInput>
              <Text className='h-7' color="red" size="2" as="p">{errors.phone?.message}</Text>
            </Grid>
            <Grid>
              <TextFieldInput size="3" placeholder='email' {...register('email')}></TextFieldInput>
              <Text className='h-7' color="red" size="2" as="p">{errors.email?.message}</Text>
            </Grid>
          </Grid>

          <Grid columns="2" gap="4">
            <Grid>
              <TextFieldInput size="3" placeholder='telegramID' {...register('telegramID')}></TextFieldInput>
              <Text className='h-7' color="red" size="2" as="p">{errors.telegramID?.message}</Text>
            </Grid>
            <Grid>
              <TextFieldInput size="3" placeholder='GithubID' {...register('GithubID')}></TextFieldInput>
              <Text className='h-7' color="red" size="2" as="p">{errors.GithubID?.message}</Text>
            </Grid>
          </Grid>
          <Grid columns="2" gap="4">
            <Grid>
            <TextFieldInput size="3" placeholder='InstagramID' {...register('InstagramID')}></TextFieldInput>
              <Text className='h-7' color="red" size="2" as="p">{errors.InstagramID?.message}</Text>
            </Grid>
            <Grid>
            <TextFieldInput size="3" placeholder='WhatsApp' {...register('WhatsApp')}></TextFieldInput>
              <Text className='h-7' color="red" size="2" as="p">{errors.WhatsApp?.message}</Text>
            </Grid>  
          </Grid>
            
            
            <Button size="3" className='w-52 !mt-4 !btn !btn-neutral'>Update Information</Button>
            
           
        </form>
    </div>
  )
}

export default FormNewIssue