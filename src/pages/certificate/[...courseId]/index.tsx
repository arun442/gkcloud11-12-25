import Header from "@/components/helpers/header";
import Image from "next/image";
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Footer from "@/components/helpers/footer";

import { axiosPublic } from "@/common/axiosPublic";
import CertificateDetailContainer from "@/components/certificate_detail_components/certificate_detail_component";

export async function getServerSideProps(context:any) {
  
  // Fetch data from external API
  try {
    const id = context.params.courseId ;
    const result = await axiosPublic.get("/lms/certificate-course",{
      params:{
        certificateCourseId:id
      }
    })


  if(result.data.certificateCourses.length==0){
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return { props: {data:result.data.certificateCourses[0] } }
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
      className={`relative w-full lg:max-w-7xl lg:mx-auto h-auto px-5 md:px-14 lg:px-20 xl:px-0 flex flex-col`}
    >
   <Header/>
  < CertificateDetailContainer data={data}/>
  <Footer/>
    </main>
  );
}
