
import { useState, useEffect } from 'react'
import CourseCard from "../helpers/card/course_card_component";
import { axiosPublic } from '@/common/axiosPublic';






const CourseComponent: React.FC = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {

    fetchData();

  }, [])



  const fetchData = async () => {
    try {
      const result = await axiosPublic.get('/course-landing');
      console.log("what is the result");
      console.log(result.data.courses);


      setItems(result.data.courses);
    } catch (error) {

    }
  }

  return (


    <div className="w-full grid grid-cols-3 gap-6">

      {
        items.map((e: any) => {
          return <CourseCard />
        })
      }




    </div>
  )
}

export default CourseComponent;







