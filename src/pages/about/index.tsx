import Header from "@/components/helpers/header";
import Image from "next/image";
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Footer from "@/components/helpers/footer";
import CourseContainer from "@/components/course_components/course_container";
import AboutContainer from "@/components/about_components/about_container";

export default function Schedule() {
  return (
    <main
      className={`relative w-full lg:max-w-7xl lg:mx-auto h-auto px-5 md:px-14 lg:px-20 xl:px-0 flex flex-col`}
    >
   <Header/>
   <AboutContainer/>
  <Footer/>
    </main>
  );
}
