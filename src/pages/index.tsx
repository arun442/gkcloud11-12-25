import Header from "@/components/helpers/header";
import Image from "next/image";
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import HomePageMainContainer from "@/components/home_components/home_container";
import ExploreCourseComponent from "@/components/home_components/explore_course_compoent";
import ClassesComponent from "@/components/home_components/classes_component";
import WhyUsComponent from "@/components/home_components/why_us_component";
import UnqueOfferComponent from "@/components/home_components/unique_offer_components";
import OurClientComponent from "@/components/home_components/our_client_component";
import TestimonialComponent from "@/components/home_components/testimonial_component";
import NewsLetterComponent from "@/components/home_components/news_letter_component";
import Footer from "@/components/helpers/Footer";

export default function Home() {
  return (
    <main
      className={`relative max-w-7xl mx-auto bg-primary_color sm:px-20 flex flex-col gap-24`}
    >
       {/* <div className="absolute inset-0 bg-cover bg-center  h-screen" style={{backgroundImage: 'url("/bg_dot.png")'}}></div> */}
   <div className="w-full bg-cover bg-center flex flex-col h-screen" >
   <Header/>
    <HomePageMainContainer/>
  
   </div>
   <ExploreCourseComponent/>
   <ClassesComponent/>
   <WhyUsComponent/>
   <UnqueOfferComponent/>
   <OurClientComponent/>


  <TestimonialComponent/>  
   <NewsLetterComponent/>
  <Footer/>
    </main>
  );
}
