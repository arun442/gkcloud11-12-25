import React, { Fragment, useState, useEffect } from 'react'
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
import { useRouter } from 'next/navigation';
import PartnerDropdown from '../course_components/partner_dropdown_component';
import TechnologyDropdown from '../course_components/technology_dropdown_component';


export default function ScheduleContainer() {
  const [index, setIndex] = useState(0);
  let [data, setData] = useState([]);
  const [scheduleList, setScheduleData] = useState([]);
  const router = useRouter();
  useEffect(() => {

    fetchData();

  }, [])

  const fetchData = async () => {
    try {
      const result = await axiosPublic.get('/lms/course-schedule');

      setData(result.data.courses.filter((e: any) => e.CourseSchedules.length != 0));
      setScheduleData(result.data.courses.filter((e: any) => e.CourseSchedules.length != 0));
    } catch (error) {

    }
  }

  const [partner, setPartner] = useState<any>(null);
  const [technology, setTechnology] = useState<any>(null);


  const filter = () => {
  
 data = scheduleList;


    if (partner != null || technology != null ) {
      if (partner != null) {
        console.log("partner");
        console.log(partner);
        data =  data.filter((e:any) => {

          return e.partnerId == partner?.partnerId
        })
      }
      if (technology != null) {
        data = data.filter((e:any) => {

          return e.categoryId == technology?.categoryId
        })
      }
     
    }
    setData( data);
  }

  useEffect(() => {
   
  filter();
   
  }, [partner,technology])
  

  const clearFilter = () => {
    setData(scheduleList);
  
    setPartner(null);
    setTechnology(null);
  
  }
  return (
    <main className="w-full bg-primary_color flex-1 flex flex-col justify-start items-start">
      <MainHeading text={data.length==0?"Coming Soon…":'Schedules'} />
     {
      data.length!=0&& <div className="flex flex-row gap-1 items-center mt-14 hover:text-blue ">
      <p className="cursor-pointer text-blue text-base font-medium" onClick={(e) => {

        router.replace("/");
      }}>Home</p>
      <ChevronRightIcon className="text-text_grey_one h-4 w-4" />
      <p className="text-text_grey_one text-base font-medium hover:text-blue cursor-pointer">Schedules</p>
    </div>
     }
      {
        data.length!=0&&<div className='w-full flex flex-row  items-center justify-between mt-3'>
        <h3 className='text-xl font-normal text-white'>All Courses</h3>
        <div className='flex-1 flex flex-row flex-wrap gap-5 justify-end'>
          <PartnerDropdown data={partner} setData={setPartner} />
          <TechnologyDropdown partner={partner} data={technology} setData={setTechnology} />

       
          {partner != null || technology != null ? <NormalBtn text={"Clear"} onClick={(e: any) => {
            e.preventDefault();
            clearFilter();

          }} /> : <></>}
        </div>
      </div>
      }
     

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

        {
          data.map((e: any, index) => {
            return <ScheduleCard data={e} key={index} type={e} />
          })
        }




      </div>
    </main>
  )
}
