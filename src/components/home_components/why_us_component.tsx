import React, { Fragment, useState } from 'react'
import MainHeading from '../helpers/heading/main_heading'





export default function WhyUsComponent() {

    const items = [
        {
            image: "url",
            title: "50+",
            desc: "Online Courses"

        }, {
            image: "url",
            title: "1000+",
            desc: "Active Students"

        }, {
            image: "url",
            title: "15+",
            desc: "Instructors"

        }, {
            image: "url",
            title: "50+",
            desc: "Certifications"

        }
    ];

    return (
        <main className='flex flex-col justify-center items-center gap-14'>
            <MainHeading text='Why Us'/>
            <section className=" w-full px-14  grid grid-cols-4 gap-2">
{
    items.map((e)=>{
        return <div key={e.title} className='flex flex-col justify-center items-center'>
            <div className='w-32 h-32 mb-3 rounded-full bg-blue'></div>
            <h3 className='text-4xl font-bold text-center text-blue'>{e.title}</h3>
            <p className='text-lg text-white font-medium text-center mb-10'>{e.desc}</p>
        </div>
    })
}
        </section>
        </main>
    )
}
