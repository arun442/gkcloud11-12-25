import React, { Fragment, useState, useEffect } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import Image from "next/image";
import TextTransition, { presets } from 'react-text-transition';
import MainHeading from '../helpers/heading/main_heading';

import { CalendarIcon } from '@heroicons/react/24/outline'
import CourseCard from '../helpers/card/course_card_component';
import classNames from '@/helpers/add_class';
import DurationDropdown from './duration_dropdown_component';
import PartnerDropdown from './partner_dropdown_component';
import TechnologyDropdown from './technology_dropdown_component';
import { axiosPublic } from '@/common/axiosPublic';
import CertificateCard from '../helpers/card/certificate_card_component';
import { useRouter, useParams } from 'next/navigation';
import useTrainingMode from '@/hooks/training_mode_hook';
import { useSearchParams } from 'next/navigation'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import NormalBtn from '../helpers/buttons/normal_btn_component';
import TrainingModeDropdown from './training_mode_dropdown_component';

export default function CourseContainer() {
  const [index, setIndex] = useState(0);
  const [showImage, setShowImage] = useState(false);
  let [course, setCourse] = useState<any[]>([]);
  const [courseList, setCourseList] = useState<any[]>([]);
  const [certificate, setCertificate] = useState<any[]>([]);
  const [certificateList, setCertificateList] = useState<any[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams()

  const type = searchParams.get('type');
  const id = searchParams.get('id');
  const name = searchParams.get('name');



  useEffect(() => {

    fetchCourse();
    fetchCertificate();

    if (id) {
      setShowImage(true);
    }


  }, [])

  const fetchCourse = async () => {
    try {
      const result = await axiosPublic.get('/lms/course');

      setCourse(result.data.courses);

      setCourseList(result.data.courses)




    } catch (error) {

    }
  }
  const fetchCertificate = async () => {
    try {
      const result = await axiosPublic.get('/lms/certificate-course');

      setCertificate(result.data.certificateCourses);
      setCertificateList(result.data.certificateCourses);
    } catch (error) {

    }
  }
  const [trainingList, setTrainingData] = useState<any[]>([]);
  const [partner, setPartner] = useState<any>(null);
  const [technology, setTechnology] = useState<any>(null);

  const [mode, setMode] = useState<any>(null);

  const filter = () => {
   
  


    if (partner != null || technology != null || mode != null) {
      course = courseList;
      if (partner != null) {
        console.log("partner");
        console.log(partner);
        course = course.filter((e) => {

          return e.partnerId == partner?.partnerId
        })
      }
      if (technology != null) {
        course = course.filter((e) => {

          return e.categoryId == technology?.categoryId
        })
      }
      if (mode != null) {
        console.log("mode id");
        console.log(mode?.trainingModeId);
        course = course.filter((e) => {

          return e.CourseCostPlans[0].trainingModeId == mode?.trainingModeId;
        })
      }
      setCourse(course);
     
    }
   
  }
useEffect(() => {
 filter();
}, [partner,technology,mode])

  const clearFilter = () => {
    setCourse(courseList);
    setTrainingData([]);
    setPartner(null);
    setTechnology(null);
    setMode(null);
    setQuery('');
  }

  useEffect(() => {

    if (type != null) {
      if (type == "partner") {

        setPartner({
          "partnerId": id,
          "partnerName": name,
        },)
      } else {
        setTechnology({
          "categoryId": id,
          "categoryName": name,

        },)
      }

      filter();
    }

  }, [courseList])
  const [query, setQuery] = useState('')


  useEffect(() => {
    if (index == 0) {
      if (query == '') {
        setCourse(courseList);
        return;
      }
      setCourse(courseList.filter((e) => {

        return e.title.toLowerCase().includes(query.toLowerCase()) || e.courseCode.toLowerCase().includes(query.toLowerCase());
      }))
    } else {
      if (query == '') {
        setCertificate(certificateList);
        return;
      }
      setCertificate(certificateList.filter((e) => {

        return e.title.toLowerCase().includes(query.toLowerCase());
      }))
    }
  }, [query])
  const [loadMore, setLoadMore] = useState(9);

  return (
    <main className="w-full bg-primary_color flex-1 flex flex-col justify-start items-start">

      <div className="flex flex-row gap-1 items-center">
        <p className="cursor-pointer text-blue text-base font-medium" onClick={(e) => {

          router.back();
        }}>Home</p>
        <ChevronRightIcon className="text-text_grey_one h-4 w-4" />
        <p className="cursor-pointer text-text_grey_one text-base font-medium">Course</p>
      </div>

      {
        name != null && (name == "AI" || name == "Artificial Intelligence") ? <section className='w-full mt-10 flex flex-col justify-start items-start gap-6'>
          <h2 className='text-3xl text-blue font-semibold'>Artificial Intelligence</h2>

          <div className=' object-cover w-full flex flex-row items-center justify-center'>
            <img

              className="mx-auto h-128"

              src="/ai.png" />
          </div>
        </section> : type != null && type == "partner" && name != null && name == "Google Cloud" ? <section className='w-full mt-10 flex flex-col justify-start items-start gap-6'>
          <h2 className='text-3xl text-blue font-semibold'>{name}</h2>

          <div className=' object-cover w-full flex flex-row items-center justify-center'>
            <img

              className="object-contain mx-auto h-128"

              src="/gcp.png" />
          </div>
        </section> : name != null && (name == "Microsoft Azure" || name == "Microsoft") ? <section className='w-full mt-10 flex flex-col justify-start items-start gap-6'>
          <h2 className='text-3xl text-blue font-semibold'>{name}</h2>

          <div className=' object-contain w-full flex flex-row items-center justify-center'>
            <img

              className="mx-auto h-128"

              src="/azure.png" />
          </div>
        </section> : <></>
      }
      <div className={classNames("w-full cursor-pointer text-2xl  flex flex-row mt-12 mb-12 justify-center items-center  gap-7")}>
        <div className={index != 0 ? "text-white font-normal" : "text-blue font-medium"} onClick={(e) => {
          setLoadMore(9);
          setIndex(0)
        }}>
          Courses Library
        </div>
        <div className='h-6 w-[1px] rounded-lg bg-grey'></div>
        <div className={index != 1 ? "text-white font-normal" : "text-blue font-medium"} onClick={(e) => {
          setIndex(1)
          setLoadMore(9);
        }}>
          Certifications
        </div>

      </div>
      {
        index == 0 ? <div className='box-border border w-full p-8 border-blue border-1 bg-dark_blue rounded-2xl'>
          <h2 className="text-white text-lg font-medium">Fliter by</h2>
          <section className='mt-10 flex flex-row gap-6'>
            <PartnerDropdown data={partner} setData={setPartner} />
            <TechnologyDropdown data={technology} setData={setTechnology} />
            <TrainingModeDropdown data={mode} setData={setMode} />
            {/* <NormalBtn text={"Filter"} onClick={(e: any) => {
              e.preventDefault();
              filter();
            
            }} /> */}
            {partner != null || technology != null || mode != null ? <NormalBtn text={"Clear"} onClick={(e: any) => {
              e.preventDefault();
              clearFilter();
              if (name) {
                router.replace("/course");
              }
            }} /> : <></>}
          </section>

        </div> : <></>
      }
      <section className='flex flex-col items-start justify-start'>
        <div className="text-white mt-10 font-medium">
          Courses / Certifications
        </div>
        <div className="mt-4 w-96 mx-auto flex flex-row  items-center justify-center relative">
          <span className="absolute h-5 w-5 left-0 top-4  inset-0 pl-3">  <MagnifyingGlassIcon className="h-5 w-5 text-blue items-center" /></span>
          <input
            value={query}
            className="block w-full border-1 pl-10 rounded-full bg-dark_blue py-[15px] text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:font-medium placeholder:text-gray-400 placeholder:pl-3  sm:text-sm sm:leading-6"
            placeholder='Search'
            onChange={(event) => {

              setQuery(event.target.value)
            }}
          />

        </div>
      </section>
      {
        index == 0 ? <div className="w-full grid grid-cols-3 gap-6 mt-8">

          {
            course.map((e: any, index) => {
              return (index + 1) > loadMore ? <></> : <CourseCard showPrice={true} key={index} data={e} />
            })
          }




        </div> : <div className="w-full grid grid-cols-3 gap-6 mt-8">

          {
            certificate.map((e: any, index) => {
              return (index + 1) > loadMore ? <></> : <CertificateCard key={index} data={e} />
            })
          }




        </div>
      }
      <section className='w-full my-10 flex flex-row items-center justify-center'>

        {
          loadMore >= (index == 0 ? courseList.length : certificateList.length) ? <></> : <NormalBtn text={"Load More"} onClick={(e: any) => {
            e.preventDefault();
            setLoadMore(loadMore + 9);
          }} />
        }
      </section>
    </main>
  )
}
