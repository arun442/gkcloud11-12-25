import { axiosPrivate } from '@/common/axiosPrivate';
import hideDuration from '@/helpers/hide_duration';
import useUserData from '@/hooks/userData';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Metamorphous } from 'next/font/google';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


export default function MyCourseCard({ data }: { data: any }) {
    const router = useRouter();
    const { userData, } = useUserData();
    const [userProgress,setUserProgress]=useState<any>([]);
    const fetchUserProgress = async () => {
        try {
          const response = await axiosPrivate.get("/user/user-course-progress", {
            params: {
              courseId: data.Course.courseId,
              "userId": userData.userId
    
            }
          });
    
          const userCourseProgress = (response?.data?.userCourseProgresses ?? []);
          setUserProgress(userCourseProgress);
         
    
        } catch (error) {
    
        }
      }
      useEffect(() => {
        fetchUserProgress();
    
    
      }, [userData]);
    return <div onClick={(e) => {
      console.log("what is the id", `/profile/my-learning/${data.Course.courseId}`);
        router.push(`/profile/my-learning/${data.Course.courseId}`)
    }} className="cursor-pointer box-border border flex flex-col p-6 justify-start items-start border-blue border-1 bg-dark_blue rounded-2xl">

        <section className='flex-1 flex-col'>
            <div className='w-full flex flex-row justify-between items-center'>
                <p className="text-text_grey text-[12px] font-medium">{data.Course.courseCode}</p>
                {/* <div className="flex flex-row gap-1 mt-2 items-center">
      <img
                                   
                                   className="text-text_grey_one h-4 w-4"
                                   src="/Icon_star.svg"/>
     
        <p className="text-text_grey_one text-base font-medium">{data.CourseRating.defaultRating}</p>
      </div> */}
            </div>
            <h2 className="text-white text-xl font-medium">{data.Course.title}</h2>

{
 userProgress.length!=0&&userProgress[0]?.autoCalculatedProgressPercentage!=null?   <div className='flex mt-2'>
    <p className="text-text_grey text-[12px] font-medium">Completed : </p>
    <p className="text-white text-[12px] font-semibold">{userProgress[0]?.autoCalculatedProgressPercentage}%</p>
    </div>:<></>
}
        </section>

    </div>;
}