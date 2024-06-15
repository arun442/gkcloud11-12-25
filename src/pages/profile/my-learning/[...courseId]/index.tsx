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
import { axiosPublic } from "@/common/axiosPublic";
import { useState, useEffect } from "react";
import PlayerComponent from "@/components/player_components/player_component";
import ModuleList from "@/components/player_components/module_list_component";
import { axiosPrivate } from "@/common/axiosPrivate";


export async function getServerSideProps(context: any) {

  // Fetch data from external API
  try {
    const id = context.params.courseId;

    const result = await axiosPublic.get("/lms/course-details", {
      params: {
        courseId: id
      }
    })


    if (result.data.courses.length == 0) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }

    return { props: { modules: result.data.courses[0]?.CourseContent?.courseContent?.course?.courseDetails?.content?.modules ?? [], id: id } }
  } catch (error) {
    console.log("what is the Erro", error);
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
}
export default function Player({ modules, id }: { modules: any, id: any }) {


  const [selectedItem, setSelectedItem] = useState(null);

  // useEffect(() => {
  //   // If the initial selectedItem is null, set it to the first item of the first module
  //   if (!selectedItem && modules.length > 0 && (modules[0].moduleitems??[]).length > 0) {
  //     setSelectedItem(modules[0].moduleitems[0]);
  //   }
  // }, [selectedItem, modules]);

  const fetchUserProgress = async () => {
    try {
      const response = await axiosPrivate.get("/user/user-course-progress", {
        params: {
          courseId: id
        }
      });
      const userCourseProgress = response?.data?.userCourseProgresses ?? [];
      setSelectedItem(userCourseProgress.length == 0 ? modules[0]?.moduleItems[0]?.moduleItemDetails ? modules[0]?.moduleItems[0].moduleItemDetails[0] : modules[0]?.moduleItems[0].details[0]
        : modules[userCourseProgress[0].moduleId - 1]?.moduleItems[userCourseProgress[0].moduleItemId - 1]?.moduleItemDetails ? modules[userCourseProgress[0].moduleId - 1]?.moduleItems[userCourseProgress[0].moduleItemId - 1].moduleItemDetails[0] : modules[userCourseProgress[0].moduleId - 1]?.moduleItems[userCourseProgress[0].moduleItemId - 1].details[0]);

    } catch (error) {

    }
  }

  useEffect(() => {
    fetchUserProgress();


  }, [])



  return (
    <main
      className={`relative w-full  h-screen px-5 flex flex-col`}
    >
      <div className="w-full flex h-full">
        <div className="w-[70%] h-full">
          <PlayerComponent item={selectedItem}  />
        </div>
        <div className="w-[30%] h-full">
          <ModuleList modules={modules} onSelectItem={setSelectedItem} />
        </div>
      </div>
      <section></section>
    </main>
  );
}
