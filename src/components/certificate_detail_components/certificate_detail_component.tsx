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
import FormComponent from '../course_detail_components/detail_form_component';
import useUserData from '@/hooks/userData';
import { useParams, useRouter } from 'next/navigation';
import { axiosPrivate } from '@/common/axiosPrivate';
import useTrainingMode from '@/hooks/training_mode_hook';
import CertificateCourseCard from '../helpers/card/certificate_course_card_component';
import { toast } from "react-toastify";
import hideDuration from '@/helpers/hide_duration';


export default function CertificateDetailContainer({ data }: { data: any }) {
   
    const { trainingData } = useTrainingMode();
    const router = useRouter();
    const [index, setIndex] = useState(0);
    const { userData, } = useUserData();
    const [isLoading, setLoading] = useState(false);
    const params = useParams();
    const entroll = async () => {
        if (userData == null) {
            return toast.info("Before enrollment Please login");
        }
        try {
            if (isLoading) {
                return;
            }
            setLoading(true);
            const result = await axiosPrivate.post('/lms/add-certificate-course-enrollment', {
                "userId": userData.userId,
                "certificateCourseId": parseInt(params.courseId[0]),

                "courseCostPlanId": data.CertificateCourseCostPlans[0].certificateCourseCostPlanId,
                "enrollmentReference": "This is Test Enrollment",
                "amount": data.CertificateCourseCostPlans.length != 0 && data.CertificateCourseCostPlans[0].offerId != null   &&data.CertificateCourseCostPlans[0].offerPrice>0? data.CertificateCourseCostPlans[0].offerPrice : data.CertificateCourseCostPlans[0].planPrice
            });


            setLoading(false);
            window.open(`${result.data.gateway.url}&encRequest=${result.data.gateway.encRequest}&access_code=${result.data.gateway.access_code}`,"_self");
         


        } catch (error: any) {
            setLoading(false);
           
        toast.error(error!.message);

        }
    }
    return (
        <main className="w-full bg-primary_color flex-1 flex flex-col justify-start items-start">

            <div className="flex mt-4 flex-row gap-1 items-center">
                <p className="hover:text-blue cursor-pointer text-blue text-base font-medium" onClick={(e) => {
                  
                    router.replace("/");
                }}>Home</p>
                <ChevronRightIcon className="text-text_grey_one h-4 w-4" />
                <p className="hover:text-blue cursor-pointer text-blue text-base font-medium" onClick={(e) => {

router.replace("/course");
                }}>Course</p>
                <ChevronRightIcon className="text-text_grey_one h-4 w-4" />
                <p className="hover:text-blue cursor-pointer text-text_grey_one text-base font-medium">{data.title}</p>
            </div>

            <h1 className='font-semibold text-4xl mt-5 text-white'>{data.title}</h1>
            <p className='mt-2 leading-6 font-normal text-[16px] text-white'>{data?.description ?? ""}</p>
            <section className='flex mt-10 flex-row flex-wrap gap-10'>
                {/* <div className="flex flex-row gap-3 items-center">
                    <MagnifyingGlassIcon className="text-blue h-8 w-8" />
                    <p className="text-white text-xl font-normal">Gen002</p>
                </div> */}
                <div className="flex flex-row gap-3 items-center">
                    <img
alt='learning mode'
                        className="text-blue h-8 w-8"
                        src="/learning_mode.svg" />
                    <p className="text-white text-xl font-normal">{data.CertificateCourseCostPlans[0].CertificateCourseItems.length} Courses</p>
                </div>
                {
                     hideDuration(data.partnerId,data.categoryId)?<></>:   <div className="flex flex-row gap-3 items-center">
                     <img
 alt='clock icon'
                         className="text-blue h-8 w-8"
                         src="/Icon_clock.svg" />
 
                     <p className="text-white text-xl font-normal">{Math.round(data.CertificateCourseCostPlans[0].CertificateCourseItems.reduce((accumulator:any, currentValue:any) => parseFloat(currentValue?.CourseDuration?.courseDuration??"0.0") + accumulator, 0))} {"hours"}</p>
                 </div>
                }
              
                <div className="flex flex-row gap-3 items-center">
                    <img
alt='rubee icon'
                        className="text-blue h-8 w-8"
                        src="/rubee_icon.svg" />

                    {
                        data.CertificateCourseCostPlans.length != 0 && data.CertificateCourseCostPlans[0].offerId != null  &&data.CertificateCourseCostPlans[0].offerPrice>0 ? <div className='flex flex-row'>
                            <p className="text-white text-xl font-normal">₹ {Math.round(data.CertificateCourseCostPlans[0].offerPrice)}/-</p>
                            <p className="text-white text-xl line-through font-normal">₹ {Math.round(data.CertificateCourseCostPlans[0].planPrice)}/-</p>
                        </div> :Math.round(data.CertificateCourseCostPlans[0].planPrice)<1?<></>: <p className="text-white text-xl font-normal">₹ {Math.round(data.CertificateCourseCostPlans[0].planPrice)}/-</p>
                    }
                </div>
            </section>
            {/* <section className='flex flex-row items-start mt-20'>
                <div className=" mx-auto box-border border flex flex-row gap-3  items-center p-3  border-blue border-1 bg-dark_blue rounded-2xl">
                    <img

                        className="text-blue h-6 w-6"
                        src="/pdf_icon.svg" />
                    <p className="text-white text-sm font-normal">Download Course Content</p>
                </div>
            </section> */}

            <section className='flex flex-row items-start mt-12'>
                <button onClick={(e) => {
                    entroll();
                }} className="flex w-full justify-center rounded bg-blue py-3 px-10 font-medium text-white ">
                    Enroll Now
                </button>
            </section>
            <section className='mt-10'>
                <h3 className='text-xl font-medium text-white'>Courses</h3>
                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">

                    {
                      data.CertificateCourseCostPlans[0].CertificateCourseItems.map((e: any, index: any) => {
                            return <CertificateCourseCard showPrice={false} key={index} data={e} />
                        })
                    }




                </div>
            </section>
            <FormComponent type='Certificate' referenceId={ parseInt(params.courseId[0])} referenceCode={ params.courseId[0]} requestDescription={data.title} />

        </main>
    )
}
