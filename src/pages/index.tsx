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
      <Head>
        <title>Become an AI Expert: Top-Rated AI Training Courses Online | GK Cloud</title>
        <meta name="description" content="Unlock the power of AI with our expert-led online courses. Gain in-demand skills and become an AI specialist. Comprehensive training covers ML, DL, NLP etc." />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Become an AI Expert: Top-Rated AI Training Courses Online | GK Cloud" />
        <meta property="og:description" content="Unlock the power of AI with our expert-led online courses. Gain in-demand skills and become an AI specialist. Comprehensive training covers ML, DL, NLP etc." />
        <meta property="og:image" content="" />
        <meta property="og:url" content="https://gkcloud.ai/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="GK Cloud" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Become an AI Expert: Top-Rated AI Training Courses Online | GK Cloud" />
        <meta name="twitter:description" content="Unlock the power of AI with our expert-led online courses. Gain in-demand skills and become an AI specialist. Comprehensive training covers ML, DL, NLP etc." />
        <meta name="twitter:image" content="" />
        
        {/* Organization Schema */}
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "GKCloud.ai",
            "url": "https://gkcloud.ai/",
            "logo": "https://gkcloud.ai/images/logo.png",
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
          }`}
        </script>
        
        {/* Website Schema */}
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "GKCloud.ai",
            "url": "https://gkcloud.ai/",
            "description": "Unlock the power of AI with our expert-led online courses. Gain in-demand skills and become an AI specialist. Comprehensive training covers ML, DL, NLP etc.",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://gkcloud.ai/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          }`}
        </script>
        
        {/* Educational Organization Schema */}
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "GKCloud.ai",
            "url": "https://gkcloud.ai/",
            "description": "GKCloud.ai offers advanced training and educational resources in artificial intelligence and machine learning.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "GK Cloud Solutions Pvt Ltd, IndiQube Penta, New No. 51, Richmond Road",
              "addressRegion": "Bengaluru",
              "postalCode": "560025",
              "addressCountry": "India"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "Customer Service",
              "telephone": "+91 9364893718",
              "email": "support@gkcloud.ai"
            }
          }`}
        </script>
      </Head>
      
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
