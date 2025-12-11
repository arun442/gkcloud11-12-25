import Header from "@/components/helpers/header";
import Image from "next/image";
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Footer from "@/components/helpers/footer";

import { axiosPublic } from "@/common/axiosPublic";
import CertificateDetailContainer from "@/components/certificate_detail_components/certificate_detail_component";
import Marquee from "@/components/helpers/Marquee";
import Head from 'next/head';
import { commonbasePath } from "@/common/constants";
export async function getServerSideProps(context:any) {
  
  // Fetch data from external API
  try {
    const id = context.params.courseId ;
    const result = await axiosPublic.get("/lms/certificate-course",{
      params:{
        slug:id
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
    <>
      <Head>
      <title>{data.seoSchema?data.seoSchema.metaTitle:data.title}</title>
        <link rel="icon" href={`${commonbasePath}/favicon.ico`} />
        <link rel="canonical" href={data.slug}/>
        <meta name="robots" content="index, follow"/>
        <meta name="description" content={data.seoSchema?data.seoSchema.metaDescription:data.metaDescription} />
        <meta name="keywords" content={data.seoSchema?data.seoSchema.keywords:data.metaKeyword} />
        <meta property="og:title" content={data.title} />
        <meta property="og:description" content={data.metaDescription} />
        <meta property="og:image" content={data.image} />
        <meta property="og:url" content={data.url} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={data.title} />
        <meta name="twitter:description" content={data.metaDescription} />
        <meta name="twitter:image" content={data.image} />
           {/* Schema.org Markup */}
           {data.seoSchema?
           
           data.seoSchema.schemaTags?
            Object.keys(data.seoSchema.schemaTags).map((key) => (
 
            <script
           type="application/ld+json"
           dangerouslySetInnerHTML={{
             __html:JSON.stringify(data.seoSchema.schemaTags[key])
           }}
         />
       )):null:
       <script
       type="application/ld+json"
       dangerouslySetInnerHTML={{
         __html:JSON.stringify({
           "@context": "https://schema.org",
           "@type": "Organization",
           "name": "GKCloud.ai",
           "url": "https://gkcloud.ai/",
           "logo": "https://gkcloud.ai/logo.png",
           "sameAs": [
             "https://www.facebook.com/gkcloud",
             "https://twitter.com/gkcloud"
           ],
           "contactPoint": {
             "@type": "ContactPoint",
             "contactType": "Customer Service",
             "telephone": "+91 9364893718",
             "email": "support@gkcloud.ai"
           }
         })
       }}
     />
     }

    
      </Head>
    <div className="w-full">
        <Marquee/>
    <main
      className={`relative w-full lg:max-w-7xl lg:mx-auto h-auto px-5 md:px-14 lg:px-20 xl:px-0 flex flex-col`}
    >
   <Header/>
  < CertificateDetailContainer data={data}/>
  <Footer/>
    </main>
    </div>
    </>
  );
}
