import React, { Fragment,useState,useEffect } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import Image from "next/image";
import TextTransition, { presets } from 'react-text-transition';
import MainHeading from '../helpers/heading/main_heading';
import WebinarFilter from './filter_component';
import {CalendarIcon } from '@heroicons/react/24/outline'
import { axiosPublic } from '@/common/axiosPublic';
import WebinarCard from '../helpers/card/webinar_card_component';
import { useRouter } from 'next/navigation';

export default function WebinarContainer() {
const router=  useRouter();
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {

    fetchData();

  }, [])

  const fetchData = async () => {
    try {
      const result = await axiosPublic.get('/lms/webinar');
      console.log("what is the result");
      console.log(result.data);
      setData(result.data.webinar);
    } catch (error) {

    }
  }
  return (
    <main className="w-full bg-primary_color flex-1 flex flex-col justify-start items-start">
    <MainHeading text='Webniars'/>
    <div className="flex flex-row gap-1 items-center mt-14">
    <p className="text-blue text-base font-medium" onClick={(e)=>{
                  
                    router.back();
                }}>Home</p>
        <ChevronRightIcon className="text-text_grey_one h-4 w-4" />
        <p className="text-text_grey_one text-base font-medium">Webinar</p>
      </div>
      <div className='w-full flex flex-row  items-center justify-between mt-3'>
<h3 className='text-xl font-normal text-white'>Upcoming Webniars</h3>
{/* <WebinarFilter/> */}
      </div>

      <div className="w-full grid grid-cols-3 gap-6 mt-8">

{
data.map((e: any,index) => {
    return <WebinarCard key={index} data={e}/>
  })
}




</div>
    </main>
  )
}
