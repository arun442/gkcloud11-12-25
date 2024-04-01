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


export default function CertificateDetailContainer({data}:{data:any}) {
    const [index, setIndex] = useState(0);
    return (
        <main className="w-full bg-primary_color flex-1 flex flex-col justify-start items-start">

            <div className="flex flex-row gap-1 items-center">
                <p className="text-blue text-base font-medium">Home</p>
                <ChevronRightIcon className="text-text_grey_one h-4 w-4" />
                <p className="text-blue text-base font-medium">Course</p>
                <ChevronRightIcon className="text-text_grey_one h-4 w-4" />
                <p className="text-text_grey_one text-base font-medium">Gen001</p>
            </div>

            <h1 className='font-semibold text-4xl mt-5 text-white'>{data.title}</h1>
            <section className='flex mt-10 flex-row gap-10'>
                <div className="flex flex-row gap-3 items-center">
                    <MagnifyingGlassIcon className="text-blue h-8 w-8" />
                    <p className="text-white text-xl font-normal">Gen002</p>
                </div>
                <div className="flex flex-row gap-3 items-center">
                    <MagnifyingGlassIcon className="text-blue h-8 w-8" />
                    <p className="text-white text-xl font-normal">ILO</p>
                </div>
                <div className="flex flex-row gap-3 items-center">
                    <MagnifyingGlassIcon className="text-blue h-8 w-8" />
                    <p className="text-white text-xl font-normal">4 days</p>
                </div>
                <div className="flex flex-row gap-3 items-center">
                    <MagnifyingGlassIcon className="text-blue h-8 w-8" />
                    <p className="text-white text-xl font-normal">11,500</p>
                </div>
            </section>
            <section className='flex flex-row items-start mt-20'>
                <div className=" mx-auto box-border border flex flex-row gap-3  items-center p-3  border-blue border-1 bg-dark_blue rounded-2xl">
                    <MagnifyingGlassIcon className="text-blue h-6 w-6" />
                    <p className="text-white text-sm font-normal">Download Course Content</p>
                </div>
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
                <div className={index != 1 ? "text-white font-normal" : "text-blue font-medium"} onClick={(e) => setIndex(1)}>
                    Schedules
                </div>
                <div className='h-6 w-[1px] rounded-lg bg-grey'></div>
                <div className={index != 1 ? "text-white font-normal" : "text-blue font-medium"} onClick={(e) => setIndex(1)}>
                    Audience
                </div>
                <div className='h-6 w-[1px] rounded-lg bg-grey'></div>
                <div className={index != 1 ? "text-white font-normal" : "text-blue font-medium"} onClick={(e) => setIndex(1)}>
                    Prerequisites
                </div>
                <div className='h-6 w-[1px] rounded-lg bg-grey'></div>
                <div className={index != 1 ? "text-white font-normal" : "text-blue font-medium"} onClick={(e) => setIndex(1)}>
                    Content
                </div>

            </section>
            <main className='mt-14'>
                <section>
                    <h2 className='font-semibold text-2xl text-white'>Course Description</h2>
                    <p className='mt-6 leading-6 font-normal text-sm text-white'>Unleash the power of Generative AI with our "Prompt Engineering" course! This course dives deep into the art and science of crafting effective prompts to unlock the full potential of these groundbreaking models. You'll learn how to write clear and concise instructions that guide the AI towards generating the desired results, whether it's creative text formats, compelling code, or innovative designs. Through hands-on exercises and industry best practices, you'll master the techniques to fine-tune your prompts, achieving exceptional outcomes in various AI applications.</p>
                </section>
            </main>

            <main className='mt-20  mx-auto box-border border w-[80%] py-14 px-24 border-blue border-1 bg-dark_blue rounded-2xl'>
                <section className='flex'>
                    <div className=" mx-auto box-border border flex flex-row w-96 items-center   border-blue border-1 bg-dark_blue rounded-lg">

                        <div className="py-3 w-1/2 box-border border flex flex-row items-center justify-center text-white text-lg font-semibold border-blue border-1 bg-primary_color rounded-lg">Individual</div>
                        <div className="py-3 w-1/2 box-border border-none flex flex-row items-center justify-center text-white text-lg font-normal border-blue border-1 bg-dark_blue rounded-lg">Corporate</div>
                    </div>

                </section>
                <h3 className='text-lg mt-8 text-white text-center'>Request More Information</h3>

                <section>
                    <div className='mt-8 flex flex-row gap-8'>
                        <input
                            id="search"
                            name="search"
                            type="text"
                            autoComplete="text"
                            placeholder='First Name'
                            required
                            className="block px-2 w-full border-1  rounded-lg bg-primary_color h-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:font-medium placeholder:text-gray-400 placeholder:pl-3 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                         <input
                            id="search"
                            name="search"
                            type="text"
                            autoComplete="text"
                            placeholder='Last Name'
                            required
                            className="block px-2 w-full border-1 rounded-lg bg-primary_color h-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:font-medium placeholder:text-gray-400 placeholder:pl-3 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </section>
            </main>


        </main>
    )
}
