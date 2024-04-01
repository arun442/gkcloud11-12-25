import React, { Fragment, useState,useEffect } from 'react'
import MainHeading from '../helpers/heading/main_heading'
import { axiosPublic } from '@/common/axiosPublic';

axiosPublic



export default function ClassesComponent() {
    const [data, setData] = useState<any[]>([]);
    useEffect(() => {
  
      fetchData();
  
    }, [])
  
    const fetchData = async () => {
      try {
        const result = await axiosPublic.get('/lms/service');
        console.log("what is the result");
        console.log(result.data);
        setData(result.data.service);
      } catch (error) {
  
      }
    }

    
    return (
        <main className="w-full grid grid-cols-4 gap-2">
{
   data.map((e)=>{
        return <div key={e.serviceId} className='p-4 bg-dark_blue border-2  border-blue rounded-md h-[450px] flex flex-col justify-center gap-10'>
            <h3 className='text-xl font-bold text-center text-blue'>{e.serviceTitle}</h3>
            <p className='text-lg text-white text-center mb-10'>{e.serviceDescription}</p>
        </div>
    })
}
        </main>
    )
}
