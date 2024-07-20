import React, { Fragment, useState, useEffect } from 'react'
import MainHeading from '../helpers/heading/main_heading'
import { axiosPublic } from '@/common/axiosPublic';





export default function UnqueOfferComponent() {

  const [items, setItems] = useState([]);

  useEffect(() => {

    fetchData();

  }, [])
  const fetchData = async () => {
    try {
      const result = await axiosPublic.get('/lms/service');

console.log("what is the service", result.data.service);

      setItems(result.data.service);
    } catch (error) {

    }
  }

  return (
    <main className='flex flex-col justify-center items-center gap-14 mt-24'>
      <MainHeading text='GKCS Unique Offerings' />
      <section className=" w-full lg:px-40  grid grid-cols-1  md:grid-cols-2 gap-4">
        {

          items.map((e: any) => {
            return <div key={e.serviceTitle} className='mx-auto box-border border flex flex-col items-center justify-center gap-8 h-auto    p-6 border-blue border-1 bg-dark_blue  rounded-md '>
           {
            e.serviceTitle=="STU"? <img
alt='STU'
            className=" h-12 w-20 text-center"
            src="/stu.png" />:<h3 className='text-xl font-medium text-center text-white'>{e.serviceTitle}</h3>
           }   
              <p className='text-sm flex-1 text-white'>{e.serviceDescription}</p>
            </div>
          })

        }
      </section>
    </main>

  )
}
