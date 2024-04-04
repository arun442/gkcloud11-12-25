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


export default function CertificateDetailContainer({ data }: { data: any }) {
    const {trainingData}=useTrainingMode();
    const router = useRouter();
    const [index, setIndex] = useState(0);
    const { userData, } = useUserData();
    const [isLoading, setLoading] = useState(false);
    const params = useParams();
    const entroll = async () => {
        if (userData == null) {
            return alert("Before entrollment Please login");
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
                "amount": data.CertificateCourseCostPlans[0].planPrice
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
    return (
        <main className="w-full bg-primary_color flex-1 flex flex-col justify-start items-start">

            <div className="flex flex-row gap-1 items-center">
                <p className="cursor-pointer text-blue text-base font-medium" onClick={(e) => {
                    router.back();
                    router.back();
                }}>Home</p>
                <ChevronRightIcon className="text-text_grey_one h-4 w-4" />
                <p className="cursor-pointer text-blue text-base font-medium" onClick={(e) => {

                    router.back();
                }}>Course</p>
                <ChevronRightIcon className="text-text_grey_one h-4 w-4" />
                <p className="text-text_grey_one text-base font-medium">{data.title}</p>
            </div>

            <h1 className='font-semibold text-4xl mt-5 text-white'>{data.title}</h1>
            <p className='mt-2 leading-6 font-normal text-[16px] text-white'>{data?.description ?? ""}</p>
            <section className='flex mt-10 flex-row gap-10'>
                {/* <div className="flex flex-row gap-3 items-center">
                    <MagnifyingGlassIcon className="text-blue h-8 w-8" />
                    <p className="text-white text-xl font-normal">Gen002</p>
                </div> */}
                <div className="flex flex-row gap-3 items-center">
                    <img

                        className="text-blue h-8 w-8"
                        src="/learning_mode.svg" />
                    <p className="text-white text-xl font-normal">{trainingData.filter((e)=>e.trainingModeId==data.CertificateCourseCostPlans[0].CourseDuration.trainingModeId).length==0?"":trainingData.filter((e)=>e.trainingModeId==data.CertificateCourseCostPlans[0].CourseDuration.trainingModeId)[0].trainingModeShortName}</p>
                </div>
                <div className="flex flex-row gap-3 items-center">
                    <img

                        className="text-blue h-8 w-8"
                        src="/Icon_clock.svg" />
                
                    <p className="text-white text-xl font-normal">{data.CertificateCourseCostPlans[0].CourseDuration.courseDuration} {data.CertificateCourseCostPlans[0].CourseDuration.courseDurationType}</p>
                </div>
                <div className="flex flex-row gap-3 items-center">
                    <img

                        className="text-blue h-8 w-8"
                        src="/rubee_icon.svg" />

                    {
                        data.CertificateCourseCostPlans.length != 0 && data.CertificateCourseCostPlans[0].offerId != null ? <div className='flex flex-row'>
                            <p className="text-white text-xl font-normal">₹ {data.CertificateCourseCostPlans[0].planPrice}/-</p>
                            <p className="text-white text-xl line-through font-normal">₹ {data.CertificateCourseCostPlans[0].offerPrice}/-</p>
                        </div> : <p className="text-white text-xl font-normal">₹ {data.CertificateCourseCostPlans[0].planPrice}/-</p>
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
                    Entroll Now
                </button>
            </section>
<section className='mt-10'>
<h3 className='text-xl font-medium text-white'>Courses</h3>
<div className="w-full grid grid-cols-3 gap-6 mt-6">

{
data.CertificateCourseItems.map((e: any, index:any) => {
    return <CourseCard  showPrice={false} key={index} data={e.Courses[0]} />
  })
}




</div>
</section>
            <FormComponent type='Certificate' />

        </main>
    )
}
