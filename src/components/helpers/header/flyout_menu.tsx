import { Fragment, useState, useEffect, useRef } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon, ChevronUpIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import {


    ChevronRightIcon
} from '@heroicons/react/24/outline'
import usePartnerMode from '@/hooks/partner_mode_hook'
import { axiosPublic } from '@/common/axiosPublic'
import NormalBtn from '../buttons/normal_btn_component'
import { useRouter } from 'next/navigation';
import classNames from '@/helpers/add_class'

export default function AllCourses() {
    const router = useRouter();
    const [show, setShow] = useState(false);
    let [course, setCourse] = useState<any[]>([]);
    let [selectedCat, setSelectedCat] = useState("All Courses");
    let courseList = useRef<any[]>([]);
    const shuffle = (array: any[]) => {
        return array.sort(() => Math.random() - 0.5);
    };
    const fetchCourse = async () => {
        try {
            const result = await axiosPublic.get('/lms/course');
            const shuffleCourses = shuffle(result.data.courses);
            setCourse(shuffleCourses);

            courseList.current = shuffleCourses;
            setCourse(courseList.current.filter((e: any) => e.partnerId == partnerData[0].partnerId));
            setSelectedCat( partnerData[0].partnerName);
            console.log(courseList)

        } catch (error) {

        }
    }

   

    const { partnerData, isLoading } = usePartnerMode();


    useEffect(() => {
    if(partnerData.length!=0){
        fetchCourse();
    }
    }, [partnerData])
    
    const timeoutDuration = 120
    const triggerRef = useRef()
    const timeOutRef = useRef()
  
    const handleEnter = (isOpen:any) => {
      clearTimeout(timeOutRef.current)
      !isOpen && triggerRef.current?.click()
    }
  
    const handleLeave = (isOpen) => {
      timeOutRef.current = setTimeout(() => {
        isOpen && triggerRef.current?.click()
      }, timeoutDuration)
    }

    return (
        <Popover className="relative">
             {({ open }) => (
                <div  onMouseEnter={() => handleEnter(open)}
                onMouseLeave={() => handleLeave(open)}>
                      <Popover.Button ref={triggerRef} className="inline-flex items-center mx-8 py-2 text-sm font-medium leading-6 text-white">
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
                  <Popover.Panel onMouseLeave={(event) => setShow(false)} className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
                      <div className="w-screen max-w-4xl flex flex-row overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                          <div className=" w-1/4">
                              {[ ...partnerData].map((item) => (
                                  <div onClick={(event) => {
                                      setSelectedCat(item.partnerName);
                                      console.log(courseList.current);
                                      setCourse(courseList.current.filter((e: any) => e.partnerId == item.partnerId));
                                  }} key={item.partnerName} className="cursor-pointer group relative flex gap-x-6 rounded-lg p-4 justify-center  hover:bg-gray-50">
                                      <div className='flex-1 group'>
                                          <a className={classNames(" font-normal text-gray-900 group-hover:text-blue", selectedCat == item.partnerName ? "text-blue" : "text-gray-900")}>
                                              {item.partnerName}
  
                                          </a>
  
                                      </div>
                                      <ChevronRightIcon className={classNames("h-4 w-4 text-gray-600 font-normal group-hover:text-blue", selectedCat == item.partnerName ? "text-blue" : "text-gray-600")} aria-hidden="true" />
  
                                  </div>
                              ))}
                          </div>
                          <section className="flex-1 p-4 flex flex-col justify-center items-center">
                              <div className="flex-1  grid grid-cols-3 gap-4">
                                  {
                                      course.map((e, index) => {
                                          if (index > 11) return <></>
                                          return <a key={e.courseId} onClick={(event) => {
                                              router.push(`/course/${e.courseId}`)
                                          }} className="cursor-pointer font-normal text-gray-900 hover:text-blue hover:underline">
                                              {e.title}
  
                                          </a>
                                      })
                                  }
                              </div>
                              {/* {
                                  course.length > 12 && <div onClick={(e) => {
                                      router.push(`/course`);
                                  }} className='cursor-pointer flex flex-row justify-center items-center bg-blue px-6 py-2 text-base font-normal text-white rounded-full'>Show All Courses</div>
                              } */}
                              <div onClick={(e) => {
                                      router.push(`/course`);
                                  }} className='cursor-pointer flex flex-row justify-center items-center bg-blue px-6 py-2 text-base font-normal text-white rounded-full'>Show All Courses</div>
                          </section>
                      </div>
                  </Popover.Panel>
              </Transition>
                </div>
             )}
          
        </Popover>
    )
}
