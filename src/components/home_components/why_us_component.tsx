"use client";
import React, { Fragment, useState } from 'react'
import MainHeading from '../helpers/heading/main_heading'
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';



export default function WhyUsComponent() {

    const items = [
        {
            image: "/Image_8.png",
            title: 50,
            desc: "Online Courses"

        }, {
            image:  "/Image_13.png",
            title: 1000,
            desc: "Active Students"

        }, {
            image:  "/Image_14.png",
            title: 15,
            desc: "Instructors"

        }, {
            image:  "/Image_15.png",
            title: 50,
            desc: "Certifications"

        }
    ];

    return (
        <main className='flex flex-col justify-center items-center gap-14 mt-24'>
            <MainHeading text='Why Us'/>
            <section className=" w-full px-14  grid grid-cols-4 gap-2">
{
    items.map((e)=>{
        return <div key={e.title} className='flex flex-col justify-center items-center'>
            <div className='w-32 h-32 mb-3 rounded-full bg-blue flex items-center justify-center'>
            <img
                                   
                                        className="h-14 w-auto"
                                        src={e.image}/>
                                        
            </div>
            <div className='text-4xl font-bold text-center text-blue'>
            <CountUp enableScrollSpy end={e.title} /> <span>+</span>
          </div>
           
          
            <p className='text-lg text-white font-medium text-center mb-10'>{e.desc}</p>
        </div>
    })
}
        </section>
        </main>
    )
}
