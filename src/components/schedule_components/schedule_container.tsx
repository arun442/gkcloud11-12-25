import React, { Fragment, useState,useEffect } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import Image from "next/image";
import TextTransition, { presets } from 'react-text-transition';
import MainHeading from '../helpers/heading/main_heading';
import SelectPartnerDropdown from './select_partner_dropdown_component';
import { CalendarIcon } from '@heroicons/react/24/outline'
import SelectCourseDropdown from './select_course_dropdown_component';
import NormalBtn from '../helpers/buttons/normal_btn_component';
import classNames from '@/helpers/add_class';
import { axiosPublic } from '@/common/axiosPublic';
import ScheduleCard from '../helpers/card/schedule_card_component';

export default function ScheduleContainer() {
  const [index, setIndex] = useState(0);
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {

    fetchData();

  }, [])

  const fetchData = async () => {
    try {
      const result = await axiosPublic.get('/lms/course-schedule');
      console.log("what is the result");
      console.log(result.data);
      setData(result.data.courses);
    } catch (error) {

    }
  }
  return (
    <main className="w-full bg-primary_color flex-1 flex flex-col justify-start items-start">
      <MainHeading text='Schedules' />
      <div className="flex flex-row gap-1 items-center mt-14">
        <p className="text-blue text-base font-medium">Home</p>
        <ChevronRightIcon className="text-text_grey_one h-4 w-4" />
        <p className="text-text_grey_one text-base font-medium">Schedules</p>
      </div>
      <div className='w-full flex flex-row  items-center justify-between mt-3'>
        <h3 className='text-xl font-normal text-white'>All Courses</h3>
        <div className='flex-1 flex flex-row gap-5 justify-end'>
          <SelectPartnerDropdown />
          <SelectCourseDropdown />
          <NormalBtn text={"Search"} onClick={(e: any) => {

          }} />
          <NormalBtn text={"Clear"} onClick={(e: any) => {

          }} />
        </div>
      </div>
      <div className={classNames("w-full cursor-pointer text-xl  flex flex-row mt-12 mb-12 justify-center items-center  gap-7")}>
        <div className={index != 0 ? "text-white font-normal" : "text-blue font-medium"} onClick={(e) => setIndex(0)}>
          Week Days
        </div>
        <div className='h-6 w-[1px] rounded-lg bg-grey'></div>
        <div className={index != 1 ? "text-white font-normal" : "text-blue font-medium"} onClick={(e) => setIndex(1)}>
          Weekend
        </div>

      </div>

      <div className="w-full grid grid-cols-2 gap-6 mt-8">

        {
        data.map((e: any,index) => {
            return <ScheduleCard data={e} key={index} type={e}/> 
          })
        }




      </div>
    </main>
  )
}
