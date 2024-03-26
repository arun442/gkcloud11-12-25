import React, { Fragment, useState } from 'react'
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

export default function ScheduleContainer() {
  const [index, setIndex] = useState(0);
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
          [1, 2, 3, 4, 5, 6].map((e: any) => {
            return <div className="cursor-pointer box-border  p-6  border flex flex-col justify-start items-start border-grey border-1 bg-dark_blue rounded-2xl">


              <h2 className="text-white text-lg font-medium">Prompt Engineering for Generative AI</h2>
              <div className="w-full flex flex-row mt-6 items-center justify-between">
                <p className="text-text_grey_one text-[12px] font-normal">GEN002</p>
                <div className='flex-1 flex flex-row items-center justify-end gap-2'>
                  <CalendarIcon className="text-text_grey_one h-4 w-4" />
                  <p className="text-text_grey_one text-[12px] font-normal">4 Days</p>
                </div>

              </div>
              <table className="border-collapse border border-table_border mt-6 w-full">
  <thead>
    <tr >
 
      <th className="border border-table_border text-base text-white font-normal py-6">Date</th>
      <th className="border border-table_border text-base text-white font-normal">Location</th>
      <th className="border border-table_border text-base text-white font-normal">Fees</th>
    </tr>
  </thead>
  <tbody>
    <tr>
    
      <td className="border border-table_border text-base font-medium text-table_font text-center py-4">19 Mar 2024 - 20 Mar 2024</td>
      <td className="border border-table_border text-base font-medium text-table_font text-center py-4">WBT</td>
      <td className="border border-table_border text-base font-medium text-table_font text-center py-4">INR 11,700</td>
    </tr>
    
  </tbody>
</table>
              <div className="text-white text-sm font-medium mx-auto mt-7 items-center py-3  px-8  rounded-full bg-blue">

                Enroll
              </div>

            </div>
          })
        }




      </div>
    </main>
  )
}
