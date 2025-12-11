import React, { Fragment, useState, useEffect } from 'react'
import MainHeading from '../helpers/heading/main_heading'

import imageHelper from '@/common/image_helper';
import { axiosPublic } from '@/common/axiosPublic';
import { useRouter } from 'next/router';
import img1 from './Group 320.png'
import Slider from "react-slick";




export default function OurClientComponent() {
  var settings1 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed: 2000,
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        },
        {
            breakpoint: 900,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              initialSlide: 1
            }
          },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 1
          }
        },

    ]
  };
  const [data, setData] = useState<any[]>([]);
  const router=useRouter();
  useEffect(() => {

    fetchData();

  }, [])

  const fetchData = async () => {
    try {
      const result = await axiosPublic.get('/lms/feature-customer');
 
      setData(result.data.featuredCustomer);
    } catch (error) {

    }
  }

  return (
    <main className='flex flex-col justify-center items-center gap-14 mt-24'>
    <MainHeading text='Our Clientele' color="" />
     <section className=" w-full  md:grid-cols-2 gap-4">
      <div className='row' style={{border:'1px solid white',padding:'5px 25px',borderRadius:"10px",color:'white'}}>
<Slider {...settings1} >
{
            data.map((e: any, index) => {
    return  <div>
     <img src={imageHelper(e.Image.imageUrl)} style={{height:'100px'}}/>
      </div>
            })}
    </Slider>
</div>
        {/* <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-6">
          {
            data.map((e: any, index) => {
              return <div key={index} className="w-full h-32 border p-4 flex flex-row justify-center items-center border-blue border-1 bg-dark_blue rounded-xl">
                <img

                  className="cursor-pointer object-contain max-w-full h-full w-full"

                  src={imageHelper(e.Image.imageUrl)}
                  alt={`our client ${e.customerName}`}
                />

              </div>
            })
          }
        </div>
        <div onClick={(e)=>{
          e.preventDefault();
         router.push("/about?index=3")
        }} className='text-blue text-lg font-medium cursor-pointer'>Show all</div> */}
      </section>

    </main>

  )
}
