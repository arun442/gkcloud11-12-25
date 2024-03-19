import Header from "@/components/helpers/header";
import Image from "next/image";
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import HomePageMainContainer from "@/components/home_components/home_container";
import ExploreCourseComponent from "@/components/home_components/explore_course_compoent";

export default function Home() {
  return (
    <main
      className={`max-w-7xl mx-auto bg-primary_color sm:px-14`}
    >
   <div className="w-full flex flex-col h-screen ">
   <Header/>
    <HomePageMainContainer/>
  
   </div>
   <ExploreCourseComponent/>
    </main>
  );
}
