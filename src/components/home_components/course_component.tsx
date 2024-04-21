
import { useState, useEffect } from 'react'
import CourseCard from "../helpers/card/course_card_component";
import { axiosPublic } from '@/common/axiosPublic';
import usePopular from '@/hooks/statics_mode_hook';
import PopularCourseCard from '../helpers/card/popular_course_card_component';






const CourseComponent: React.FC = () => {
const { data, isLoading }= usePopular();
  return (


    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

      {
        data.map((e: any,index) => {
          return <PopularCourseCard data={e} key={index} />
        })
      }




    </div>
  )
}

export default CourseComponent;







