import React, { Fragment, useState, useEffect } from 'react'
import MainHeading from '../helpers/heading/main_heading'

import imageHelper from '@/common/image_helper';
import { axiosPublic } from '@/common/axiosPublic';
import { useRouter } from 'next/router';





export default function OurClientComponent() {

  const [data, setData] = useState<any[]>([]);
  const router=useRouter();
  useEffect(() => {

    fetchData();

  }, [])

  const fetchData = async () => {
    try {
      const result = await axiosPublic.get('/lms/feature-customer');
 
      setData(result.data.featuredCustomer.filter((e: any, index: number) => index < 6));
    } catch (error) {

    }
  }

  return (
    <main className='bg-dark_blue flex flex-col lg:flex-row justify-center items-center rounded-lg p-4 md:p-8 lg:p-16 gap-10 mt-24'>
      <h2 className='text-blue text-4xl font-bold'>Our Clientele</h2>

      <section className='flex-1 w-full flex flex-col items-center justify-center gap-10'>
        <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-6">
          {
            data.map((e: any, index) => {
              return <div key={index} className="w-full h-32 border p-4 flex flex-row justify-center items-center border-blue border-1 bg-dark_blue rounded-xl">
                <img

                  className="cursor-pointer object-contain max-w-full h-full w-full"

                  src={imageHelper(e.Image.imageUrl)}
                  alt="link"
                />

              </div>
            })
          }
        </div>
        <div onClick={(e)=>{
          e.preventDefault();
         router.push("/about?index=3")
        }} className='text-blue text-lg font-medium cursor-pointer'>Show all</div>
      </section>
    </main>

  )
}
