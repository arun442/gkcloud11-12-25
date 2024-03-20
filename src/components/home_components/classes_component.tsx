import React, { Fragment, useState } from 'react'
import MainHeading from '../helpers/heading/main_heading'





export default function ClassesComponent() {

    const classItems = [
        {
            image: "url",
            title: "Classroom Training",
            desc: "Traditional, instructor-led learning in popular global destinations."

        }, {
            image: "url",
            title: "Live Online Classes",
            desc: "Flexible virtual learning with expert instructors from the comfort of your own space."

        }, {
            image: "url",
            title: "Flexi",
            desc: "Self-paced learning with edited lectures, courseware, hands-on labs, and optional doubt clearning sessions"

        }, {
            image: "url",
            title: "WBT",
            desc: "Master in-depth topics with interactive modules, branching scenarios, and adaptive learning paths."

        }
    ];

    return (
        <main className="w-full grid grid-cols-4 gap-2">
{
    classItems.map((e)=>{
        return <div key={e.title} className='p-4 bg-dark_blue border-2  border-blue rounded-md h-[450px] flex flex-col justify-center gap-10'>
            <h3 className='text-xl font-bold text-center text-blue'>{e.title}</h3>
            <p className='text-lg text-white text-center mb-10'>{e.desc}</p>
        </div>
    })
}
        </main>
    )
}
