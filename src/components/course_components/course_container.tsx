import React, { Fragment, useState, useEffect } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import Image from "next/image";
import TextTransition, { presets } from 'react-text-transition';
import MainHeading from '../helpers/heading/main_heading';

import { CalendarIcon } from '@heroicons/react/24/outline'
import CourseCard from '../helpers/card/course_card_component';
import classNames from '@/helpers/add_class';
import DurationDropdown from './duration_dropdown_component';
import PartnerDropdown from './partner_dropdown_component';
import TechnologyDropdown from './technology_dropdown_component';
import { axiosPublic } from '@/common/axiosPublic';
import CertificateCard from '../helpers/card/certificate_card_component';
import { useRouter } from 'next/navigation';
import useTrainingMode from '@/hooks/training_mode_hook';

export default function CourseContainer() {
  const [index, setIndex] = useState(0);
  const [course, setCourse] = useState<any[]>([]);
  const [courseList, setCourseList] = useState<any[]>([]);
  const [certificate, setCertificate] = useState<any[]>([]);
  const router = useRouter();
  useEffect(() => {

    fetchCourse();
    fetchCertificate();

  }, [])

  const fetchCourse = async () => {
    try {
      const result = await axiosPublic.get('/lms/course');
      console.log("what is the result");
      console.log(result.data);

  
      setCourseList(result.data.courses)
      setCourse(result.data.courses);
    } catch (error) {

    }
  }
  const fetchCertificate = async () => {
    try {
      const result = await axiosPublic.get('/lms/certificate-course');
      console.log("what is the result");
      console.log(result.data);
      setCertificate(result.data.certificateCourses);
    } catch (error) {

    }
  }
  const [trainingList, setTrainingData] = useState<any[]>([]);
  const [partner, setPartner] = useState<any>(null);
  const [technology, setTechnology] = useState(null);

  const { trainingData, isLoading } = useTrainingMode();

const filter=()=>{
  console.log(trainingList);
  let courseCopyData=courseList;
  // if(trainingList.length==0){
  //   setCourse(courseCopyData);
  //   return;
  // }
  setCourse(courseCopyData.filter((e) => {
   
    return trainingList.some((tran) => e.CourseCostPlans.map((coursePlan: any) => coursePlan.trainingModeId).includes(tran))||  e.partnerId ==partner?.partnerId
  }))
}
  //  ||
  return (
    <main className="w-full bg-primary_color flex-1 flex flex-col justify-start items-start">

      <div className="flex flex-row gap-1 items-center">
        <p className="text-blue text-base font-medium" onClick={(e) => {

          router.back();
        }}>Home</p>
        <ChevronRightIcon className="text-text_grey_one h-4 w-4" />
        <p className="text-text_grey_one text-base font-medium">Course</p>
      </div>
      <div className={classNames("w-full cursor-pointer text-2xl  flex flex-row mt-12 mb-12 justify-center items-center  gap-7")}>
        <div className={index != 0 ? "text-white font-normal" : "text-blue font-medium"} onClick={(e) => setIndex(0)}>
          Courses Library
        </div>
        <div className='h-6 w-[1px] rounded-lg bg-grey'></div>
        <div className={index != 1 ? "text-white font-normal" : "text-blue font-medium"} onClick={(e) => setIndex(1)}>
          Combo
        </div>

      </div>
      <div className='box-border border w-full p-8 border-blue border-1 bg-dark_blue rounded-2xl'>
        <h2 className="text-white text-lg font-medium">Fliter by</h2>
        <section className='mt-10 flex flex-row gap-6'>
          <DurationDropdown />
          <PartnerDropdown data={partner} setData={setPartner} />
          <TechnologyDropdown data={technology} setData={setTechnology}  />
        </section>
        <div className='h-[0.5px] mx-auto w-[95%] bg-blue mt-10'></div>
        <section className='mt-10 flex flex-row items-center gap-10'>
          {
            trainingData.map((e, index) => <div className='flex flex-row items-center gap-2'>
              <input
                id={e.trainingModeId}
                name={`${e.trainingModeId}`}
                defaultValue={e.trainingModeId}
                value={e.trainingModeId}
                type="checkbox"
                checked={trainingList.some((data) => data == e.trainingModeId) ? true : false}
                onChange={(onChangeData: any) => {
                  if (trainingList.some((data) => data == e.trainingModeId)) {
                    setTrainingData((prev) => prev.filter((data) => data != e.trainingModeId));
                  } else {
                    setTrainingData((prev) => [...prev, e.trainingModeId]);
                  }
                  console.log(trainingList);


                }}
                defaultChecked={false}
                className={trainingList.some((data) => data == e.trainingModeId) ? "h-4 w-4 rounded border-custom_blue text-custom_blue focus:ring-custom_blue" : "h-4 w-4 rounded border-custom_grey text-custom_grey focus:ring-custom_grey"}
              />

              <h2 className="text-white text-sm font-medium">{e.trainingModeName}</h2>
            </div>
            )
          }



        </section>
        <div className='h-[0.5px] mx-auto w-[95%] bg-blue mt-10'></div>
        <section className='flex flex-row items-center justify-center'>
          <div onClick={(e:any)=>{
            e.preventDefault();
filter();
          }} className="cursor-default mx-auto box-border border flex flex-row gap-3 mt-7 items-center py-3 px-12 border-blue border-1 bg-primary_color rounded-full">

            <h3 className="text-blue text-lg font-medium">Filter</h3>
          </div>
        </section>
      </div>

      {
        index == 0 ? <div className="w-full grid grid-cols-3 gap-6 mt-8">

          {
            course.map((e: any, index) => {
              return <CourseCard key={index} data={e} />
            })
          }




        </div> : <div className="w-full grid grid-cols-3 gap-6 mt-8">

          {
            certificate.map((e: any, index) => {
              return <CertificateCard key={index} data={e} />
            })
          }




        </div>
      }
    </main>
  )
}
