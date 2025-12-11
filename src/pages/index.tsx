import Head from 'next/head';
import { useState,useEffect } from 'react';
import Header from "@/components/helpers/header";
import Image from "next/image";
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import HomePageMainContainer from "@/components/home_components/home_container";
import ExploreCourseComponent from "@/components/home_components/explore_course_compoent";
import ClassesComponent from "@/components/home_components/classes_component";
import WhyUsComponent from "@/components/home_components/why_us_component";
import UnqueOfferComponent from "@/components/home_components/unique_offer_components";
import OurClientComponent from "@/components/home_components/our_client_component";
import TestimonialComponent from "@/components/home_components/testimonial_component";
import NewsLetterComponent from "@/components/home_components/news_letter_component";
import Footer from "@/components/helpers/footer";
import CookieConsent from "@/components/helpers/cookie";
import Marquee from "@/components/helpers/Marquee";
import Ai_button from '@/components/helpers/ai_bot_button';
import Navbar from '@/components/helpers/header/Navbar';
import { Stu } from '@/components/home_components/Stu_component';
import LeadFormModel from '@/components/helpers/LeadFromModel';
import { FaGraduationCap } from "react-icons/fa";
import Certifiedexcellence from '@/components/home_components/Certifiedexcellence';
import { BrowserRouter as Router} from "react-router-dom";
import { commonbasePath } from '@/common/constants';

export default function Home() {
 

 
  return (
    
    <div className="w-full ">
        <Marquee/>
{/* <div className='  flex justify-center gap-2 items-center py-1 bg-gradient-to-b from-[#8d49fd] to-[#5691f3] w-full text-center cursor-pointer sticky top-0 z-20 text-white font-medium ' onClick={(e)=>openModal()}>
     <FaGraduationCap style={{color:"black",fontSize:"25px"}}/>
     Join Our AI Revolution: Let’s Make Sure Robots Know Who’s Boss! <span className='text-[#FFF302] font-semibold'>Enroll Now and
Become a Tech Trailblazer!
</span> 
</div> */}
      <div className=' sticky md:top-[42px] z-20 top-14  w-full lg:max-w-7xl lg:mx-auto h-auto md:px-14 lg:px-20 xl:px-0 '>
      <Header />
      </div>
      <main className={`relative w-full lg:max-w-7xl lg:mx-auto h-auto px-5 md:px-14 lg:px-20 xl:px-0 flex flex-col`}>
        {/* <div className="absolute inset-0 -z-10 bg-cover bg-center h-screen" style={{ backgroundImage: 'url("/bg_dot.png")', opacity: '0.1' }}></div> */}
        <div className="absolute inset-0 -z-10 bg-cover bg-center h-screen" ></div>

        <HomePageMainContainer />
        <Certifiedexcellence/>

        <Stu/>
        <ExploreCourseComponent />
        <ClassesComponent />
        <WhyUsComponent  />
        <UnqueOfferComponent />
        <OurClientComponent />
        <TestimonialComponent />
        {/* <NewsLetterComponent /> */}
        <Footer />
        <CookieConsent />
        {/* <Ai_button/> */}

      </main>
    </div>
  );
}
