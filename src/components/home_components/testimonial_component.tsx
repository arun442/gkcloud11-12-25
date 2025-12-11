import React, { Fragment, useState, useEffect } from 'react'
import MainHeading from '../helpers/heading/main_heading'
 
 
import { axiosPublic } from '@/common/axiosPublic';
import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";
 
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
     
 
 
      setItems(result.data.testimonials);
    } catch (error) {
 
    }
  }
 
  const sliderRef = React.useRef(null);
  const [sliderState, setsliderState] = React.useState(0);
  interface Testimonial {
    testimonialURL: string; // Assuming this is the image URL
    authorName: string;
    companyName: string;
    content: string;
  }
  const reviews = [
    {
      name: "Jack",
      username: "@jack",
      body: "I've never seen anything like this before. It's amazing. I love it.",
      img: "https://avatar.vercel.sh/jack",
    },
    {
      name: "Jill",
      username: "@jill",
      body: "I don't know what to say. I'm speechless. This is amazing.",
      img: "https://avatar.vercel.sh/jill",
    },
    {
      name: "John",
      username: "@john",
      body: "I'm at a loss for words. This is amazing. I love it.",
      img: "https://avatar.vercel.sh/john",
    },
    {
      name: "Jane",
      username: "@jane",
      body: "I'm at a loss for words. This is amazing. I love it.",
      img: "https://avatar.vercel.sh/jane",
    },
    {
      name: "Jenny",
      username: "@jenny",
      body: "I'm at a loss for words. This is amazing. I love it.",
      img: "https://avatar.vercel.sh/jenny",
    },
    {
      name: "James",
      username: "@james",
      body: "I'm at a loss for words. This is amazing. I love it.",
      img: "https://avatar.vercel.sh/james",
    },
  ];
  const firstRow:Testimonial[] = items.slice(0, reviews.length / 2);
const secondRow:Testimonial[] = items.slice(reviews.length / 2);
const ReviewCard :React.FC<Testimonial> = ({
  testimonialURL,
  authorName,
  companyName,
  content,
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        " bg-[#0f172a] hover:bg-gray-950/[.05]",
        // dark styles
        " dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={testimonialURL} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium text-white dark:text-white">
            {authorName}
          </figcaption>
          <p className="text-xs font-medium text-white dark:text-white/40">@{companyName}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm text-white "> &quot;
      {content.length>500? `${content.substring(0,380)}...`:content}&quot;</blockquote>
    </figure>
  );
};
  return (
    <main className='mt-24 w-full flex flex-col justify-center items-center gap-14 overflow-hidden'>
      <MainHeading text='Voices of Our Graduates' color={''} />
      {/* <div className="w-full">
           
           <Slider
             autoPlay
             autoPlayInterval={2000}
             activeIndex={sliderState}
             
             responsive={{
               0: { items: 1 },
               550: { items: 2 },
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
         </div> */}
     <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-[#020617]  ">
      <Marquee pauseOnHover className="[--duration:20s] w-full">
        {firstRow.map((review) => (
          <ReviewCard key={review.authorName} {...review}/>
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s] w-full">
        {secondRow.map((review) => (
          <ReviewCard key={review.authorName} {...review}  />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#00051F] dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-[#00051F] dark:from-background"></div>
    </div>
 
    </main>
 
  )
}
 
 