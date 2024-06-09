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


export default function Index() {
    let [course, setCourse] = useState<any[]>([]);
    useEffect(() => {

        fetchCourse();



    }, [])

    const fetchCourse = async () => {
        try {
            const result = await axiosPrivate.get('/user/user-course');
console.log("what is the course");
console.log(result.data);
            setCourse(result.data);






        } catch (error) {

        }
    }
    const router = useRouter();
    return (
        <ProfileLayout>
            <main className="w-full h-full flex flex-col">
                <div className="flex flex-row gap-1 items-center">
                    <p className="cursor-pointer text-blue text-base font-medium" onClick={(e) => {

                        router.back();
                    }}>Dashboard</p>
                    <ChevronRightIcon className="text-text_grey_one h-4 w-4" />
                    <p className="cursor-pointer text-text_grey_one text-base font-medium">My Learning</p>
                </div>
                <div className="w-full grid grid-cols-3 gap-6 mt-8">

{
  course.map((e: any, index) => {
    return  <MyCourseCard  key={index} data={e} />
  })
}




</div>
            </main>
        </ProfileLayout>
    );
}
