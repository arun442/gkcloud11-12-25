import React, { Fragment, useState,useEffect } from 'react'
import MainHeading from '../helpers/heading/main_heading'

import Carousel from "react-multi-carousel";

import api from '@/helpers/intercepter';



export default function TestimonialComponent() {
    const [items,setItems]=useState([]);
 
    useEffect(() => {
     
      fetchData();
      
    }, [])
    const fetchData=async()=>{
        try {
          const result = await api.get('/testimonial');
         console.log("what is the result");
         console.log(result.data.testimonials);
      
      
         setItems(result.data.testimonials);
        } catch (error) {
       
        }
      }
      const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3,
          slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
          slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        }
      };
    const classItems = [
        {
            image: "url",
            title: "1-on-1 Training",
            desc: "Schedule personalized sessions based upon your availability."

        }, {
            image: "url",
            title: "Customized Training",
            desc: "Tailor your learning experience. Dive deeper in topics of greater interest to you."

        }, {
            image: "url",
            title: "4-Hour Sessions",
            desc: "Optimize learning with GKCS 4-hour sessions, balancing knowledge retention and time constraints."

        }, {
            image: "url",
            title: "Free Demo Class",
            desc: "Join our training with confidence. Attend a free demo class to experience our expert trainers and get all your queries answered."

        }
    ];

    return (
        <main className='flex flex-col justify-center items-center gap-14'>
            <MainHeading text='What They Say About Courses'/>
            <Carousel
  swipeable={false}
  draggable={false}
  showDots={true}
  responsive={responsive}
  ssr={true} // means to render carousel on server-side.
  infinite={true}
  autoPlay={ true}
  autoPlaySpeed={1000}
  keyBoardControl={true}
  customTransition="all .5"
  transitionDuration={500}

  removeArrowOnDeviceType={["tablet", "mobile"]}
  
  dotListClass="custom-dot-list-style"
 
>
{
   
   classItems.map((e)=>{
       return <div key={e.title} className='p-6 bg-dark_blue border-2  border-blue rounded-md  h-[200px] flex flex-col justify-center gap-10'>
           <h3 className='text-3xl font-medium text-center text-blue'>{e.title}</h3>
           <p className='text-lg text-white'>{e.desc}</p>
       </div>
   })

}
</Carousel>
          
        </main>
       
    )
}
