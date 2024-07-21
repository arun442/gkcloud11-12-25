import Header from "@/components/helpers/header";
import Image from "next/image";
import { Bars3Icon, BellIcon, ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/outline'
import HomePageMainContainer from "@/components/home_components/home_container";
import ExploreCourseComponent from "@/components/home_components/explore_course_compoent";
import ClassesComponent from "@/components/home_components/classes_component";
import WhyUsComponent from "@/components/home_components/why_us_component";
import UnqueOfferComponent from "@/components/home_components/unique_offer_components";
import OurClientComponent from "@/components/home_components/our_client_component";
import TestimonialComponent from "@/components/home_components/testimonial_component";
import NewsLetterComponent from "@/components/home_components/news_letter_component";
import Footer from "@/components/helpers/footer";
import CookieConsent from "@/components/helpers/cookie";
import ProfileLayout from "@/components/profile_components/profile_layout";
import { useRouter } from "next/router";
import { axiosPrivate } from "@/common/axiosPrivate";
import { useEffect, useState } from "react";
import MyCourseCard from "@/components/profile_components/my_course_card";
import MyAchivementCard from "@/components/profile_components/my_achivement_card";
import { axiosPublic } from "@/common/axiosPublic";
import WebinarCard from "@/components/helpers/card/webinar_card_component";


export default function Index() {
  
    const router = useRouter();
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {

    fetchData();

  }, [])

  const fetchData = async () => {
    try {
      const result = await axiosPublic.get('/lms/webinar');

      setData(result.data.webinar);
     
    } catch (error) {

    }
  }
    return (
        <ProfileLayout>
            <main className="w-full h-auto flex flex-col">
                <h2 className="text-xl font-medium text-normal_white">Webinars</h2>
{
    data.length==0&& <h2 className='w-full text-center mt-20 text-white text-4xl font-semibold'>{"Coming Soon…"}</h2>
}
                
                <div className="h-auto w-full grid grid-cols-3 gap-6 mt-8">

{
 data.map((e: any, index) => {
    return <WebinarCard key={index} data={e} />
  })
}
</div>
            </main>
        </ProfileLayout>
    );
}
