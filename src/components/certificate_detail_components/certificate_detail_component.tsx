import React, { Fragment, useState,useEffect, useRef } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import TextTransition, { presets } from "react-text-transition";
import MainHeading from "../helpers/heading/main_heading";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { CalendarIcon } from "@heroicons/react/24/outline";
import CourseCard from "../helpers/card/course_card_component";
import classNames from "@/helpers/add_class";
import DurationDropdown from "./duration_dropdown_component";
import PartnerDropdown from "./partner_dropdown_component";
import TechnologyDropdown from "./technology_dropdown_component";
import FormComponent from "../course_detail_components/detail_form_component";
import useUserData from "@/hooks/userData";
import { useParams, useRouter } from "next/navigation";
import { axiosPrivate } from "@/common/axiosPrivate";
import useTrainingMode from "@/hooks/training_mode_hook";
import CertificateCourseCard from "../helpers/card/certificate_course_card_component";
import { toast } from "react-toastify";
import hideDuration from "@/helpers/hide_duration";
import { commonbasePath } from "../../common/constants";
import CryptoJS from 'crypto-js';
import { deleteCookie, hasCookie, setCookie, getCookie } from "cookies-next";
export default function CertificateDetailContainer({ data }: { data: any }) {
  const { trainingData } = useTrainingMode();
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const { userData } = useUserData();
  const [isLoading, setLoading] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [startTime_Date, setStartTime_Date] = useState<any>(null);
  const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || 'ENCRYPTION-KEY-DATA-20';
  const [timeSpent, setTimeSpent] = useState(0);
const courseref=useRef<HTMLDivElement|null>(null);
  useEffect(() => {
    // Set the start time when the component is mounted (first load)
    setStartTime(Date.now());
setStartTime_Date(new Date());
    console.log(data);
    
    

  }, [data]); // Empty dependency array ensures this effect runs only once on mount
  const decryptData = (encryptedData: any): any => {
    try {
      const decrypted = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
      return decrypted.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      console.error("Decryption error:", error);
      return "";
    }
  };

  const focuscourse=()=>{
    console.log(courseref.current);
    
    if (courseref.current) {
      courseref.current?.scrollIntoView({ behavior: "smooth",block:"center" });
    }
  }
  useEffect(() => {
    // Function to calculate time spent when the route changes
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
      if (startTime) {
        const endTime = Date.now();
        const timeSpentOnPage = (endTime - startTime) / 1000; // Time in seconds
        setTimeSpent((prevTime) => prevTime + timeSpentOnPage); // Store the time spent
        console.log(`Time spent on page: ${timeSpentOnPage} seconds in ${data.title}`,new Date().toLocaleTimeString('en-US'
          , {  
          hour
          :
          '2-digit'
          ,  
          minute
          :
          '2-digit'
          ,  
          second
          :
          '2-digit'
          ,  
          hour12
          : true
          // Toggle 12-hour or 24-hour format
          }));
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
      // console.log(tabclose);
      
            if (startTime) {
        const endTime = Date.now();
        const timeSpentOnPage = (endTime - startTime) / 1000; // Convert ms to seconds
        setTimeSpent((prevTime) => prevTime + timeSpentOnPage); // Store the time spent when the page is unloaded
        console.log(`Time spent on page: ${timeSpentOnPage} seconds in ${data.title},date:${startTime_Date.toLocaleDateString()},time:${startTime_Date.toLocaleTimeString()}`,startTime_Date,new Date(),new Date().toLocaleTimeString('en-US'
          , {  
          hour
          :
          '2-digit'
          ,  
          minute
          :
          '2-digit'
          ,  
          second
          :
          '2-digit'
          ,  
          hour12
          : true
          // Toggle 12-hour or 24-hour format
          }));     
        
          const decrypteduserdetail =getCookie("uid")? decryptData(getCookie("uid")):"";
          const decryptedreqform =getCookie("_req")? decryptData(getCookie("_req")):"";

            // console.log(JSON.parse(decrypteduserdetail).phone);
            // console.log(JSON.parse(decrypteduserdetail).email);
          
         
          // console.log(JSON.parse(decryptedreqform));

          console.log(getCookie("anonymous_id"));

          const result =  axiosPrivate.post("/lms/add-cookies", {
            userName:decrypteduserdetail!=""? JSON.parse(decrypteduserdetail).username:"",
            email:decrypteduserdetail!=""? JSON.parse(decrypteduserdetail).email:"",
            phoneNo:decrypteduserdetail!=""?  JSON.parse(decrypteduserdetail).phone:"",
            visitorId:getCookie("anonymous_id"),
            reqform_username:decryptedreqform!=""?JSON.parse(decryptedreqform).firstName:"",
            reqform_email: decryptedreqform!=""?JSON.parse(decryptedreqform).email:"",
            reqform_phoneno:decryptedreqform!=""?JSON.parse(decryptedreqform).phone:"",
            visited_course: data.title,
            visited_course_time:(Math.floor(timeSpentOnPage)>60?Math.floor(timeSpentOnPage / 60)+" min":Math.floor(timeSpentOnPage)+" sec"),
            startTime:startTime_Date,
            endTime:new Date(),
            partner: "",
            page_type: "Certificate",
            category: "",

          });
        }
       
          

    };
  }, [startTime]);
  const entroll = async () => {
    console.log(data.CertificateCourseCostPlans.length);

    if (userData == null) {
      return toast.info("Before enrollment Please login");
    }
    try {
      if (isLoading) {
        return;
      }
      
      setLoading(true);
      const result = await axiosPrivate.post( 
        "/lms/add-certificate-course-enrollment",
        {
          userId: userData.userId,
          certificateCourseId: data.certificateCourseId,
          certificateCourseCostPlanId:
            data.CertificateCourseCostPlans[0].certificateCourseCostPlanId,
          enrollmentReference: "Certificate Course",
          amount:
            data.CertificateCourseCostPlans.length != 0 &&
            data.CertificateCourseCostPlans[0].offerId != null &&
            data.CertificateCourseCostPlans[0].offerPrice > 0
              ? data.CertificateCourseCostPlans[0].offerPrice
              : data.CertificateCourseCostPlans[0].planPrice,
        }
      );
 
      setLoading(false);
      window.open(
        `${result.data.gateway.url}&encRequest=${result.data.gateway.encRequest}&access_code=${result.data.gateway.access_code}`,
        "_self","noopener,noreferrer"
      );
    } catch (error: any) {
      setLoading(false);
 
      toast.error(error!.message);
    }
  };
  return (
    <main className="w-full bg-primary_color flex-1 flex flex-col justify-start items-start">
      <div className="flex mt-4 flex-row gap-1 items-center">
        <p
          className="hover:text-blue cursor-pointer text-blue text-base font-medium"
          onClick={(e) => {
            router.replace("/");
          }}
        >
          Home
        </p>
        <ChevronRightIcon className="text-text_grey_one h-4 w-4" />
        <p
          className="hover:text-blue cursor-pointer text-blue text-base font-medium"
          onClick={(e) => {
            router.replace("/course");
          }}
        >
          Certification
        </p>
        <ChevronRightIcon className="text-text_grey_one h-4 w-4" />
        <p className="hover:text-blue cursor-pointer text-text_grey_one text-base font-medium">
          {data.title}
        </p>
      </div>
 
  <div className="flex flex-col md:flex-row md:h-200 w-full md:w-full justify-around rounded-2xl pb-3 pt-3 mt-5 bg-white">
  <div className="ml-2">
      <h1 className="font-semibold text-4xl mt-5 text-black">{data.title}</h1>
      <p className="mt-2 leading-6 font-normal text-[16px] text-black">
        {data?.description ?? ""}
      </p>
      <section className="flex mt-10 flex-row flex-wrap gap-10">
        <div className="flex flex-row gap-3 items-center">
          <img
            alt="learning mode"
            className="text-blue h-8 w-8"
            src={`${commonbasePath}/learning_mode.svg`}
          />
          <p className="text-black text-xl font-normal bg-[#e4e4e4] hover:cursor-pointer hover:bg-primary_color hover:text-white p-2 rounded-lg shadow-md hover:shadow-inner" onClick={(e)=>{focuscourse()}}>
            {data.CertificateCourseCostPlans[0].CertificateCourseItems.length}{" "}
            Courses
          </p>
        </div>
        {hideDuration(data.partnerId, data.categoryId) ? (
          <></>
        ) : (
          <div className="flex flex-row gap-3 items-center">
            <img
              alt="clock icon"
              className="text-blue h-8 w-8"
              src={`${commonbasePath}/Icon_clock.svg`}
            />
 
            <p className="text-white text-xl font-normal">
              {Math.round(
                data.CertificateCourseCostPlans[0].CertificateCourseItems.reduce(
                  (accumulator: any, currentValue: any) =>
                    parseFloat(
                      currentValue?.CourseDuration?.courseDuration ?? "0.0"
                    ) + accumulator,
                  0
                )
              )}{" "}
              {"hours"}
            </p>
          </div>
        )}
 
        {/* <div className="flex flex-row gap-3 items-center">
          <img
            alt="rubee icon"
            className="text-blue h-8 w-8"
            src={`${commonbasePath}/rubee_icon.svg`}
          />
 
          {data.CertificateCourseCostPlans.length != 0 &&
          data.CertificateCourseCostPlans[0].offerId != null &&
          data.CertificateCourseCostPlans[0].offerPrice > 0 ? (
            <div className="flex flex-row">
              <p className="text-white text-xl font-normal">
                ₹ {Math.round(data.CertificateCourseCostPlans[0].offerPrice)}/-
              </p>
              <p className="text-white text-xl line-through font-normal">
                ₹ {Math.round(data.CertificateCourseCostPlans[0].planPrice)}/-
              </p>
            </div>
          ) : Math.round(data.CertificateCourseCostPlans[0].planPrice) < 1 ? (
            <></>
          ) : (
            <p className="text-white text-xl font-normal">
              ₹ {Math.round(data.CertificateCourseCostPlans[0].planPrice)}/-
            </p>
          )}
        </div> */}
      </section>
      {/* <section className='flex flex-row items-start mt-20'>
                <div className=" mx-auto box-border border flex flex-row gap-3  items-center p-3  border-blue border-1 bg-dark_blue rounded-2xl">
                    <img
 
                        className="text-blue h-6 w-6"
                        src="/pdf_icon.svg" />
                    <p className="text-white text-sm font-normal">Download Course Content</p>
                </div>
            </section> */}
 
      <section className="flex flex-row items-start mt-12">
        <button
          onClick={(e) => {
            entroll();
          }}
          className="flex justify-center rounded bg-blue py-3 px-10 font-medium text-white "
        >
          Enroll Now
        </button>
      </section>
      </div>
 
      <div className="w-full md:w-auto  mt-5 md:mt-0 mb-10 z-0 justify-end items-end">
      <FormComponent
        type="Certificate"
        referenceId={data.certificateCourseId}
        referenceCode={data.certificateCourseId}
        requestDescription={data.title}
      />
      </div>
  </div>
     
 
 
 
      <section className="mt-10">
        <h2 className="text-xl font-medium text-white">Courses</h2>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mt-6" ref={courseref}>
          {data.CertificateCourseCostPlans[0].CertificateCourseItems.map(
            (e: any, index: any) => {
              return (
                <CertificateCourseCard showPrice={false} key={index} data={e} />
              );
            }
          )}
        </div>
      </section>
     
    </main>
  );
}
 
 