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
      className={`max-w-7xl mx-auto bg-primary_color xl:px-0 sm:px-20 flex flex-col gap-10`}
    >
   <Header/>
  < CertificateDetailContainer data={data}/>
  <Footer/>
    </main>
  );
}
