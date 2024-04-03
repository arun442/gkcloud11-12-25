import React, { Fragment, useState } from 'react'
import MainHeading from '../helpers/heading/main_heading'





export default function UnqueOfferComponent() {

    const classItems = [
        {
            image: "url",
            title: "1-on-1 Training",
            desc: "Schedule personalized sessions based upon your availability."

        }, {
            image: "url",
            title: "Customized Training",
            desc: "Tailor your learning experience. Dive deeper in topics of greater interest to you."

        }, {
            image: "url",
            title: "4-Hour Sessions",
            desc: "Optimize learning with GKCS 4-hour sessions, balancing knowledge retention and time constraints."

        }, {
            image: "url",
            title: "Free Demo Class",
            desc: "Join our training with confidence. Attend a free demo class to experience our expert trainers and get all your queries answered."

        }
    ];

    return (
        <main className='flex flex-col justify-center items-center gap-14'>
            <MainHeading text='GKCS Unique Offerings'/>
            <section className=" w-full px-40  grid grid-cols-2 gap-2">
{
   
    classItems.map((e)=>{
        return <div key={e.title} className='p-6 bg-dark_blue border-2  border-blue rounded-md h-[200px] flex flex-col justify-center gap-8'>
            <h3 className='text-xl font-medium text-center text-white'>{e.title}</h3>
            <p className='text-sm text-white'>{e.desc}</p>
        </div>
    })

}
        </section>
        </main>
       
    )
}
