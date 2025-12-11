import React, { Fragment, useState, useEffect } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import Image from "next/image";
import TextTransition, { presets } from 'react-text-transition';
import MainHeading from '../helpers/heading/main_heading';
import WebinarFilter from './filter_component';
import { CalendarIcon } from '@heroicons/react/24/outline'
import { axiosPublic } from '@/common/axiosPublic';
import WebinarCard from '../helpers/card/webinar_card_component';
import { useRouter } from 'next/navigation';
import WebinarPartnerDropdown from './webinar_partner_dropdown_component';
import NormalBtn from '../helpers/buttons/normal_btn_component';
import ComponentLoader from '../helpers/ComponentLoader';

export default function WebinarContainer() {
  const router = useRouter();
  const [isLoading,setLoading]=useState(true);
  const [data, setData] = useState<any[]>([]);
  const [list, setList] = useState<any[]>([]);
  useEffect(() => {

    fetchData();

  }, [])

  const fetchData = async () => {
    try {
      setLoading(true);
     
      const result = await axiosPublic.get('/lms/webinar');

      setData(result.data.webinar);
      setList(result.data.webinar);
      setLoading(false);
   
    } catch (error) {
      setLoading(false);
    }
  }
  const [partner, setPartner] = useState<any>(null);
  useEffect(() => {
    filter();


  }, [partner])
  const filter = () => {

    if (partner != null) {

      setData(list.filter((e: any) => {

        return e.partnerId == partner?.partnerId
      }));
    }
    if(partner==null){
      setData(list);
    }


  }


  return (
    <main className="w-full bg-primary_color flex-1 flex flex-col justify-start items-start">
      <MainHeading text={isLoading ? "" : data.length == 0 ? "Coming Soon…" : 'Webinars'} color={''} />
   {
    data.length!=0&&   <div className="flex flex-row gap-1 items-center mt-14">
    <p className="cursor-pointer text-blue text-base font-medium" onClick={(e) => {

      router.replace("/");
    }}>Home</p>
    <ChevronRightIcon className="text-text_grey_one h-4 w-4" />
    <p className="hover:text-blue cursor-pointer text-text_grey_one text-base font-medium">Webinar</p>
  </div>
   }
     {
    data.length!=0&& <div className='w-full flex flex-row  items-center justify-between mt-3'>
      <h3 className='text-xl font-normal text-white'>Upcoming Webinars</h3>
     <div className='flex flex-row flex-wrap justify-end gap-4'>
       <WebinarPartnerDropdown data={partner} setData={setPartner} />
      {partner != null  ? <NormalBtn text={"Clear Filter"} onClick={(e: any) => {
            e.preventDefault();
         setPartner(null);
          }} /> : <></>}
    </div>

 




    </div>
     }
     {
       isLoading&&<div className='w-full h-40 flex justify-center items-center'>
        <ComponentLoader/>
       </div>
     }
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

{
  data.map((e: any, index) => {
    return <WebinarCard key={index} data={e} />
  })
}
</div>
    </main>
  )
}
