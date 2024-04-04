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

export default function AboutContainer() {
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
const leaderShip=[
  {
    "link":"https://www.linkedin.com/in/sendhil-kumar-a6aa13122/",
    "image":"/sendhil.png",
    "name":"Sendhil Kumar",
    "position":"CEO"

  },
  {
    "link":"https://www.linkedin.com/in/lakshmi-sendhil-3a25ba2b9/",
    "image":"/lakshmi.png",
    "name":"Lakshmi Sendhil",
    "position":"CFO"

  },
  {
    "link":"https://www.linkedin.com/in/ashwini-s-7208b7274/",
    "image":"/Ashwini.png",
    "name":"Ashwini S",
    "position":"Business Head"

  }
 
  
];

  return (
    <main className="w-full bg-primary_color flex-1 flex flex-col justify-start items-start">


      <h1 className='font-semibold text-2xl mt-6 text-white'>About Us</h1>
      <p className='mt-6 leading-6 font-normal text-[16px] text-white'>GK Cloud Solutions has created a brand in the Cloud space with specialization on Cloud Trainings across multiple brands and focusing more towards AI  with evocative approach as a Solution Provider supporting enterprises to consistently succeed in the evolving world space.</p>

      <h1 className='font-semibold text-2xl mt-6 text-white'></h1>
      <section className='flex flex-row items-start mt-20'>
        <Link href={data.filter((e)=>e.generalId==1).length==0?"":imageHelper("/"+data.filter((e)=>e.generalId==1)[0].documentURL)} className=" mx-auto box-border border flex flex-row gap-3  items-center py-3  px-6 border-blue border-1 bg-dark_blue rounded-2xl">
        <img
                                   
                                   className="text-blue h-6 w-6"
                                   src="/pdf_icon.svg"/>
          <p className="text-white text-lg font-normal">Download Company Profile</p>
        </Link>
      </section>
<section className="mx-auto box-border w-full  mt-14  border-none border-blue grid grid-cols-4   items-center rounded-full">
        {
          items.map((e,indexx) => <div key={indexx} className={classNames("cursor-pointer py-4  w-full box-border border flex flex-row items-center justify-center text-white text-lg font-semibold border-blue border-1 ", index == e.index ? "rounded-full bg-dark_blue" : "border-none rounded-none ")} onClick={(event) => {
            event.preventDefault();
            setIndex(e.index)
          }}>{e.name}</div>)
        }

      </section>

      <main className='mt-14'>
        {
          data.length == 0 ? <></> : index == 0 ? <section>
            <p className='leading-6 font-normal text-[16px] text-white'>{data.filter((e)=>e.generalId==2)[0].description}</p>
          </section> :index == 2 ? <section className='w-full mx-auto grid grid-cols-3 gap-4'>
           {leaderShip.map((e,index)=><div key={index} className="relative cursor-pointer box-border border flex flex-col justify-start items-start border-blue border-1 bg-dark_blue">
           <Link
                    href={e.link}
                    className="absolute top-3 left-3"
                    >
                  <img
  
  className="text-white h-6 w-6"
  src="/Icon_linkedIn.svg" /></Link>
           <div className='w-full bg-dark_blue h-48'>

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
             
          </section> :index == 3 ?<OurClientAboutComponent
/> : <PartnerAboutComponent/> 
        }
      </main>



    </main>
  )
}
