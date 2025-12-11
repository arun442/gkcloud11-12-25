"use client"
import React, { Fragment, useState, useEffect } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import Image from "next/image";
import TextTransition, { presets } from 'react-text-transition';
import { axiosPublic } from '@/common/axiosPublic';
import LeadFormModel from '../helpers/LeadFromModel';
import { cn } from "@/lib/utils";
import { Spotlight } from "../ui/spotlight";
import { WavyBackground } from "../ui/wavy-background";
import { Combobox } from '@headlessui/react'
import { useRouter } from 'next/router';
import useScreenSize from '@/hooks/size_hook';
import GradualSpacing from "@/components/ui/gradual-spacing";
import Marquee from '../helpers/Marquee';
import Meteors from "@/components/ui/meteors";
import TextReveal from "@/components/ui/text-reveal";
import Ripple from "@/components/ui/ripple";
import { Cover } from "@/components/ui/cover";
import { BorderBeam } from "@/components/ui/border-beam";
import { getCookie,hasCookie ,getCookies} from 'cookies-next';
import { HiArrowTopRightOnSquare } from "react-icons/hi2";
import { commonbasePath } from "../../common/constants";
import  Head from 'next/head'
import WordPullUp from "@/components/ui/word-pull-up";
const TEXTS = ['Artificial Intelligence', 'Multicloud', 'Cyber Security', 'Infrastructure', 'Tableau'];

export default function HomePageMainContainer() {
  const router = useRouter();
  const [index, setIndex] = React.useState(0);
  const [isOpen, setIsOpen] = useState(false);
const textanimation="Step into the Future of Learning with our tailored Cloud & AI Courses that drive Career Advancement and Innovation."

const screenSize=useScreenSize()

  React.useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      2000, // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);
  const [query, setQuery] = useState('')

  const [items, setItems] = useState([]);


  const basePath  = commonbasePath;

  const fetch = async () => {
    try {
      if (query.length == 0) {
        return setItems([]);
      }
      const result = await axiosPublic.get('/lms/search', {
        params: {
          "searchTerm": query,
        }
      });

      setItems(result.data.courses);
    } catch (error) {

    }
  }

  useEffect(() => {
    fetch()

console.log(getCookies());

  }, [query])
  function closeModal(isDownloaded: any) {

    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
  return (
    <>
 <Head>
        <title>Become an AI Expert: Top-Rated AI Training Courses Online | GK Cloud
        </title>
        <link rel="icon" href={`${commonbasePath}/favicon.ico`} />
        </Head>
    <main className="w-full  flex  flex-col md:flex-row " >
    <LeadFormModel isFromOffer={true} data={{}} isOpen={isOpen} closeModal={closeModal} courseCode={""} courseName={""} />

          {/* <Spotlight
        className="top-40 left-0  z-10"
        fill="red"

      /> */}
      {/* <WavyBackground className="w-full mx-auto pb-40 -z-10 sticky top-28 border-b-2"></WavyBackground> */}
      <section className='w-12/12 md:w-7/12  z-10 flex items-center    '>

         <div className=' z-10 w-full mt-5 justify-center text-[44px] md:text-5xl font-bold text-white text-start leading-[50px] lg:leading-[70px] '>
          
          <h1 className='text-md md:text-6xl' style={{lineHeight:"1.5"}} >

          Revolutionizing<br/><span style={{background:'linear-gradient(#8d49fd ,#7f56f3, #5691f3)',WebkitTextFillColor :"transparent",WebkitBackgroundClip:"text",backgroundClip:"text",color:"transparent"}}>Education</span> With AI
            </h1>

            <div style={{fontSize:"16px",fontWeight:"lighter",lineHeight:1.5,padding:"5px"}}>
            GK Cloud Solutions was established to bridge the gap in Technology Training, Services, and Project Consulting. We focus on delivering high-quality training and innovative solutions. Our aim is to empower businesses with the skills and expertise they need to thrive.</div>
            <div className='row flex mt-4 flex-row  gap-2'>
              <div className='flex justify-start items-center'>
              <button className="btn  active:translate-y-1 w-52  ">
  <span onClick={(e)=>{
        router.push("/course");
        sessionStorage.removeItem("navtab");

       }}>Get started</span>
</button>
              </div>
          
<div className='flex justify-start md:justify-center items-end ml-6 gap-3 cursor-pointer' onClick={(e)=>openModal()}>
  <span className='text-lg underline font-medium'>Join Our AI Course</span>

<HiArrowTopRightOnSquare style={{fontSize:"30px"}}/>



</div>

            </div>
           
            </div>
          

         

      </section>

      <section className=' w-12/12 md:w-5/12  flex justify-end items-start z-10 h-full p-5 sticky  '>
    
      <img src={`${basePath}/GKCS_Landing2.png`} ></img>

      </section>

      {/* <section className='w-full'>
        <Combobox >
          <div className="relative w-full">
            <div className="mt-20 lg:mt-16 w-full md:w-96 mx-auto flex flex-row  items-center justify-center relative">
              <span className="absolute h-5 w-5 left-0 top-4  inset-0 pl-3">  <MagnifyingGlassIcon className="h-5 w-5 text-blue items-center" /></span>
              <Combobox.Input
                className="block w-full border-1 pl-10 rounded-full bg-dark_blue py-[15px] text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:font-medium placeholder:text-gray-400 placeholder:pl-3  sm:text-sm sm:leading-6"
                placeholder='What do you want to learn?'

                onChange={(event) => setQuery(event.target.value)}
              />

            </div>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery('')}
            >
              <Combobox.Options className="bg-white-A700  absolute z-50 mt-1 max-h-80 w-full overflow-auto rounded-md bg-white  text-base  sm:text-sm">
                {items.length === 0 && query != '' ? (
                  <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                    Nothing found.
                  </div>
                ) : (
                  items.map((person: any) => (
                    <Combobox.Option
                      onClick={(e) => router.push(`/course/${person.courseId}`)}
                      key={person.courseId}
                      className="relative cursor-default py-2 pl-10 pr-4 text-gray-900"
                      value={person.courseId}
                    >
                      {({ selected, active }) => (
                        <>
                          <p
                            className={`block ${false ? 'font-medium' : 'font-normal'
                              }`}
                          >
                            {person.title}
                          </p>

                        </>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox>
      </section> */}

    </main>
    <div className='mt-10'>
<WordPullUp
      className="text-2xl font-normal mt-14 w-10/12 gap-2 text-white dark:text-white md:text-4xl md:leading-[4rem] flex flex-wrap justify-center mx-auto py-14"
words="Step into the Future of Learning with our tailored Cloud & AI Courses that drive Career Advancement and Innovation."   
 />
</div>
  
</>
  )
}

