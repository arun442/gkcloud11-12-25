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
import CourseScheduleComponent from './course_schedule_component';
import useTrainingMode from '@/hooks/training_mode_hook';
import { axiosPublic } from '@/common/axiosPublic';
import ErrorBoundary from '@/helpers/error_boundary';

import { toast } from "react-toastify";
import hideDuration from '@/helpers/hide_duration';
import LeadFormComponent from '../helpers/lead_form';
import LeadFormModel from '../helpers/LeadFromModel';


export default function CourseDetailContainer({ data }: { data: any }) {
    const { userData, } = useUserData();
    const { trainingData } = useTrainingMode();
    const [isLoading, setLoading] = useState(false);
 //   const params = useParams();
    const router = useRouter();
    const entroll = async () => {
        if (userData == null) {
            return toast.info("Before enrollment Please login");
        }
        try {
            if (isLoading) {
                return;
            }
            setLoading(true);
            const result = await axiosPrivate.post('/lms/add-course-enrollment', {
                "userId": userData.userId,
                "courseId": data.courseId,

                "courseCostPlanId": data.CourseCostPlans[0].courseCostPlanId,
                "enrollmentReference": "This is Test Enrollment",
                "amount": data.CourseCostPlans.length != 0 && data.CourseCostPlans[0].offerId != null && data.CourseCostPlans[0].offerPrice > 0 ? data.CourseCostPlans[0].offerPrice : data.CourseCostPlans[0].planPrice
            });


            setLoading(false);
            window.open(`${result.data.gateway.url}&encRequest=${result.data.gateway.encRequest}&access_code=${result.data.gateway.access_code}`,"_self");
            console.log(result.data);


        } catch (error: any) {
            setLoading(false);
            console.log(error);
            toast.error(error!.message);

        }
    }

    const handleDownload = async (courseId: any, courseName: any,data:any) => {
        try {
            console.log("broucherURL",data.broucherURL);
            let response;
            if(data.broucherURL){
            response = await axiosPublic.get(data.broucherURL, {

                 responseType: 'blob' // This tells Axios to expect a binary response
                });
                console.log("its from broucherURL");
            }else{
        response = await axiosPublic.get('/lms/course-download', {

                    params: {
                        courseId: courseId
                    }, responseType: 'blob' // This tells Axios to expect a binary response
                });
            }
           
            // Make a GET request to the API endpoint that serves the file
          

            // Create a blob object from the response data
            const blob = new Blob([response.data], { type: 'application/pdf' });

            // Create a URL for the blob object
            const url = window.URL.createObjectURL(blob);

            // Create a link element and click it to trigger the download
            const link = document.createElement('a');
            link.href = url;
            link.download = `${courseName}.pdf`; // Specify the filename here
            document.body.appendChild(link);
            link.click();

            // Clean up: remove the link and revoke the URL
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };
    const [index, setIndex] = useState(0);
    let [isOpen, setIsOpen] = useState(false)
    function closeModal(isDownloaded: any) {
        if (isDownloaded == true) {
            handleDownload(data.courseId, data.title,data)
        }
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }
    return (
        <main className="w-full bg-primary_color flex-1 flex flex-col justify-start items-start">
            <LeadFormModel data={{}} isOpen={isOpen} closeModal={closeModal} courseCode={data.title} courseName={data.courseCode} />
            <div className="flex flex-row gap-1 items-center">
                <p className="cursor-pointer text-blue text-base font-medium" onClick={(e) => {
                    router.back();
                    router.back();
                }}>Home</p>
                <ChevronRightIcon className="text-text_grey_one h-4 w-4" />
                <p className="cursor-pointer text-blue text-base font-medium" onClick={(e) => {
                    router.replace("/course");
                }}>Course</p>
                <ChevronRightIcon className="text-text_grey_one h-4 w-4" />
                <p className="cursor-pointer text-text_grey_one text-base font-medium">{data.courseCode}</p>
            </div>

            <h1 className='font-semibold text-4xl mt-5 text-white'>{data.title}</h1>
            <section className='flex mt-10 flex-row gap-10'>
                <div className="flex flex-row gap-3 items-center">
                    <img

                        className="text-blue h-8 w-8"
                        src="/category_icon.svg" />

                    <p className="text-white text-xl font-normal">{data.courseCode}</p>
                </div>
                <div className="flex flex-row gap-3 items-center">
                    <img

                        className="text-blue h-8 w-8"
                        src="/learning_mode.svg" />

                    <p className="text-white text-xl font-normal">{trainingData.filter((e) => e.trainingModeId == data.CourseCostPlans[0].trainingModeId).length == 0 ? "" : trainingData.filter((e) => e.trainingModeId == data.CourseCostPlans[0].trainingModeId)[0].trainingModeShortName}</p>
                </div>
                {
                    hideDuration(data.partnerId, data.categoryId) ? <></> : <div className="flex flex-row gap-3 items-center">
                        <img

                            className="text-blue h-8 w-8"
                            src="/Icon_clock.svg" />
                        <p className="text-white text-xl font-normal">{Math.round(data.CourseDurations[0].courseDuration)} {data.CourseDurations[0].courseDurationType}</p>
                    </div>
                }

                <div className="flex flex-row gap-3 items-center">
                    <img

                        className="text-blue h-8 w-8"
                        src="/rubee_icon.svg" />
                    {
                        data.CourseCostPlans.length != 0 && data.CourseCostPlans[0].offerId != null && data.CourseCostPlans[0].offerPrice > 0 ? <div className='flex flex-row'>
                            <p className="text-white text-xl font-normal">₹ {Math.round(data.CourseCostPlans[0].offerPrice)}/-</p>
                            <p className="text-white line-through text-xl font-normal">₹ {Math.round(data.CourseCostPlans[0].planPrice)}/-</p>
                        </div> : Math.round(data.CourseCostPlans[0].planPrice) < 1 ? <></> : <p className="text-white text-xl font-normal">₹ {Math.round(data.CourseCostPlans[0].planPrice)}/-</p>
                    }
                </div>
            </section>
            <section className='flex flex-row items-start mt-20'>
                <div onClick={(e) => {
                    if (userData) {
                        handleDownload(data.courseId, data.title,data)
                    } else {
                        openModal();
                    }
                }} className="cursor-pointer mx-auto box-border border flex flex-row gap-3  items-center p-3  border-blue border-1 bg-dark_blue rounded-2xl">
                    <img

                        className="text-blue h-6 w-6"
                        src="/pdf_icon.svg" />
                    <p className="text-white text-sm font-normal">Download Course Content</p>
                </div>
            </section>
            <section className='flex flex-row items-start mt-10'>
                <button onClick={(e) => {
                    entroll();
                }} className="flex w-full justify-center rounded bg-blue py-3 px-10 font-medium text-white ">
                    Enroll Now
                </button>
            </section>
            <section className={classNames("w-full cursor-pointer text-sm  flex flex-row mt-12 justify-center items-center  gap-7")}>
                <div className={index != 0 ? "text-white font-normal" : "text-blue font-medium"} onClick={(e) => setIndex(0)}>
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
            <ErrorBoundary>
           
                <main className='mt-6 w-full'>
                    {index == 0 ? <main>
                        <h2 className='font-semibold text-2xl text-white mb-3 text-justify'>Course Description</h2>
                        <section>

                            <p className='my-6 leading-6 font-normal text-sm text-white text-justify'>{data?.CourseContent?.courseContent?.course?.courseDetails?.description?.description ?? data?.CourseContent?.courseContent?.course?.courseDetails?.description ?? ""}</p>

                            {
                                (data?.CourseContent?.courseContent?.course?.courseDetails?.description?.descriptionList ?? []).map((e: any, index: any) =>(e?.title ?? e??"").length==0?<></>: <div key={index} className='w-full flex flex-row gap-2 '>
                                    <p key={index} className='leading-6 font-normal text-sm text-white'>{index + 1}.</p>
                                    <p key={index} className='leading-6 font-normal text-sm text-white flex-1 text-justify'>{e?.title ?? e}</p>
                                </div>)
                            }
                        </section>
                        {
                            (data?.CourseContent?.courseContent?.course?.courseDetails?.heighlights ?? []).length != 0 ? <section className='mt-10'>
                                <h2 className='font-semibold text-2xl text-white mb-6 text-justify'>Highlights</h2>
                                {
                                    (data?.CourseContent?.courseContent?.course?.courseDetails?.heighlights ?? []).map((e: any, index: any) => <p key={index} className='leading-6 font-normal text-sm text-white text-justify'>{index + 1}. {e}</p>)
                                }
                            </section> : <></>
                        }
                        {
                            (data?.CourseContent?.courseContent?.course?.courseDetails?.courseBenefitInclude ?? []).length != 0 ? <section className='mt-10'>
                                <h2 className='font-semibold text-2xl text-white mb-6 text-justify'>Course Benefit Include</h2>
                                {
                                    (data?.CourseContent?.courseContent?.course?.courseDetails?.courseBenefitInclude ?? []).map((e: any, index: any) => <div key={index} className='w-full flex flex-row gap-2 '>
                                        <p key={index} className='leading-6 font-normal text-sm text-white'>{index + 1}.</p>
                                        <p key={index} className='leading-6 font-normal text-sm text-white flex-1 text-justify'>{e}</p>
                                    </div>)
                                }
                            </section> : <></>
                        }

                    </main> :
                        index == 1 ? <main>
                            <h2 className='font-semibold text-2xl text-white mb-3 text-justify'>Objectives</h2>
                            <h2 className='font-normal text-sm text-white mb-6 text-justify'>{data?.CourseContent?.courseContent?.course?.courseDetails?.objectives?.description ?? ""}</h2>
                            {
                                (data?.CourseContent?.courseContent?.course?.courseDetails?.objectives?.objectiveList ?? []).length != 0 ? <section className=''>

                                    {
                                        (data?.CourseContent?.courseContent?.course?.courseDetails?.objectives?.objectiveList ?? []).map((e: any, index: any) =>(e??"").length==0?<></>: <div key={index} className='w-full flex flex-row gap-2 '>
                                            <p key={index} className='leading-6 font-normal text-sm text-white text-justify'>{index + 1}.</p>
                                            <p key={index} className='leading-6 font-normal text-sm text-white flex-1 text-justify'>{e}</p>
                                        </div>)
                                    }
                                </section> : <></>
                            }

                        </main> : index == 2 ? < CourseScheduleComponent courseId={data.courseId} /> : index == 3 ?
                            <main>
                                <h2 className='font-semibold text-2xl text-white mb-3 text-justify'>Audience</h2>
                                <h2 className='font-normal text-sm text-white mb-6 text-justify'>{data?.CourseContent?.courseContent?.course?.courseDetails?.audience?.description ?? ""}</h2>
                                {
                                    (data?.CourseContent?.courseContent?.course?.courseDetails?.audience?.audienceList ?? []).length != 0 ? <section className=''>

                                        {
                                            (data?.CourseContent?.courseContent?.course?.courseDetails?.audience?.audienceList ?? []).map((e: any, index: any) =>(e??"").length==0?<></>: <div key={index} className='w-full flex flex-row gap-2 '>
                                                <p key={index} className='leading-6 font-normal text-sm text-white text-justify'>{index + 1}.</p>
                                                <p key={index} className='leading-6 font-normal text-sm text-white flex-1 text-justify'>{e}</p>
                                            </div>)
                                        }
                                    </section> : <></>
                                }

                            </main>
                            : index == 4 ?
                                <main>
                                    <h2 className='font-semibold text-2xl text-white mb-3 text-justify'>Prerequisites</h2>
                                    <h2 className='font-normal text-sm text-white mb-6 text-justify'>{data?.CourseContent?.courseContent?.course?.courseDetails?.prerequisites?.description ?? ""}</h2>
                                    {
                                        (data?.CourseContent?.courseContent?.course?.courseDetails?.prerequisites?.PrerequisiteList ?? []).length != 0 ? <section className=''>

                                            {
                                                (data?.CourseContent?.courseContent?.course?.courseDetails?.prerequisites?.PrerequisiteList ?? []).map((e: any, index: any) => <div key={index} className='w-full flex flex-row gap-2 '>
                                                    <p key={index} className='leading-6 font-normal text-sm text-white text-justify'>{index + 1}.</p>
                                                    <p key={index} className='leading-6 font-normal text-sm text-white flex-1 text-justify'>{e}</p>
                                                </div>)
                                            }
                                        </section> : <></>
                                    }

                                </main>
                                : <main>

                                    {
                                        (data?.CourseContent?.courseContent?.course?.courseDetails?.content?.modules ?? []).map((module: any, index: any) =>(module?.name??"").length==0?<></>: <div key={module.moduleId} >
                                            <h3 className='font-semibold text-lg text-white mb-3 text-justify'>Module {index + 1}.{module?.name}</h3>
                                            <p>{module.moduleDescription}</p>
                                            <ul>
                                                {module.moduleItems ? module.moduleItems.map((item: any, itemIndex: any) =>(item?.moduleItemName??"").length==0?<></>: (
                                                    <li className='ml-6 flex gap-2 my-2' key={item.moduleItemId
                                                    }>


                                                        <button className='leading-6 font-normal text-sm text-white text-justify' >{itemIndex + 1}.{item.moduleItemName}</button>


                                                    </li>
                                                )) : module.details.map((item: any, itemIndex: any) =>(item.mode == "quiz" ? "Quiz" : item?.moduleItemName??"").length==0?<></>: (
                                                    <li className='ml-6 flex gap-2 my-2' key={item.id
                                                    }>


                                                        <button className='leading-6 font-normal text-sm text-white text-justify' >{itemIndex + 1}.{item.mode == "quiz" ? "Quiz" : item.moduleItemName}</button>


                                                    </li>
                                                ))}
                                            </ul>
                                        </div>)
                                    }</main>}
                </main>

            </ErrorBoundary>


            <FormComponent type='Course' referenceId={data.courseId} referenceCode={data.courseCode} requestDescription={data.title} />


        </main>
    )
}



