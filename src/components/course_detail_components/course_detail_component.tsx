import React, { Fragment, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import Image from "next/image";
import TextTransition, { presets } from 'react-text-transition';
import MainHeading from '../helpers/heading/main_heading';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { CalendarIcon } from '@heroicons/react/24/outline'
import CourseCard from '../helpers/card/course_card_component';
import classNames from '@/helpers/add_class';
import DurationDropdown from './duration_dropdown_component';
import PartnerDropdown from './partner_dropdown_component';
import TechnologyDropdown from './technology_dropdown_component';
import FormComponent from './detail_form_component';
import useUserData from '@/hooks/userData';
import { axiosPrivate } from '@/common/axiosPrivate';
import { useParams, useRouter } from 'next/navigation'

export default function CourseDetailContainer({data}:{data:any}) {
    const { userData,} = useUserData();
    const [isLoading, setLoading] = useState(false);
    const params = useParams();
    const router=useRouter();
    const entroll=async()=>{
if(userData==null){
    return alert("Before entrollment Please login");
}
try {
    if (isLoading) {
        return;
    }
    setLoading(true);
    const result = await axiosPrivate.post('/lms/add-course-enrollment', {
        "userId":  userData.userId,
        "courseId" :parseInt(params.courseId[0]),
       
        "courseCostPlanId": data.CourseCostPlans[0].courseCostPlanId,
        "enrollmentReference":"This is Test Enrollment",
        "amount": data.CourseCostPlans[0].planPrice
        });


    setLoading(false);
    window.open(`${result.data.gateway.url}&encRequest=${result.data.gateway.encRequest}&access_code=${result.data.gateway.access_code}`);
    console.log(result.data);
   

} catch (error: any) {
    setLoading(false);
    console.log(error);
    alert(error!.message);

}
    }
    const [index, setIndex] = useState(0);
    return (
        <main className="w-full bg-primary_color flex-1 flex flex-col justify-start items-start">

            <div className="flex flex-row gap-1 items-center">
                <p className="text-blue text-base font-medium" onClick={(e)=>{
                    router.back();
                    router.back();
                }}>Home</p>
                <ChevronRightIcon className="text-text_grey_one h-4 w-4" />
                <p className="text-blue text-base font-medium" onClick={(e)=>{
                    router.back();
                }}>Course</p>
                <ChevronRightIcon className="text-text_grey_one h-4 w-4" />
                <p className="text-text_grey_one text-base font-medium">{data.courseCode}</p>
            </div>

            <h1 className='font-semibold text-4xl mt-5 text-white'>{data.title}</h1>
            <section className='flex mt-10 flex-row gap-10'>
                <div className="flex flex-row gap-3 items-center">
                <img
                                   
                                   className="text-blue h-8 w-8"
                                   src="/category_icon.svg"/>
                  
                    <p className="text-white text-xl font-normal">{data.courseCode}</p>
                </div>
                <div className="flex flex-row gap-3 items-center">
                <img
                                   
                                   className="text-blue h-8 w-8"
                                   src="/learning_mode.svg"/>
                    
                    <p className="text-white text-xl font-normal">ILO</p>
                </div>
                <div className="flex flex-row gap-3 items-center">
                <img
                                   
                                   className="text-blue h-8 w-8"
                                   src="/Icon_clock.svg"/>
                    <p className="text-white text-xl font-normal">{data.CourseDurations[0].courseDuration} days</p>
                </div>
                <div className="flex flex-row gap-3 items-center">
                <img
                                   
                                   className="text-blue h-8 w-8"
                                   src="/rubee_icon.svg"/>
                    {
                   data.CourseCostPlans.length!=0&& data.CourseCostPlans[0].offerId!=null?      <div className='flex flex-row'>
                     <p className="text-white text-xl font-normal">₹ {data.CourseCostPlans[0].planPrice}/-</p>
                     <p className="text-white line-through text-xl font-normal">₹ {data.CourseCostPlans[0].offerPrice}/-</p>
                   </div>: <p className="text-white text-xl font-normal">₹ {data.CourseCostPlans[0].planPrice}/-</p>
                    }
                </div>
            </section>
            <section className='flex flex-row items-start mt-20'>
                <div className=" mx-auto box-border border flex flex-row gap-3  items-center p-3  border-blue border-1 bg-dark_blue rounded-2xl">
                <img
                                   
                                   className="text-blue h-6 w-6"
                                   src="/pdf_icon.svg"/>
                    <p className="text-white text-sm font-normal">Download Course Content</p>
                </div>
            </section>
            <section className='flex flex-row items-start mt-10'>
            <button onClick={(e)=>{
entroll();
            }} className="flex w-full justify-center rounded bg-blue py-3 px-10 font-medium text-white ">
                   Entroll Now
                </button>
            </section>
            <section className={classNames("w-full cursor-pointer text-sm  flex flex-row mt-12 justify-center items-center  gap-7")}>
                <div  className={index != 0 ? "text-white font-normal" : "text-blue font-medium"} onClick={(e) => setIndex(0)}>
                    Course Description
                </div>
                <div className='h-6 w-[1px] rounded-lg bg-grey'></div>
                <div className={index != 1 ? "text-white font-normal" : "text-blue font-medium"} onClick={(e) => setIndex(1)}>
                    Objectives
                </div>
                <div className='h-6 w-[1px] rounded-lg bg-grey'></div>
                <div className={index != 2 ? "text-white font-normal" : "text-blue font-medium"} onClick={(e) => setIndex(2)}>
                    Schedules
                </div>
                <div className='h-6 w-[1px] rounded-lg bg-grey'></div>
                <div className={index != 3 ? "text-white font-normal" : "text-blue font-medium"} onClick={(e) => setIndex(3)}>
                    Audience
                </div>
                <div className='h-6 w-[1px] rounded-lg bg-grey'></div>
                <div className={index != 4 ? "text-white font-normal" : "text-blue font-medium"} onClick={(e) => setIndex(4)}>
                    Prerequisites
                </div>
                <div className='h-6 w-[1px] rounded-lg bg-grey'></div>
                <div className={index != 5 ? "text-white font-normal" : "text-blue font-medium"} onClick={(e) => setIndex(5)}>
                    Content
                </div>

            </section>
            <main className='mt-14'>
               {index==0? <section>
                    <h2 className='font-semibold text-2xl text-white'>Course Description</h2>
                    <p className='mt-6 leading-6 font-normal text-sm text-white'>{data.description}</p>
                </section>: <section>
                  
                    <p className='mt-6 leading-6 font-normal text-sm text-white'>{data?.Audience?.description??""}</p>
                </section>}
            </main>

      <FormComponent type='Course'/> 


        </main>
    )
}
