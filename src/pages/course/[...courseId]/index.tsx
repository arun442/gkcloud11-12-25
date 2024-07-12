import Header from "@/components/helpers/header";
import Image from "next/image";
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Footer from "@/components/helpers/footer";
import CourseDetailContainer from "@/components/course_detail_components/course_detail_component";
import { axiosPublic } from "@/common/axiosPublic";
import Head from 'next/head';
export async function getServerSideProps(context:any) {
  
  // Fetch data from external API
  try {
    const id = context.params.courseId ;
    const result = await axiosPublic.get("/lms/course-details",{
      params:{
        slug:id
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
    <>
     {/* <Head>
      <title>{data.title}</title>
      <meta name="description" content={data.description} />
      <meta name="keywords" content={data.keywords.join(', ')} />
      <meta property="og:title" content={data.title} />
      <meta property="og:description" content={data.description} />
      <meta property="og:image" content={data.image} />
      <meta property="og:url" content={data.url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={data.title} />
      <meta name="twitter:description" content={data.description} />
      <meta name="twitter:image" content={data.image} />
    </Head> */}
     <main
      className={`max-w-7xl mx-auto bg-primary_color xl:px-0 sm:px-20 flex flex-col gap-10`}
    >
   <Header/>
  <CourseDetailContainer data={data}/>
  <Footer/>
    </main>
    </>
   
  );
}
