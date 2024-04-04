import Header from "@/components/helpers/header";
import Image from "next/image";
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Footer from "@/components/helpers/footer";
import CourseContainer from "@/components/course_components/course_container";
import AboutContainer from "@/components/about_components/about_container";

export default function Schedule() {
  return (
    <main
      className={`max-w-7xl mx-auto bg-primary_color xl:px-0 sm:px-20 flex flex-col gap-10`}
    >
   <Header/>
   <AboutContainer/>
  <Footer/>
    </main>
  );
}
