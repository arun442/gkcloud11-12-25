import Header from "@/components/helpers/header";
import Image from "next/image";
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Footer from "@/components/helpers/Footer";
import CourseDetailContainer from "@/components/course_detail_components/course_detail_component";
import { axiosPublic } from "@/common/axiosPublic";

export async function getServerSideProps(context:any) {
  
  // Fetch data from external API
  try {
    const id = context.params.courseId ;
    const result = await axiosPublic.get("/lms/course-details",{
      params:{
        courseId:id
      }
    })


  if(result.data.courses.length==0){
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return { props: {data:result.data.courses[0] } }
  } catch (error) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
}
export default function CourseDetails({data}:{data:any}) {
  return (
    <main
      className={`max-w-7xl mx-auto bg-primary_color sm:px-20 flex flex-col gap-10`}
    >
   <Header/>
  <CourseDetailContainer data={data}/>
  <Footer/>
    </main>
  );
}
