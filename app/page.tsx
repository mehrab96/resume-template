"use client";
import Image from 'next/image'
import React, { useState } from 'react';

export default function Home() {

  const [skills , seSkills] = useState([
    {title : 'Laravel' , level : 0 , int : 0},
    {title : 'Vue js', level : 0, int : 0},
    {title : 'Nuxt js (3)' , level : 0, int : 0},
    {title : 'Git and Github', level : 0, int : 0},
  ]);

  return (
    <main>
      <div className="highlight">
            <span className="font-black text-xl text-primary-active relative">About me</span>
            <p className="font-light ltr:font-light text-base text-primary-active text-justify leading-9 opacity-90">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque quod sint deleniti excepturi delectus, sequi porro cumque officiis ea omnis reprehenderit nobis nihil minima architecto eligendi cupiditate exercitationem vitae? Officia!
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque quod sint deleniti excepturi delectus, sequi porro cumque officiis ea omnis reprehenderit nobis nihil minima architecto eligendi cupiditate exercitationem vitae? Officia!
            </p>
      </div>
      <div className="highlight mt-8">
        <span className="font-black text-xl text-primary-active relative">
          Field of activity
        </span>
        <section className="grid grid-cols-2 max-sm:grid-cols-1 gap-4 mt-4">
            <article v-for="item in userInfo.FieldOfActivity" className="h-52 grid justify-center content-center bg-light-white shadow-[0_0_20px] shadow-gray-600/10 rounded-3xl">
              <figure className="grid justify-center h-16">
                <Image className="w-full h-16 object-contain" 
                  width={900}
                  height={900}
                src="/images/layers.png" alt="item.title" />
              </figure>
              <h2 className="text-center font-black mt-3 pb-1 text-xl text-primary-active">
                Web developer
              </h2>
              <p className="text-center px-12 font-light text-sm text-primary-active/70">
              Implementation of a full-stack website (SPA, MPA).
              </p>
            </article>
            <article v-for="item in userInfo.FieldOfActivity" className="h-52 grid justify-center content-center bg-light-white shadow-[0_0_20px] shadow-gray-600/10 rounded-3xl">
              <figure className="grid justify-center h-16">
                <Image className="w-full h-16 object-contain" 
                  width={900}
                  height={900}
                src="/images/api.png" alt="item.title" />
              </figure>
              <h2 className="text-center font-black mt-3 pb-1 text-xl text-primary-active">
                Back-end developer
              </h2>
              <p className="text-center px-12 font-light text-sm text-primary-active/70">
              mplementation of a cross-platform service for various platforms (Android, iOS, Windows, and web applications).
              </p>
            </article>
            <article v-for="item in userInfo.FieldOfActivity" className="h-52 grid justify-center content-center bg-light-white shadow-[0_0_20px] shadow-gray-600/10 rounded-3xl">
              <figure className="grid justify-center h-16">
                <Image className="w-full h-16 object-contain" 
                  width={900}
                  height={900}
                src="/images/web-design.png" alt="item.title" />
              </figure>
              <h2 className="text-center font-black mt-3 pb-1 text-xl text-primary-active">
              Front-end developer
              </h2>
              <p className="text-center px-12 font-light text-sm text-primary-active/70">
              Utilizing JavaScript frameworks for developing (SSR, SPA) applications.
              </p>
            </article>
            <article v-for="item in userInfo.FieldOfActivity" className="h-52 grid justify-center content-center bg-light-white shadow-[0_0_20px] shadow-gray-600/10 rounded-3xl">
              <figure className="grid justify-center h-16">
                <Image className="w-full h-16 object-contain" 
                  width={900}
                  height={900}
                src="/images/seo.png" alt="item.title" />
              </figure>
              <h2 className="text-center font-black mt-3 pb-1 text-xl text-primary-active">
              SEO specialist
              </h2>
              <p className="text-center px-12 font-light text-sm text-primary-active/70">
              Engagement in activities aimed at improving rankings and obtaining organic traffic in search engine results
              </p>
            </article>
        </section>
      </div>
      <div className="highlight mt-8">
        <span className="font-black text-xl text-primary-active relative">
          My Skills
        </span>
        {skills.map(skill => (
          <article className="w-full h-10 mt-4 bg-gray-200 rounded-full">
          <div className="relative overflow-hidden transition-all duration-[3000ms] h-full leading-[2.5rem] bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full " >
              <span className="absolute left-6 top-0 z-30 text-sm leading-[2.8rem] font-semibold">{skill.title}</span>
              <span className="absolute right-6 top-4 font-semibold z-30" >%29</span>
          </div>
        </article>
        ) )}
        
      </div>
    </main>
  )
}
