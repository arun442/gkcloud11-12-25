import Head from 'next/head';
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
import Footer from "@/components/helpers/footer";
import CookieConsent from "@/components/helpers/cookie";
import Marquee from "@/components/helpers/Marquee";

export default function Home() {
  return (
    <div className="w-full">
     
      
      <Marquee />
      <main className={`relative w-full lg:max-w-7xl lg:mx-auto h-auto px-5 md:px-14 lg:px-20 xl:px-0 flex flex-col`}>
        <div className="absolute inset-0 -z-10 bg-cover bg-center h-screen" style={{ backgroundImage: 'url("/bg_dot.png")', opacity: '0.1' }}></div>
        <Header />
        <HomePageMainContainer />
        <ExploreCourseComponent />
        <ClassesComponent />
        <WhyUsComponent />
        <UnqueOfferComponent />
        <OurClientComponent />
        <TestimonialComponent />
        {/* <NewsLetterComponent /> */}
        <Footer />
        <CookieConsent />
      </main>
    </div>
  );
}
