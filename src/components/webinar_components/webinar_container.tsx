import React, { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import Image from "next/image";
import TextTransition, { presets } from 'react-text-transition';
import MainHeading from '../helpers/heading/main_heading';
import WebinarFilter from './filter_component';
import {CalendarIcon } from '@heroicons/react/24/outline'

export default function WebinarContainer() {

  return (
    <main className="w-full bg-primary_color flex-1 flex flex-col justify-start items-start">
    <MainHeading text='Webniars'/>
    <div className="flex flex-row gap-1 items-center mt-14">
    <p className="text-blue text-base font-medium">Home</p>
        <ChevronRightIcon className="text-text_grey_one h-4 w-4" />
        <p className="text-text_grey_one text-base font-medium">Webinar</p>
      </div>
      <div className='w-full flex flex-row  items-center justify-between mt-3'>
<h3 className='text-xl font-normal text-white'>Upcoming Webniars</h3>
<WebinarFilter/>
      </div>

      <div className="w-full grid grid-cols-3 gap-6 mt-8">

{
 [1,2,3,4,5,6].map((e: any) => {
    return <div className="cursor-pointer box-border border flex flex-col justify-start items-start border-blue border-1 bg-dark_blue">
   <div className='w-full bg-blue h-48'></div>
   <section className='flex flex-col  p-6 '>
   <h2 className="text-white text-xl font-medium">Prompt Engineering for Generative AI</h2>
    <div className="flex flex-row gap-1 mt-2 items-center justify-between">
     <div className='flex flex-row'>
     <CalendarIcon className="text-text_grey_one h-4 w-4" />
      <p className="text-text_grey_one text-base font-normal">15 Mar 2024 | 06:45PM</p>
     </div>
     <p className="text-text_grey_one text-base font-normal">More..</p>
    </div>

  <div className="text-white text-sm font-medium mx-auto mt-7 items-center py-3  px-6  rounded-full bg-blue">

    Register Now
    </div>
   </section>
  </div>
  })
}




</div>
    </main>
  )
}
