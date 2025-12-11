"use client";
 
import React, { Fragment, useEffect, useState,useRef } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import TextTransition, { presets } from "react-text-transition";
import MainHeading from "../helpers/heading/main_heading";
import { MagnifyingGlassIcon, CalendarIcon } from "@heroicons/react/24/outline";
import CourseCard from "../helpers/card/course_card_component";
import classNames from "@/helpers/add_class";
import DurationDropdown from "./duration_dropdown_component";
import PartnerDropdown from "./partner_dropdown_component";
import TechnologyDropdown from "./technology_dropdown_component";
import FormComponent from "./detail_form_component";
import { TiTime } from "react-icons/ti";
import { IoTimer } from "react-icons/io5";
import { IoIosTimer } from "react-icons/io";
import { FaUsers } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi2";

import useUserData from "@/hooks/userData";
import { axiosPrivate } from "@/common/axiosPrivate";
// import { useParams, useRouter } from "next/navigation";
import { useRouter } from 'next/router';
import CourseScheduleComponent from "./course_schedule_component";
import useTrainingMode from "@/hooks/training_mode_hook";
import { axiosPublic } from "@/common/axiosPublic";
import ErrorBoundary from "@/helpers/error_boundary";
import { toast } from "react-toastify";
import hideDuration from "@/helpers/hide_duration";
import LeadFormModel from "../helpers/LeadFromModel";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FcReading } from "react-icons/fc";
import { LiaArrowAltCircleRight } from "react-icons/lia";
import Content from "./Coursecontent";
import Marquee from "react-fast-marquee";
import accenture from "../../../public/logo/log/accenture.png";
import amazon from "../../../public/logo/log/amazon.png";
import cognizant from "../../../public/logo/log/cognizant.png";
import deloitte from "../../../public/logo/log/deloitte.png";
import dxc from "../../../public/logo/log/dxc.png";
import flipkart from "../../../public/logo/log/flipkart.png";
import google from "../../../public/logo/log/google.png";
import hcl from "../../../public/logo/log/hcl.png";
import infosys from "../../../public/logo/log/infosys.png";
import paypal from "../../../public/logo/log/paypal.png";
import salesforce from "../../../public/logo/log/salesforce.png";
import walmart from "../../../public/logo/log/walmart.png";
import BookFormComponent from "../helpers/Book-form";
import { commonbasePath } from "../../common/constants";
import Rating from "@mui/material/Rating";
import CryptoJS from 'crypto-js';
import { deleteCookie, hasCookie, setCookie, getCookie } from "cookies-next";
import {
  Accordion as NextAccordion,
  AccordionItem,
} from "@nextui-org/accordion";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import imageHelper from "@/common/image_helper";
import axios from "axios";
export default function CourseDetailContainer({ data ,popup}: { data: any,popup:any }) {
  const { userData } = useUserData();
  const { trainingData } = useTrainingMode();
  const [isLoading, setLoading] = useState(false);
  const [jobRoles, setJobRoles] = useState<any[]>([]);
  const router = useRouter();
  const [startTime, setStartTime] = useState(0);
  const [startTime_Date, setStartTime_Date] = useState<any>(null);
  const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || 'ENCRYPTION-KEY-DATA-20';
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const accordionref = useRef<Array<HTMLDivElement | null>>([]); 
      const [timeSpent, setTimeSpent] = useState(0);
  const [openModules, setOpenModules] = useState<{ [key: string]: boolean }>({});
  const [openAccordionIndex, setOpenAccordionIndex] = useState<number | null>(
    null
  );
  const openAndScrollToAccordion = (index: number) => {
    console.log(accordionref.current);
    
    setOpenAccordion(index); // Open the clicked accordion
    const targetRef = accordionref.current[index];
    if (targetRef) {
      targetRef.getAttribute("aria-expanded") === "true";

      targetRef.scrollIntoView({ behavior: "smooth" });
       }
  };
 
  const toggleModule = (moduleId: string) => {
    console.log(moduleId);

    setOpenModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };
  useEffect(() => {
 

    const fetchJobRoles = async () => {
      try {
        const result = await axiosPublic.get("/lms/job-roles");
        setJobRoles(result.data.jobRoles);
      } catch (error) {
        console.error("Error fetching job roles:", error);
      }
    };
 
    fetchJobRoles();
  }, []);

  
  useEffect(() => {
    setOpenAccordionIndex(null)

    // Set the start time when the component is mounted (first load)
    setStartTime(Date.now());
setStartTime_Date(new Date());
    
    

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
        console.log(`Time spent on page: ${timeSpentOnPage} seconds in ${data.title},${data.Partner.partnerName},date:${startTime_Date.toLocaleDateString()},time:${startTime_Date.toLocaleTimeString()}`,startTime_Date,new Date(),new Date().toLocaleTimeString('en-US'
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
            partner: data.Partner.partnerName,
            page_type: "Course",
            category: data.CourseCategory.categoryName,

          });
        }
       
          

    };
  }, [startTime]);
 
  const enroll = async () => {
    console.log(data.CourseCostPlans.length);

    if (userData == null) {
      return toast.info("Before enrollment Please login");
    }
    try {
   
      setLoading(true);
      const result = await axiosPrivate.post("/lms/add-course-enrollment", {
            // const result = await axios.post("https://stu.globalknowledgetech.com:1100/payments/initiate", {
        userId: userData.userId,
        courseId: data.courseId,
        courseCostPlanId: data.CourseCostPlans[0].courseCostPlanId,
        enrollmentReference: "Test Enrollment 1",
  application_code: "GKCS",
        amount: 
          data.CourseCostPlans.length != 0 &&
          data.CourseCostPlans[0].offerPrice > 0
            ? data.CourseCostPlans[0].offerPrice
            : data.CourseCostPlans[0].planPrice,
      });
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
  
  // const enroll = async () => {
  //   console.log(data.CourseCostPlans.length);

  //   if (userData == null) {
  //     return toast.info("Before enrollment Please login");
  //   }
  //   try {
   
  //     setLoading(true);
  //     const result = await axiosPrivate.post("/lms/add-course-enrollment", {
  //       userId: userData.userId,
  //       courseId: data.courseId,
  //       courseCostPlanId: data.CourseCostPlans[0].courseCostPlanId,
  //       enrollmentReference: "This is Test Enrollment",
  //       amount:
  //         data.CourseCostPlans.length != 0 &&
  //         data.CourseCostPlans[0].offerPrice > 0
  //           ? data.CourseCostPlans[0].offerPrice
  //           : data.CourseCostPlans[0].planPrice,
  //     });
 
  //     setLoading(false);
  //     window.open(
  //       `${result.data.gateway.url}&encRequest=${result.data.gateway.encRequest}&access_code=${result.data.gateway.access_code}`,
  //       "_self","noopener,noreferrer"
  //     );
  //   } catch (error: any) {
  //     setLoading(false);
  //     toast.error(error!.message);
  //   }
  // };
  const handleDownload = async (courseId: any, courseName: any, data: any) => {
    try {
      let response;
      if (data.broucherURL) {
        response = await axiosPublic.get(data.broucherURL, {
          responseType: "blob",
        });
      } else {
        response = await axiosPublic.get("/lms/course-download", {
          params: { courseId: courseId },
          responseType: "blob",
        });
      }
 
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${courseName}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };
 
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = (isDownloaded: any) => {
    if (isDownloaded == true) {
      handleDownload(data.courseId, data.title, data);
    }
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };
 
  const JobRoleCards: React.FC<{
    selectedCourseId: number;
    jobRoles: any[];
  }> = ({ selectedCourseId, jobRoles }) => {
    const filteredJobRoles = jobRoles.filter(
      (job) => job.courseId === selectedCourseId
    );
 
    return (
      <>
        <div className="flex flex-col items-center w-full">
          <div className="flex w-full flex-col gap-5  lg:flex-row xl:flex-row justify-center items-center">
            {filteredJobRoles.slice(0, 3).map((job, index) => (
              <section key={job.jobId} className="mt-0 w-full lg:w-1/3 xl:w-1/3">
                <div className="mb-0 flex bg-white rounded-lg">
                  <div className="mt-0 text-center pl-2">
                    <p className="text-blue text-9xl">{index + 1}</p>
                  </div>
                  <div className="p-2 m-auto">
                    <span className="font-semibold text-md text-black mb-2">
                      {job.jobRole}
                    </span>
                    <p className="leading-6 font-normal text-xs text-black text-justify ">
                      Average Salary : {job.jobAverageSalary}
                    </p>
                    <p className="leading-6 font-normal text-xs text-black text-justify">
                      Current Openings : 1{job.currentOpenings}+
                    </p>
                  </div>
                </div>
              </section>
            ))}
          </div>
 
          <div className="flex flex-col md:justify-center lg:gap-10 lg:flex-row xl:flex-row w-full">
            {filteredJobRoles.slice(3, 5).map((job, index) => (
              <section key={job.jobId} className="mt-5 w-full md:w-auto">
                <div className="mb-4 flex bg-white rounded-lg">
                  <div className="mt-3 text-center pl-2">
                    <p className="text-blue text-9xl">{index + 4}</p>
                  </div>
                  <div className="p-2 m-auto">
                    <span className="font-semibold text-md text-black mb-2">
                      {job.jobRole}
                    </span>
                    <p className="leading-6 font-normal text-xs text-black text-justify">
                      Average Salary : {job.jobAverageSalary}
                    </p>
                    <p className="leading-6 font-normal text-xs text-black text-justify">
                      Current Openings : 1{job.currentOpenings}+
                    </p>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
      </>
    );
  };
  const scienceItems =
  data?.CourseContent?.courseContent?.course?.courseDetails?.iScience || [];

const modulesRef = useRef<HTMLDivElement>(null);

const handleKnowMoreClick = (index: number) => {
  setOpenAccordionIndex(index === openAccordionIndex ? null : index);
  setTimeout(() => {
    if (modulesRef.current) {
      const elementRect = modulesRef.current.getBoundingClientRect();
      const scrollPosition =index>2?
        window.scrollY +
        elementRect.top -
        (window.innerHeight / 1.5 - elementRect.height / 1.5):window.scrollY+elementRect.top ;

      window.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
    }
  }, 100);
  // if (modulesRef.current) {
  //   modulesRef.current.scrollIntoView({
  //     behavior: "smooth",
  //     block: "start",
  //   });
  // }
};
  const handleAccordionToggle = (index: number) => {
    setOpenAccordionIndex((prev) => (prev === index ? null : index));
  };
  return (
    <main className="w-full bg-primary_color flex-1 flex flex-col justify-start items-start">
      <LeadFormModel
        isFromOffer={false}
        data={{}}
        isOpen={isOpen}
        closeModal={closeModal}
        courseCode={data.title}
        courseName={data.courseCode}
      />
      {popup?null:
      <div className="flex flex-row gap-1 h-20 mt-0 items-center z-10 bg-primary_color w-full">
        <p
          className="hover:text-blue cursor-pointer text-blue text-base font-medium"
          onClick={() => router.replace("/")}
        >
          Home
        </p>
        <ChevronRightIcon className="text-text_grey_one h-4 w-4" />
        <p
          className="hover:text-blue cursor-pointer text-blue text-base font-medium"
          onClick={() => {
            router.replace("/course");
            sessionStorage.removeItem("navtab");
          }}
        >
          Course
        </p>
        <ChevronRightIcon className="text-text_grey_one h-4 w-4" />
        <p className="hover:text-blue cursor-pointer text-text_grey_one text-base font-medium">
          {data.title}
        </p>
      </div>}
 
      <div className="flex flex-col lg:flex-row xl:flex-row md:h-200 w-full md:w-full rounded-2xl pb-3 pt-3 mt-5 pr-5 md:pr-10 bg-white">
        <div className="flex-grow">
          <h1 className="font-small text-2xl md:text-4xl mt-2 md:mt-5 ml-6 md:ml-12 text-black">
            {data.title}
          </h1>
          <p className="ml-6 md:ml-12 text-sm md:text-lg text-black mt-4 md:mt-10 opacity-60 line-clamp-5 text-justify">
            {data?.CourseContent?.courseContent?.course?.courseDetails
              ?.description?.description ?? ""}
          </p>

          <section className="flex mt-6 md:mt-10 ml-6 md:ml-12 flex-row flex-wrap md:flex-nowrap gap-5 md:gap-10">
            <div className="flex flex-row gap-2 md:gap-3 items-center">
              <img
                alt="learning mode"
                className="text-blue h-6 md:h-8 w-6 md:w-8"
                src={`${commonbasePath}/learning_mode.svg`}
              />
              <p className="text-black text-sm md:text-xl font-normal">
                {trainingData.filter(
                  (e) =>
                    e.trainingModeId === data.CourseCostPlans[0].trainingModeId
                ).length === 0
                  ? ""
                  : trainingData.filter(
                      (e) =>
                        e.trainingModeId ===
                        data.CourseCostPlans[0].trainingModeId
                    )[0].trainingModeShortName}
              </p>
            </div>  
            {!hideDuration(data.partnerId, data.categoryId) && (
              <div className="flex flex-row gap-2 md:gap-3 items-center">
                <img
                  alt="clock icon"
                  className="text-blue h-6 md:h-8 w-6 md:w-8"
                  src={`${commonbasePath}/Icon_clock.svg`}
                />
                <p className="text-black text-sm md:text-xl font-normal">
                  {Math.round(data.CourseDurations[0].courseDuration)}{" "}
                  {data.CourseDurations[0].courseDurationType}
                </p>
              </div>
            )}
            {
              data.CourseRating?
<div className="flex flex-row gap-2 mt-1">
            <Rating name="half-rating-read" defaultValue={data.CourseRating.defaultRating} precision={0.1} readOnly />
            <p className="mt-0.5">{data.CourseRating.defaultRating} Ratings</p>
            </div>:
            null
            }
           
 
          </section>
          <section className="flex md:mt-2 ml-6 md:ml-12 flex-row flex-wrap md:flex-nowrap gap-5 md:gap-10">
        {data?.CourseContent?.courseContent?.course?.courseDetails?.audience?.batchSize?
            <p className="text-black text-sm md:text-lg font-normal p-2  flex items-center gap-1 ">
              <HiUserGroup/>
             Batch Size{'('+data.CourseContent.courseContent.course.courseDetails.audience.batchSize[0].Min}-{data.CourseContent.courseContent.course.courseDetails.audience.batchSize[0].Max+")"}
            </p>:null}
        </section>
 
          {/* <section>
          <StarRating
   value={rating}
   onStarClick={(nextValue, prevValue, name) => handleStarClick(nextValue, prevValue, name)}
   starCount={5}
   starColor={'#ffb400'}
   emptyStarColor={'#ccc'}
/>
          </section> */}
         
          <section className="flex flex-row items-center mt-6 md:mt-3 ml-6 md:ml-12 gap-5 md:gap-10">
          {data.CourseCostPlans[0].offerPrice!=0.00?<p className="text-black text-sm md:text-xl font-medium bg-grey p-2 bg-opacity-20 rounded-lg ">{`₹${Math.round(data.CourseCostPlans[0].offerPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</p>:null}
         
            <button
              onClick={enroll}
              className="flex w-full md:w-auto justify-center rounded-lg bg-blue py-3 px-6 md:px-10 font-medium text-white"
            >
              Enroll Now
            </button>
           
          </section>
        </div>
 
        <div className="w-full md:w-auto pl-6 md:pl-12 mt-5 md:mt-0 mb-10 z-0">
          <FormComponent
            type="Course"
            referenceId={data.courseId}
            referenceCode={data.courseCode}
            requestDescription={data.title}
          />
        </div>
      </div>
 
      <div className="w-full z-0 pt-10 mt-5">
        <Content data={data} />
      </div>
 
      <div className="w-full flex justify-center items-center mt-20">
        <div
          onClick={() => {
            if (userData) {
              // toggleModule("Intelligence")
              handleDownload(data.courseId, data.title, data);
            } else {
              openModal();
            }
          }}
          className="cursor-pointer flex flex-row gap-3 items-center bg-blue text-white rounded-lg px-10 py-3"
        >
          Download Course Content
        </div>
      </div>
      {data.partnerId === 1 && (
        <>
          <div className="flex flex-col items-center justify-center text-center mt-10 w-full">
            <p className="font-semibold text-3xl text-white mt-10">
              Fast Facts: Your Career Path
            </p>
          </div>
          <div className="gap-10 mt-10 w-full lg:p-5 xl:p-5">
            <JobRoleCards
              selectedCourseId={data.courseId}
              jobRoles={jobRoles}
            />
          </div>
        </>
      )}
 
     
 {data?.CourseContent?.courseContent?.course?.courseDetails?.DesignTemplate?
      data?.CourseContent?.courseContent?.course?.courseDetails?.DesignTemplate === 2 && (
        <>
          <div className="mt-10 w-auto">
            <div className="text-center mb-10">
              <h2 className="text-white text-2xl md:text-4xl">{data.title}</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-4 lg:gap-4 xl:gap-4  p-4 items-center w-auto h-full">
              {scienceItems.map((item: any, index: any) => (
                <div
                  key={index}
                  className={`flex flex-col sm:flex-row bg-white shadow-lg rounded-md overflow-hidden justify-center items-center ${
                    index % 2 === 0
                      ? "col-span-1 md:w-128 sm:w-full lg:justify-self-end lg:-mt-10 xl:-mt-10"
                      : "col-span-2 md:w-128 sm:w-full lg:justify-self-end lg:-mt-10 xl:-mt-10"
                  }`}
                >
                  <div className="p-4 flex-1">
                    <span className="text-lg font-bold mb-2 text-blue">
                      {item.title}
                    </span>
                    <p className="text-sm text-gray-500 mt-2 text-justify line-clamp-3">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap sm:flex-nowrap space-x-4 items-center mt-2">
                      <p className="text-base flex items-center gap-1">
                        <span>
                          <IoTimer/>
                        </span>
                        {item.duration}
                      </p>
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <span>
                          <FaUsers style={{fontSize:"20px"}}/>
                        </span>
                        {item.standard}
                      </p>
                      <div>
                        {/* <button
                          className="text-black hover:text-blue text-sm underline"
                          onClick={() => handleKnowMoreClick(index)}
                        >
                        </button> */}
                        <button onClick={() => handleKnowMoreClick(index)} className="bg-gradient-to-r from-purple to-blue hover:from-pink hover:to-purple text-white font-bold p-1 rounded-full shadow-lg transform transition-all duration-500 ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse active:animate-bounce">
                        Know more →
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <img
                      src={imageHelper(item.Imgurl)}
                      alt={`Image for ${item.title}`}
                      className="h-32 w-32 object-cover p-3 rounded-3xl"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ):
      <div className="flex flex-col w-full mt-20">
      <h2 className="font-semibold text-3xl text-white text-center mb-6 mt-10">
        Transformative AI & ML Course for High-Impact Jobs
      </h2>
      <p className="text-white justify text-center text-xl opacity-50 ">
        Build expertise in AI and Machine Learning with our practical,
        project-based course. Designed to accelerate your career, this
        immersive learning journey prepares you for influential roles at some
        of the world's fastest-growing companies.
      </p>
      <div className="mt-10">
        <Marquee className="bg-white">
          <img src={accenture.src} alt="accenture" />
          <img src={amazon.src} alt="amazon" />
          <img src={cognizant.src} alt="cognizant" />
          <img src={deloitte.src} alt="deloitte" />
          <img src={dxc.src} alt="dxc" />
          <img src={flipkart.src} alt="flipkart" />
          <img src={google.src} alt="google" />
          <img src={hcl.src} alt="hcl" />
          <img src={infosys.src} alt="infosys" />
          <img src={paypal.src} alt="paypal" />
          <img src={salesforce.src} alt="salesforce" />
          <img src={walmart.src} alt="walmart" />
        </Marquee>
      </div>
    </div>}
 
      <div
        ref={modulesRef}
        className="w-full flex flex-col justify-center items-center"
      >
        <p className="text-center font-semibold text-2xl md:text-2xl bg-primary_color text-white mt-8 md:mt-20">
          Key Learning Modules
        </p>
        <div className="w-full max-w-[900px] bg-primary_color mt-4 md:ml-10">
          {(
            data?.CourseContent?.courseContent?.course?.courseDetails?.content
              ?.modules ?? []
          ).map((module: any, index: any) =>
            (module?.name ?? "").length === 0 ? null : (
              <div
                key={module.moduleId}
                className="border-b border-purple shadow-lg bg-primary_color space-y-2"
                style={{ backgroundColor: "#00051F" }}
              >
                <span
                  onClick={() => handleAccordionToggle(index)}
                  className="flex justify-between items-center w-full text-white font-medium text-base md:text-lg mt-2 md:mt-5 cursor-pointer space-y-3"
                >
                  <span className="flex items-center space-x-2">
                    <span>
                      Module {index + 1} {module.name}
                    </span>
                  </span>
                  <div className="flex items-center">
                    {openAccordionIndex === index ? (
                      <FaAngleUp
                        className="text-purple"
                        style={{ fontSize: "25px" }}
                      />
                    ) : (
                      <FaAngleDown
                        className="text-purple"
                        style={{ fontSize: "25px" }}
                      />
                    )}
                  </div>
                </span>
 
                {openAccordionIndex === index && (
                  <div className="p-4">
                    {(module?.moduleDescription ?? "").length > 0 && (
                      <span className="text-white ml-4 md:ml-10">
                        {module.moduleDescription}
                      </span>
                    )}
                    <ul className="space-y-2 mt-2">
                      {(module.moduleItems ?? module.details).map(
                        (item: any, itemIndex: any) =>
                          (
                            item?.moduleItemName ??
                            (item.mode === "quiz" ? "Quiz" : "") 
                          
                          ).length === 0 ? null : (
                            <li
                              key={item.moduleItemId ?? item.id}
                              className="flex items-center gap-2 md:gap-3 text-white"
                            >
                              <span className="w-1.5 md:w-2 h-1.5 md:h-2 flex items-center justify-center bg-white rounded-full text-white text-xs"></span>
                              {item.mode === "quiz"
                                ? "Quiz"
                                : item.moduleItemName}
                            </li>
                          )
                      )}
                    </ul>
                  </div>
                )}
              </div>
            )
          )}
        </div>
      </div>
 
    </main>
  );
}
 