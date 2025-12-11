"use client";
import React, { Fragment, useState,useRef } from 'react'
import MainHeading from '../helpers/heading/main_heading'
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';
import { motion,useScroll ,useSpring,useMotionValueEvent ,useTransform} from "framer-motion"
import { commonbasePath } from "@/common/constants";


export default function WhyUsComponent() {
    const whyusref = useRef(null);








      const basePath  = commonbasePath;


    const items = [
        {
            image: "/streaming.png",
            title: 50,
            desc: "Online Courses"

        }, {
            image:  "/degree.png",
            title: 1000,
            desc: "Active Students"

        }, {
            // image:  "/classroom.png",
            image:  "/online-learning.png",

            title: 15,
            desc: "Instructors"

        }, {
            image:  "/certification.png",
            title: 50,
            desc: "Certifications"

        }
    ];

    return (
        <motion.div  >


        <main className='flex flex-col justify-center items-center gap-14 mt-4 '  >
            <MainHeading text='Your Future, Our Focus: Discover Our Commitment' color={'#8ec13f'}/>
            <section className=" w-full  lg:px-14  grid grid-cols-2 lg:grid-cols-4 gap-2  items-start justify-around" >
{
    items.map((e,index)=>{
        return <div key={e.title} className='flex flex-col justify-center items-center'>
             <motion.div
             initial={{ opacity: 1,y:100 }}
             whileInView={{ opacity: 1,y:0 }}
             transition={{ duration: 0.4 }}
            >
            <div className='w-32 h-32 mb-3 rounded-full bg-[#8ec13f] flex items-center justify-center'>
            <img
                                 alt={e.desc}  
                                        className="h-14 w-auto"
                                        src={`${basePath}${e.image}`}/>
                                        
            </div>
            </motion.div>
            <motion.div
             initial={{ opacity: 1,y:100 }}
             whileInView={{ opacity: 1,y:0 }}
             transition={{ duration: 0.5 }}
            >
            <div className='text-4xl font-bold text-center text-white'>
            <CountUp enableScrollSpy end={e.title} /> <span>+</span>
          </div>
           
            <p className='text-lg text-white font-medium text-center mb-10'>{e.desc}</p>
            </motion.div>
        </div>
    })
}
        </section>
        </main>
        </motion.div>
    )
}
