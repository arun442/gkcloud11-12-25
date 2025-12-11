import { Fragment, useState, useEffect, useRef } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon, ChevronUpIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import { SiGooglecloud } from "react-icons/si";
import { SiIbm } from "react-icons/si";
import { FaMicrosoft } from "react-icons/fa6";
import { RiRobot2Fill } from "react-icons/ri";
import { FaRedhat } from "react-icons/fa6";

import {


    ChevronRightIcon
} from '@heroicons/react/24/outline'
import usePartnerMode from '@/hooks/partner_mode_hook'
import { axiosPublic } from '@/common/axiosPublic'
import NormalBtn from '../buttons/normal_btn_component'
import { useRouter } from 'next/navigation';
import classNames from '@/helpers/add_class'
import Loading from '@/pages/loading'
import { commonbasePath } from '@/common/constants';

export default function AllCourses() {
    const router = useRouter();
    const [show, setShow] = useState(false);
    const [isLoading, setLoading] = useState(true);
    let [course, setCourse] = useState<any[]>([]);
    let [selectedCat, setSelectedCat] = useState("All Courses");
    let [selectedid, setSelectedid] = useState(0);

    let courseList = useRef<any[]>([]);
    const shuffle = (array: any[]) => {
        return array.sort(() => Math.random() - 0.5);
    };
    const fetchCourse = async () => {
        try {
            setLoading(true);
           
            const result = await axiosPublic.get('/lms/course');
            const shuffleCourses = shuffle(result.data.courses);
            setCourse(shuffleCourses);

            courseList.current = shuffleCourses;
            setCourse(courseList.current.filter((e: any) => e.partnerId == partnerData[0].partnerId));
            setSelectedCat( partnerData[0].partnerName);
            setSelectedid(partnerData[0].partnerId)
          
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

   

    const { partnerData } = usePartnerMode();


    useEffect(() => {
    if(partnerData.length!=0){
        fetchCourse();
    }
    }, [partnerData])
    
    const timeoutDuration = 120
    const triggerRef = useRef<any>()
    const timeOutRef = useRef<any>()
  
    const handleEnter = (isOpen:any) => {
        if(partnerData.length!=0){
            setCourse(courseList.current.filter((e: any) => e.partnerId == partnerData[0].partnerId));
            setSelectedCat( partnerData[0].partnerName);
                        setSelectedid(partnerData[0].partnerId)

          clearTimeout(timeOutRef.current)
          !isOpen && triggerRef.current?.click()
        }
       
    }
  
    const handleLeave = (isOpen:any) => {
      timeOutRef.current = setTimeout(() => {
        isOpen && triggerRef.current?.click()
      }, timeoutDuration);

    } 

    return (
        <Popover className="relative">
             {({ open }) => (
                <div  onMouseEnter={() => handleEnter(open)}
                onMouseLeave={() => handleLeave(open)}
                >
                      <Popover.Button ref={triggerRef} className="inline-flex items-center mx-8 py-2 text-sm font-medium leading-6 text-white hover:text-blue">
                  <span>Programs</span>
                  {show ? <ChevronUpIcon className="h-5 w-5" aria-hidden="true" /> : <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />}
              </Popover.Button>
  
              <Transition
                
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
              >
                  <Popover.Panel onMouseLeave={(event) => setShow(false)} className="absolute mt-3  z-10 lg:-translate-x-1/2 xl:-translate-x-2/2 md:-translate-x-48 flex  " >
                      <div className="w-screen lg:max-w-5xl xl:max-w-1xl md:max-w-2xl h-[410px] flex flex-row overflow-hidden text-white  bg-[#11183d] text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                          <div className=" w-1/4 ">
                              {[ ...partnerData].map((item) => (
                                  <div onClick={(event) => {
                                      setSelectedCat(item.partnerName);
                                                  setSelectedid(item.partnerId)

                                     
                                      setCourse(courseList.current.filter((e: any) => e.partnerId == item.partnerId));
                                  }} key={item.partnerName} onMouseEnter={(e)=>{
                                    setSelectedCat(item.partnerName);
                                              setSelectedid(item.partnerId)

                                    setCourse(courseList.current.filter((e: any) => e.partnerId == item.partnerId));
                                  }} className={classNames("cursor-pointer group relative flex gap-x-6 p-4 justify-center items-center hover:bg-[#49517b]  text-base  border-b border-[#595a63] ",selectedCat == item.partnerName ? "bg-[#49517b]" : "")}>
                                    <div>
                                                                   {item.partnerName=="Google Cloud"?<SiGooglecloud />:item.partnerName=="Artificial Intelligence"?<RiRobot2Fill />:item.partnerName=="Redhat"?<FaRedhat />:item.partnerName=="Microsoft"?<FaMicrosoft />:item.partnerName=="IBM"?<SiIbm style={{fontSize:"24px"}}/>:   <img style={{height:"24px"}}  alt='Academics' src={`${commonbasePath}/academics.png`} />}
</div>
                                      <div className='flex-1 group '>

                                          <a className={classNames(" font-medium text-gray-900 text-xl group-hover:text-white group-hover:font-bold", selectedCat == item.partnerName ? "text-white font-semibold " : "text-gray-900")}>
                                              {item.partnerName}
                                          </a>
                                      </div>
                                      {/* <ChevronRightIcon className={classNames("h-4 w-4 text-gray-600 font-normal group-hover:text-blue", selectedCat == item.partnerName ? "text-blue" : "text-gray-600")} aria-hidden="true" /> */}
  
                                  </div>
                              ))}
                          </div>
                          <section className="flex-1 p-4 flex flex-col justify-center items-center bg-[#0A181F] ">
                                {
                             isLoading? <div className=" h-12 w-12 border-4 border-t-4 border-blue animate-spin absolute"></div>:   course.length === 0 ? (
                                    <>
                                    <div className='cursor-pointer flex flex-row justify-center items-center bg-orange px-6 py-2 text-base font-normal text-white '>
                                        Stay tuned! We’re working on some exciting new courses. 
                                    </div>   <br /><br /></>
                                ) : (
                              <div className={`flex-1 grid custom-scrollbar1 grid-cols-2 gap-4 overflow-y-auto  bg-[#0A181F]  p-5 w-full `}>
                                  {
                                  course.sort((a, b) => a.courseId - b.courseId).map((e, index) => {
                                          if (index > 11) return <></>
                                          return <a key={e.courseId} onClick={(event) => {
                                            handleLeave(open)
                                              router.push(`/course/${e.slug}`)
                                          }} className={`cursor-pointer font-normal text-white p-2  hover:text-white hover:font-semibold hover:bg-[#49517b] h-fit ${selectedCat=="iScience"?'text-xl':""} `}>
                                              {e.title}
                                          </a>
                                      })
                                  }
                              </div>
                              )}
                              {/* {
                                  course.length > 12 && <div onClick={(e) => {
                                      router.push(`/course`);
                                  }} className='cursor-pointer flex flex-row justify-center items-center bg-blue px-6 py-2 text-base font-normal text-white rounded-full'>Show All Courses</div>
                              } */}
                             {
                               course.length!=0&& <div onClick={(e) => {
                                handleLeave(open)
                                router.push(`/course?type=partner&id=${selectedid}&name=${selectedCat}`);
                                sessionStorage.removeItem("navtab");
                                }} className='cursor-pointer mt-2 flex flex-row justify-center items-center bg-[#49517b] px-6 py-2 text-base font-medium  text-white rounded-lg'>All Courses</div>
                             } 
                          </section>
                      </div>
                  </Popover.Panel>
              </Transition>
                </div>
             )}
          
        </Popover>
    )
}
