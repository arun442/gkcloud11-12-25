import Header from "@/components/helpers/header";
import Image from "next/image";
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Footer from "@/components/helpers/Footer";
import CourseDetailContainer from "@/components/course_detail_components/course_detail_component";

export default function Schedule() {
  return (
    <main
      className={`max-w-7xl mx-auto bg-primary_color sm:px-20 flex flex-col gap-10`}
    >
   <Header/>
  <CourseDetailContainer/>
  <Footer/>
    </main>
  );
}
