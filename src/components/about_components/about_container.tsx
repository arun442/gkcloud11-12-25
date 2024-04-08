import React, { Fragment, useState, useEffect } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import Image from "next/image";
import TextTransition, { presets } from 'react-text-transition';
import MainHeading from '../helpers/heading/main_heading';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { CalendarIcon } from '@heroicons/react/24/outline'
import CourseCard from '../helpers/card/course_card_component';
import classNames from '@/helpers/add_class';
import { axiosPublic } from '@/common/axiosPublic';
import PartnerAboutComponent from './partner_component';
import OurClientAboutComponent from './our_client_component';
import imageHelper from '@/common/image_helper';
import { useRouter } from 'next/router';
import { Link } from 'react-alice-carousel';
import { useSearchParams } from 'next/navigation';

export default function AboutContainer() {
  const searchParams = useSearchParams()

  const queryIndex = searchParams.get('index');
  const items = [
    {
      index: 0,
      name: "Overview"
    },

    {
      index: 2,
      name: "Leadership"
    },
    {
      index: 3,
      name: "Our Client"
    },
    {
      index: 4,
      name: "Our Partner"
    },
  ];
  const [index, setIndex] = useState(0);

  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
if(queryIndex){
  setIndex(parseInt(queryIndex));
}
    return () => {

    }
  }, []);

  const fetchData = async () => {
    try {
      const result = await axiosPublic.get("/lms/about-us");
      console.log("what is the response", result.data);
      setData(result.data.aboutUs)
    } catch (error) {
      console.log("what is the error");
      console.log(error)
    }
  }
  const handleDownload = async () => {
    try {
      // Make a GET request to the API endpoint that serves the file
      const response = await axiosPublic.get('/lms/about-download', {

        responseType: 'blob' // This tells Axios to expect a binary response
      });

      // Create a blob object from the response data
      const blob = new Blob([response.data], { type: 'application/pdf' });

      // Create a URL for the blob object
      const url = window.URL.createObjectURL(blob);

      // Create a link element and click it to trigger the download
      const link = document.createElement('a');
      link.href = url;
      link.download = `GK_Profile.pdf`; // Specify the filename here
      document.body.appendChild(link);
      link.click();

      // Clean up: remove the link and revoke the URL
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };
  const leaderShip = [
    {
      "link": "https://www.linkedin.com/in/sendhil-kumar-a6aa13122/",
      "image": "/sendhil.png",
      "name": "Sendhil Kumar",
      "position": "CEO"

    },
    {
      "link": "https://www.linkedin.com/in/lakshmi-sendhil-3a25ba2b9/",
      "image": "/lakshmi.png",
      "name": "Lakshmi Sendhil",
      "position": "CFO"

    },
    {
      "link": "https://www.linkedin.com/in/ashwini-s-7208b7274/",
      "image": "/Ashwini.png",
      "name": "Ashwini S",
      "position": "Business Head"

    }


  ];
const router=useRouter();
  return (
    <main className="w-full bg-primary_color flex-1 flex flex-col justify-start items-start">


     <main className='w-full flex flex-row gap-6'>
    
      <section className='flex-1 flex flex-col justify-start items-start'>
      <div className="flex flex-row gap-1 items-center">
        <p className="cursor-pointer text-blue text-base font-medium" onClick={(e) => {

          router.replace("/");
        }}>Home</p>
        <ChevronRightIcon className="text-text_grey_one h-4 w-4" />
        <p className="cursor-pointer text-text_grey_one text-base font-medium">About Us</p>
      </div>
      <h1 className='font-semibold text-2xl mt-6 text-white'>About Us</h1>
      <p className='text-justify mt-6 leading-6 font-normal text-[16px] text-white'>GK Cloud Solutions has created a brand in the Cloud space with specialization on Cloud Trainings across multiple brands and focusing more towards AI  with evocative approach as a Solution Provider supporting enterprises to consistently succeed in the evolving world space.</p>

      <h1 className='font-semibold text-2xl mt-6 text-white'></h1>
      <section className='flex flex-row items-start mt-3'>
        <Link href={data.filter((e) => e.generalId == 1).length == 0 ? "" : imageHelper("/" + data.filter((e) => e.generalId == 1)[0].documentURL)} className=" mx-auto box-border border flex flex-row gap-3  items-center py-3  px-6 border-blue border-1 bg-dark_blue rounded-2xl">
          <img

            className="text-blue h-6 w-6"
            src="/pdf_icon.svg" />
          <p className="text-white text-lg font-normal">Download Company Profile</p>
        </Link>
      </section>
      </section>
      <section className='w-1/3 h-auto'>
      <img

className="object-contain mx-auto h-72"

src="/about.png" />
      </section>
     </main>
      <section className="mx-auto box-border w-full  mt-20  border-none border-blue grid grid-cols-4   items-center rounded-full">
        {
          items.map((e, indexx) => <div key={indexx} className={classNames("cursor-pointer py-4  w-full box-border border flex flex-row items-center justify-center text-white text-lg font-semibold border-blue border-1 ", index == e.index ? "rounded-full bg-dark_blue" : "border-none rounded-none ")} onClick={(event) => {
            event.preventDefault();
            setIndex(e.index)
          }}>{e.name}</div>)
        }

      </section>

      <main className='w-full mt-14 text-justify'>
        {
          data.length == 0 ? <></> : index == 0 ? <section>
                        <p className='leading-6 font-normal text-[16px] text-white mb-6'>GK Cloud Solutions established to fill the void in Technology Training, Services & Project Consulting.</p>
                        <p className='leading-6 font-normal text-[16px] text-white mb-6'><span className='font-semibold'>Training:</span> We are a value-driven Tech Ed Company who strives to provide unrivalled Technology continuum of training’s to enable aspiring associates to exceed their potential. We offer an end-to-end Portfolio of training services spanning multiple technologies that can be customized, built, and digitized to suit the client’s need. Pioneer in transformative technologies like AI, ML, IoT, Cloud, Data Science, Blockchain & Analytics. Reach is not a restriction to educate.</p>
                        <p className='leading-6 font-normal text-[16px] text-white'><span className='font-semibold'>Consulting:</span> We are an Agile solution provider for Projects from Development, Consultation & Infrastructure Support. Every emerging technology goes through the scrum process and build business-centric value propositions for enabling digital transformations. Our custom-built business offerings for Offshore & Onsite curtailing costs, risk & compliance management thus augmenting workforce productivity in industries across Insurance, Banking, Retails, and Manufacturing. We are aligned to bridge the visible existing gaps between the traditional technologies (Legacy systems) through digital transformation.</p>
            {/* <p className='leading-6 font-normal text-[16px] text-white'>{data.filter((e) => e.generalId == 2)[0].description}</p> */}
          </section> : index == 2 ? <section className='w-full mx-auto flex flex-row justify-center gap-4'>
            {leaderShip.map((e, index) => <div key={index} className="relative cursor-pointer w-52 box-border border flex flex-col justify-start items-start border-blue border-1 bg-dark_blue">
              <Link
                href={e.link}
                className="absolute top-3 left-3"
              >
                <img

                  className="text-white h-6 w-6"
                  src="/Icon_linkedIn.svg" /></Link>
              <div className='w-full bg-dark_blue h-52'>

                <img

                  className="cursor-pointer object-fill max-w-full h-full w-full"

                  src={e.image}
                  alt="link"
                />
              </div>
              <div className='w-full flex-col items-center justify-center p-3 border border-blue'>
                <h3 className='text-white text-sm font-bold text-center'>{e.name}</h3>
                <p className='text-white text-[12px] font-light text-center'>{e.position}</p>
              </div>
            </div>

            )}

          </section> : index == 3 ? <OurClientAboutComponent
          /> : <PartnerAboutComponent />
        }
      </main>



    </main>
  )
}
