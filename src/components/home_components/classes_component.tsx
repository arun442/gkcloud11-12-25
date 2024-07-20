import React, { Fragment, useState,useEffect } from 'react'
import MainHeading from '../helpers/heading/main_heading'
import { axiosPublic } from '@/common/axiosPublic';
import useTrainingMode from '@/hooks/training_mode_hook';



export default function ClassesComponent() {
  
const {trainingData:data, isLoading}=useTrainingMode();

    
    return (
        <main className="w-full grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-5 mt-24">
{
   data.map((e)=>{
        return <div key={e.trainingModeId} className='p-4 bg-dark_blue border-2  border-blue rounded-md h-[350px] flex flex-col justify-center gap-10'>
            <h3 className='text-xl font-bold text-center text-blue'>{e.trainingModeTitle}</h3>
            {
               e.trainingModeTitle=="Classroom Training"? <p className='text-lg text-white  text-center mb-10'>
               Traditional, <span className="text-nowrap">instructor-led</span> learning in popular global destinations.
             </p>: <p className='text-lg text-white text-wrap text-center mb-10'>{e.trainingModeDescription}</p>
            }
           
        </div>
    })
}
        </main>
    )
}
