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



      setItems(result.data.service);
    } catch (error) {

    }
  }

  return (
    <main className='flex flex-col justify-center items-center gap-14'>
      <MainHeading text='GKCS Unique Offerings' />
      <section className=" w-full px-40  grid grid-cols-2 gap-4">
        {

          items.map((e: any) => {
            return <div key={e.serviceTitle} className='mx-auto box-border border flex flex-col justify-center gap-8 h-[200px]    p-6 border-blue border-1 bg-dark_blue  rounded-md '>
              <h3 className='text-xl font-medium text-center text-white'>{e.serviceTitle}</h3>
              <p className='text-sm text-white'>{e.serviceDescription}</p>
            </div>
          })

        }
      </section>
    </main>

  )
}
