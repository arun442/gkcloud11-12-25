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
import classNames from "@/helpers/add_class";
import MyWebinarCard from "@/components/profile_components/my_webinar_card";
import MyScheduleCard from "@/components/profile_components/my_schedule_card";


export default function Index() {
    let [schedule, setSchedule] = useState<any[]>([]);
    let [webinar, setWebinar] = useState<any[]>([]);
    const [index, setIndex] = useState(0);
    useEffect(() => {

        fetchShedule();
        fetchWebinar();


    }, [])

    const fetchShedule = async () => {
        try {
            const result = await axiosPrivate.get('/user/user-course-schedule');
            console.log("what is the course");
            console.log(result.data);
            setSchedule(result.data?.schedules ?? []);
        } catch (error) {

        }
    }
    const fetchWebinar = async () => {
        try {
            const result = await axiosPrivate.get('/user/user-webinar');
            console.log("what is the course");
            console.log(result.data);
            setWebinar(result.data);
        } catch (error) {

        }
    }
    const router = useRouter();
    return (
        <ProfileLayout>
            <main className="w-full h-full flex flex-col">
                <div className={classNames("w-full cursor-pointer text-[16px]  flex flex-row justify-start items-center text-white gap-10")}>
                    <div className={index != 0 ? "font-normal" : "border-b-2 font-semibold"} onClick={(e) => {

                        setIndex(0)
                    }}>
                        Schedules
                    </div>

                    <div className={index != 1 ? " font-normal" : "border-b-2 font-semibold"} onClick={(e) => {
                        setIndex(1)

                    }}>
                        Webinars
                    </div>

                </div>
                <div className="w-full ">

                    {
                        index == 0 ? <div className="w-full grid grid-cols-3 gap-6 mt-8">

                            {
                                schedule.map((e: any, index) => {
                                    return <MyScheduleCard key={index} data={e} />
                                })
                            }




                        </div> : <div className="w-full grid grid-cols-3 gap-6 mt-8">

                            {
                                webinar.map((e: any, index) => {
                                    return <MyWebinarCard key={index} data={e} />
                                })
                            }




                        </div>
                    }




                </div>
            </main>
        </ProfileLayout>
    );
}
