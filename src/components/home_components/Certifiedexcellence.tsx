import React, { Fragment, useState,useEffect } from 'react'
import MainHeading from '../helpers/heading/main_heading'
import { axiosPublic } from '@/common/axiosPublic';
import useTrainingMode from '@/hooks/training_mode_hook';
import { motion } from "framer-motion"

import { commonbasePath } from "@/common/constants";

export default function Certifiedexcellence() {
    const basePath  = commonbasePath;


    
    return (
        < div className='mt-24'>
                 <MainHeading  text='Industry Recognition' color="white"/>

         <main className="w-full relative mt-20 rounded-lg p-2 flex justify-center items-center  flex-col gap-4 md:flex-row   "  style={{height:"100%"}} >

       <div className=' w-10/12  flex justify-center '>
       <motion.div
       initial={{x:-100}}
       whileInView={{x:0}}
       transition={{ type: "spring", duration: 1 }}
       className='bg-light_blue p-2 gap-2  rounded-xl flex-row justify-center items-center w-10/12' >
       <div className='flex justify-center'  >
       <img src={`${basePath}/nasscom3.png`} alt="ISO/IEC 27018:2019"  style={{height:"50px"}}/>

        </div>
</motion.div>
       </div>
       <div className='h-16 w-[4px] rounded-lg bg-white md:block lg:block xl:block hidden '></div>

       <div className=' w-10/12  flex justify-center'>
       <motion.div
            initial={{x:100}}
            whileInView={{x:0}}
            transition={{ type: "spring", duration: 1 }} className='bg-light_blue p-2 hidden md:flex gap-2 lg:flex rounded-xl justify-center items-center w-10/12 ' >
       <div className='flex justify-start '  >
       <img src={`${basePath}/iso.png`} alt="ISO/IEC 27018:2019" className='h-28 md:h-14 lg:h-14 xl:h-14'/>
        </div>
<div className='mt-2 font-bold text-xl text-[#B11F2A]'>ISO/IEC 27018:2019 Certification</div>
</motion.div>
<div      
       className='bg-light_blue p-4  gap-2   rounded-xl flex sm:hidden items-center w-10/12 ' >
       <div className='flex justify-start '  >
       <img src={`${basePath}/iso.png`} alt="ISO/IEC 27018:2019" />

        </div>
<div className='mt-2 font-bold text-xl text-[#B11F2A]'>ISO/IEC 27018:2019 Certification</div>
</div>
       </div>  

        </main>
    

        </div>
       
    )
}
