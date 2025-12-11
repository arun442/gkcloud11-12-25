import Header from "@/components/helpers/header";
import Image from "next/image";
import React, { Fragment, useState,useEffect } from "react";import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Footer from "@/components/helpers/footer";
import WebinarContainer from "@/components/webinar_components/webinar_container";
import { commonbasePath } from "@/common/constants";
import FormComponent from "@/components/course_detail_components/detail_form_component";
import { IoTime } from "react-icons/io5";
import { IoIosPricetags } from "react-icons/io";
import Webinar_form from "@/components/helpers/webinar_form";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { deleteCookie, hasCookie, setCookie, getCookie } from "cookies-next";
import { axiosPrivate } from "@/common/axiosPrivate";
import { FaCalendarDays } from "react-icons/fa6";
import CryptoJS from 'crypto-js';

export default function Webinar() {
  const [startTime, setStartTime] = useState(0);
  const [startTime_Date, setStartTime_Date] = useState<any>(null);
  const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || 'ENCRYPTION-KEY-DATA-20';
  const [timeSpent, setTimeSpent] = useState(0);
  const router=useRouter();

  useEffect(() => {
    // Set the start time when the component is mounted (first load)
    setStartTime(Date.now());
setStartTime_Date(new Date());
    
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const decryptData = (encryptedData: any): any => {
    try {
      const decrypted = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
      return decrypted.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      console.error("Decryption error:", error);
      return "";
    }
  };
  useEffect(() => {
    // Function to calculate time spent when the route changes
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
      if (startTime) {
        const endTime = Date.now();
        const timeSpentOnPage = (endTime - startTime) / 1000; // Time in seconds
        setTimeSpent((prevTime) => prevTime + timeSpentOnPage); // Store the time spent
       
          setStartTime(0);
                    console.log(Date.now());
          
      }
    }else if (document.visibilityState === 'visible') {
      // Reset the start time when the user returns
      setStartTime(Date.now());
      setStartTime_Date(new Date());
    }
  }

    // Listen to route changes to calculate the time spent when the user navigates away
    document.addEventListener('visibilitychange', handleVisibilityChange);
    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);

            if (startTime>0) {
        const endTime = Date.now();
        const timeSpentOnPage = (endTime - startTime) / 1000; // Convert ms to seconds
        setTimeSpent((prevTime) => prevTime + timeSpentOnPage); // Store the time spent when the page is unloaded
         
        
          const decrypteduserdetail =getCookie("uid")? decryptData(getCookie("uid")):"";
          const decryptedreqform =getCookie("_req")? decryptData(getCookie("_req")):"";

            // console.log(JSON.parse(decrypteduserdetail).phone);
            // console.log(JSON.parse(decrypteduserdetail).email);
          
         
          // console.log(JSON.parse(decryptedreqform));


          const result =  axiosPrivate.post("/lms/add-cookies", {
            userName:decrypteduserdetail!=""? JSON.parse(decrypteduserdetail).username:"",
            email:decrypteduserdetail!=""? JSON.parse(decrypteduserdetail).email:"",
            phoneNo:decrypteduserdetail!=""?  JSON.parse(decrypteduserdetail).phone:"",
            visitorId:getCookie("anonymous_id"),
            reqform_username:decryptedreqform!=""?JSON.parse(decryptedreqform).firstName:"",
            reqform_email: decryptedreqform!=""?JSON.parse(decryptedreqform).email:"",
            reqform_phoneno:decryptedreqform!=""?JSON.parse(decryptedreqform).phone:"",
            visited_course: "Careers in AI",
            visited_course_time:(Math.floor(timeSpentOnPage)>60?Math.floor(timeSpentOnPage / 60)+" min":Math.floor(timeSpentOnPage)+" sec"),
            startTime:startTime_Date,
            endTime:new Date(),
            partner: "",
            page_type: "webinar",
            category: "",

          });
        }
       
          

    };
  }, [startTime]);
  return (
    <main
      className={`relative w-full lg:max-w-7xl lg:mx-auto h-auto px-5 md:px-14 lg:px-20 xl:px-0 flex flex-col`}
    >
   <Header/>
   <div className="flex flex-row gap-1 h-10 mt-0 items-center z-10 bg-primary_color w-full">
        <p
          className="hover:text-blue cursor-pointer text-blue text-base font-medium"
          onClick={() => router.push("/")}
        >
          Home
        </p>
        <ChevronRightIcon className="text-text_grey_one h-4 w-4" />
       
        <p className="hover:text-blue cursor-pointer text-text_grey_one text-base font-medium">
          Webinar
        </p>
      </div>
   <div className="flex flex-col lg:flex-row xl:flex-row md:h-200 w-full md:w-full rounded-2xl pb-3 pt-3 mt-1 pr-5 md:pr-10 bg-white">
 
        <div className="flex-grow">
        <div className="flex flex-row gap-1 mx-4 items-center ml-6 md:ml-12">
        <div className="h-fit p-2 rounded-xl">

        <img src={`${commonbasePath}/video-lesson.png`} style={{height:"24px"}}/>
        </div>

<div className=" h-fit px-2 py-1  rounded-xl text-base font-semibold  text-primary_color opacity-70">
  Free Webinar
</div>
<div className="h-fit w-10 p-1 rounded-xl text-primary_color text-base font-semibold   text-center" >
  AI
</div>
    </div>
          <h1 className="font-medium text-2xl md:text-4xl mt-2 md:mt-5 ml-6 md:ml-12 text-black">
          Careers in AI :<br/>
          Building Your Path to Success
          </h1>
          <p className="ml-6 md:ml-12 text-sm md:text-base text-black mt-4 md:mt-10 opacity-60 line-clamp-5 text-justify">
      Explore the exciting world of AI careers, including the essential skills, certifications, and roles that are shaping the future. Whether you’re a beginner or looking to advance your career, this session will guide you on how to stand out in this rapidly growing field.
          </p>
          {/* <div className="ml-6 md:ml-12  gap-3 flex flex-col text-sm md:text-lg text-black mt-4 md:mt-8  line-clamp-5 text-justify">
            <span>Targeted audience:</span>
          <span className="text-black opacity-80">1st year to Final year students</span> 
          <div>
          <span className="text-primary_color text-xl font-semibold ">AI</span> ,<span className="text-primary_color text-xl font-semibold ">CSE</span>, <span className="text-primary_color text-xl font-semibold ">IT background</span> </div>

          </div> */}
          <section className="flex mt-10 md:mt-16 ml-6 md:ml-12 flex-row flex-wrap md:gap-10 xl:gap-10 items-center   ">
         
         {/* <div className="flex border-y-4 border-primary_color h-fit py-3 border-double items-center">
         <FaCalendarDays style={{fontSize:"20px"}} />
         &nbsp;
Wednesday
         </div>
         <div className="flex flex-col items-center ">
<span className="text-sm">
  Nov
</span>
<span className="text-7xl">
  27
</span>
<span className="text-sm">
  2024
</span>
         </div>
         <div className="flex border-y-4 border-primary_color h-fit py-3 border-double items-center">
         <IoTime  style={{fontSize:"20px"}} />
         &nbsp;
 At 8:00 PM
         </div>
         <div className="flex flex-row items-center justify-center gap-2 text-xlpx-2 items-center">
         <IoIosPricetags  style={{fontSize:"30px"}} />
<span>FREE</span>
          </div> */}
        <div className="flex flex-row px-4 h-fit items-center gap-2">
          <FaCalendarDays style={{fontSize:"40px"}} />
          <span className="text-base text-start">
          Wed, Nov 27, 2024
          </span>
       
          </div>

          <div className="flex flex-row items-center justify-center gap-2 text-xl md:border-x-2 py-5 md:py-0 xl:py-0 xl:px-10 md:px-10  border-primary_color">
          
         <IoTime  style={{fontSize:"40px"}} />
         <div className="flex flex-col">
            <span className="text-lg">8:00 PM</span>
            </div>
          </div>

          <div className="flex flex-row items-center justify-center gap-2 text-xlpx-2">
         <IoIosPricetags  style={{fontSize:"30px"}} />
<span>FREE</span>
          </div>


            
 
          </section>
 
 
         
         
        </div>
 
        <div className="w-full md:w-auto pl-6 md:pl-12 mt-5 md:mt-0 mb-10 z-0">
          <Webinar_form/>
        </div>
      </div>
      <div className="pt-1 w-full mt-10 h-auto space-y-5">
      <h1 className="text-white text-center text-3xl">Featured Presenter</h1>
 
      <div className="w-auto flex md:flex-row lg:flex-row flex-col gap-10 space-y-5 mt-3">
        <div className="text-center gap-3 flex flex-col" >
        <img
          src={`${commonbasePath}/presenter.jpg`}
          alt="presenter"
          height={290}
          width={220}
          className=" rounded-full w-full"
        
        />
                  <div className="text-white w-full mt-4 text-xl">AISHWAR V</div>
        </div>
     

        <div className="space-y-5 flex items-center leading-7">
          <div className="grid grid-cols-1 gap-8">
          <p className="text-white opacity-70 text-justify">With a robust career spanning over 7 years, He is a highly skilled Instructor and Technical Consultant passionate about simplifying complex technologies. Adept at delivering comprehensive training in Python, JavaScript, Java, C++ and other modern languages, He is also a specialist in Generative AI, Data Science and Web Development. His hands-on, practical approach to teaching ensures learners not only gain knowledge but also the confidence to apply it effectively.</p>
          </div>
        </div>
      </div>
    </div>
  <Footer/>
    </main>
  );
}
