import React, { Fragment, useState, useEffect } from 'react'
import MainHeading from '../helpers/heading/main_heading'


import { axiosPublic } from '@/common/axiosPublic';



import { PagerIndicator } from '../helpers/PagerIndicator';
import { Slider } from '../helpers/Slider';



export default function TestimonialComponent() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
  };
  const [items, setItems] = useState([]);

  useEffect(() => {

    fetchData();

  }, [])
  const fetchData = async () => {
    try {
      const result = await axiosPublic.get('/lms/testimonial');
      console.log("what is the result");
      console.log(result.data.testimonials);


      setItems(result.data.testimonials);
    } catch (error) {

    }
  }

  const sliderRef = React.useRef(null);
  const [sliderState, setsliderState] = React.useState(0);

  return (
    <main className='w-full flex flex-col justify-center items-center gap-14'>
      <MainHeading text='What They Say About Courses' />
      <div className="w-full">
           
           <Slider
             autoPlay
             autoPlayInterval={2000}
             activeIndex={sliderState}
             
             responsive={{
               0: { items: 1 },
               550: { items: 1 },
               1050: { items: 3 },
             }}
             onSlideChanged={(e) => {
               setsliderState(e?.item);
             }}
             ref={sliderRef}
           
             className="w-full "
             items={ items.map((e: any) => {
              return <div key={e.content} className='mx-3 h-[400px] p-6 bg-dark_blue border-2  border-blue rounded-md  flex flex-col justify-between gap-10'>

                <p className='flex-1 text-[16px] text-white text-justify'>  <>
                          &quot;
                         {e.content.length>500? `${e.content.substring(0,380)}...`:e.content}&quot;
                        </></p>
                <div className='flex flex-col items-end'>
            <h3 className='font-medium text-blue text-lg'>-{e.authorName}</h3>
            <p className='text-[16px] text-white'>{e.companyName}</p>
                </div>
              </div>
            })}
             renderDotsItem={({ isActive }) => {
               if (isActive) {
                 return (
                   <div className="inline-block cursor-pointer rounded-[50%] h-4 bg-custom_blue" />
                 );
               }
               return (
                 <div
                   className="inline-block cursor-pointer rounded-[50%] h-4 bg-custom-yellow w-4"
                   role="button"
                   tabIndex={0}
                 />
               );
             }}
           />
         </div>

         <div className="flex flex-row justify-center">

           <PagerIndicator
             className="flex h-4 "
             count={items.length}
             activeCss="inline-block cursor-pointer rounded-[50%] h-4 bg-blue w-4"
             activeIndex={sliderState}
             inactiveCss="inline-block cursor-pointer rounded-[50%] box-border border-2 h-4 border-blue w-4"
             sliderRef={sliderRef}
             selectedWrapperCss="inline-block mx-[6.50px]"
             unselectedWrapperCss="inline-block mx-[6.50px]"
           />
         </div>
    

    </main>

  )
}
