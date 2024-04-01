import React, { Fragment, useState, useEffect } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import Image from "next/image";
import TextTransition, { presets } from 'react-text-transition';
import MainHeading from '../helpers/heading/main_heading';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { CalendarIcon } from '@heroicons/react/24/outline'
import CourseCard from '../helpers/card/course_card_component';
import classNames from '@/helpers/add_class';
import { axiosPublic } from '@/common/axiosPublic';
import PartnerAboutComponent from './partner_component';
import OurClientAboutComponent from './our_client_component';

export default function AboutContainer() {
  const items = [
    {
      index: 0,
      name: "Overview"
    },
    {
      index: 1,
      name: "Our Story"
    },
    {
      index: 2,
      name: "Leadership"
    },
    {
      index: 3,
      name: "Our Client"
    },
    {
      index: 4,
      name: "Our Partner"
    },
  ];
  const [index, setIndex] = useState(0);

  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetchData();

    return () => {

    }
  }, []);

  const fetchData = async () => {
    try {
      const result = await axiosPublic.get("/lms/about-us");
      console.log("what is the response", result.data);
      setData(result.data.aboutUs)
    } catch (error) {
      console.log("what is the error");
      console.log(error)
    }
  }
  return (
    <main className="w-full bg-primary_color flex-1 flex flex-col justify-start items-start">


      <h1 className='font-semibold text-2xl mt-6 text-white'>About Us</h1>
      <p className='mt-6 leading-6 font-normal text-[16px] text-white'>A global leader in IT training.<br />Just tell us What, Where, When – we deliver the training.</p>

      <h1 className='font-semibold text-2xl mt-6 text-white'>We help you earn Money, Respect and Peace of Mind.</h1>
      <section className='flex flex-row items-start mt-20'>
        <div className=" mx-auto box-border border flex flex-row gap-3  items-center py-3  px-6 border-blue border-1 bg-dark_blue rounded-2xl">
          <MagnifyingGlassIcon className="text-blue h-6 w-6" />
          <p className="text-white text-lg font-normal">Download Course Content</p>
        </div>
      </section>
      <section className="mt-14 mx-auto box-border border grid grid-cols-5  w-full items-center   border-blue border-1  rounded-full">
        {
          items.map((e) => <div className={classNames("py-4 w-full box-border border flex flex-row items-center justify-center text-white text-lg font-semibold border-blue border-1 bg-primary_color", index == e.index ? "rounded-full" : "border-none rounded-none ")} onClick={(event) => {
            event.preventDefault();
            setIndex(e.index)
          }}>{e.name}</div>)
        }

      </section>

      <main className='mt-14'>
        {
          data.length == 0 ? <></> : index == 0 ? <section>
            <p className='leading-6 font-normal text-[16px] text-white'>{data.filter((e)=>e.generalId==2)[0].description}</p>
          </section> : index == 1 ? <section>
            <p className='leading-6 font-normal text-[16px] text-white'>{data.filter((e)=>e.generalId==11)[0].description}</p>
          </section> :index == 2 ? <section>
            <p className='leading-6 font-normal text-[16px] text-white'>{data.filter((e)=>e.generalId==12)[0].description}</p>
          </section> :index == 3 ?<OurClientAboutComponent
/> : <PartnerAboutComponent/> 
        }
      </main>



    </main>
  )
}
