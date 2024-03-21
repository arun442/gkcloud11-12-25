import React, { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import Image from "next/image";
import TextTransition, { presets } from 'react-text-transition';
import MainHeading from '../helpers/heading/main_heading';
import WebinarFilter from './filter_component';


export default function WebinarContainer() {

  return (
    <main className="w-full bg-primary_color flex-1 flex flex-col justify-start items-start">
    <MainHeading text='Webniars'/>
    <div className="flex flex-row gap-1 items-center">
    <p className="text-blue text-base font-medium">Home</p>
        <ChevronRightIcon className="text-text_grey_one h-4 w-4" />
        <p className="text-text_grey_one text-base font-medium">Webinar</p>
      </div>
      <div className='w-full flex flex-row  items-center justify-between'>
<h3 className='text-xl font-normal text-white'>Upcoming Webniars</h3>
<WebinarFilter/>
      </div>
    </main>
  )
}
