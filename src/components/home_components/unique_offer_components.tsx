import React, { Fragment, useState, useEffect } from 'react'
import MainHeading from '../helpers/heading/main_heading'
import { axiosPublic } from '@/common/axiosPublic';
import { Container ,Button,Card } from 'react-bootstrap';
import Slider from "react-slick";
import groun320 from './Group 320.png'
import img2 from '../../../public/Group 465.png';
import img3 from '../../../public/Group 467.png';
// import 'bootstrap/dist/css/bootstrap.min.css';

import { commonbasePath } from "@/common/constants";




export default function UnqueOfferComponent() {

  const [items, setItems] = useState([]);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed: 2000,
  
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        },
        {
            breakpoint: 900,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              initialSlide: 1
            }
          },
        {
          breakpoint: 680,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 1
          }
        },

    ]
  };
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
  const basePath  = commonbasePath;


  return (
    <main className='flex flex-col justify-center items-center gap-14 mt-24'>
      <div className='text-[#419CFD] w-full text-center flex items-center justify-center text-xl md:text-4xl font-semibold'>
        <span>What makes us Unique</span>
        {/* <span>Learning as Custom as Your  </span>
        <div className='bg-black px-2 rounded-xl mx-2'>
        <img src='./netflix1.png'alt="Netflix" style={{height:"80px"}}/>

        </div>
         <span>  Recommendations</span> */}
         </div> 
       <section className=" w-full md:grid-cols-2 gap-4">
       {/* {

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

        } */}
        <div    >

       
            <Slider {...settings}  >
              {
                items.map((e:any)=>{
               return <div>
                  <div style={{border:'1px solid #192043',padding:"10px",backgroundImage:'linear-gradient(#00051F 40%, #192043)',borderRadius:"10px",color:'white',width:'250px',height:'400px'}} >
                  <div style={{display:'flex',flexDirection:'column',alignItems:'end'}}>
                  <div style={{backgroundColor:'#419CFD',borderRadius:"15px",width:'fit-content',padding:'5px',margin:'auto',fontSize:"16px"}}>{e.serviceTitle}</div>
                  <img src={e.serviceShortName=="Custom"?img2.src:e.serviceShortName=="Hourly"?img3.src: e.serviceTitle=="AI Agent"?`${basePath}/stu1.png`: groun320.src} style={{padding:'40px',height:`${e.serviceTitle=="AI Agent"?"180px":"180px"}`,margin:"auto"}}/>
                    <div style={{fontSize:"14px"}} className='text-justify'>
                    {e.serviceDescription}
                    </div>
                  </div>
                </div> 
                 </div>
                })
              }
              
      

    </Slider>
    </div>
    </section> 

    </main>

  )
}
