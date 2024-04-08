import { axiosPublic } from '@/common/axiosPublic';
import { useRouter } from 'next/navigation';
import React, { Fragment, useEffect, useState } from 'react'
import ScheduleCard from '../helpers/card/schedule_card_component';


export default function CourseScheduleComponent({ courseId }: { courseId: any }) {
    const [data, setData] = useState<any[]>([]);
    const router = useRouter();
    useEffect(() => {

        fetchData();

    }, [])

    const fetchData = async () => {
        try {
            const result = await axiosPublic.get('/lms/course-schedule', {
                params: {
                    courseId
                }
            });
          
            setData(result.data.courses);
        } catch (error) {

        }
    }

    return (
        <main className="w-full flex flex-row items-center justify-center">
  {
        data.map((e: any,index) => {
            if(e.CourseSchedules.length==0){
                return <></>
            }
            return <ScheduleCard data={e} key={index} type={e}/> 
          })
        }


        </main>
    )
}
