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
import RecentViewCourseCard from "@/components/profile_components/recent_view_course_card";
import useUserData from "@/hooks/userData";
import CompletedCourseCard from "@/components/profile_components/completed_course_card";

export default function Index() {
    let [course, setCourse] = useState<any[]>([]);
    useEffect(() => {

        fetchCourse();



    }, [])

    const fetchCourse = async () => {
        try {
            const result = await axiosPrivate.get('/user/user-course');

            setCourse(result.data);






        } catch (error) {

        }
    }
    const router = useRouter();
    const [index, setIndex] = useState(0);
    const { userData, } = useUserData();
    const [userProgress, setUserProgress] = useState<any>([]);
    const fetchUserProgress = async () => {
        try {
            const response = await axiosPrivate.get("/user/user-course-progress", {
                params: {

                    "userId": userData.userId

                }
            });

            const userCourseProgress = (response?.data?.userCourseProgresses ?? []);
            setUserProgress(userCourseProgress);


        } catch (error) {

        }
    }
    useEffect(() => {
        fetchUserProgress();


    }, [userData]);

    const sortByDate = (data: any) => {
        const sortedEventsDesc = data.sort((a: any, b: any) => {
            const dateA: any = new Date(a.progressDate);
            const dateB: any = new Date(b.progressDate);
            return dateB - dateA; // Descending order
        });
        return sortedEventsDesc;
    }
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
                <div className={classNames("w-full cursor-pointer text-[16px]  flex flex-row justify-start items-center text-white mt-10 gap-16")}>
                    <div className={index != 0 ? "font-normal" : "border-b-2 font-semibold"} onClick={(e) => {

                        setIndex(0)
                    }}>
                        All Courses
                    </div>

                    <div className={index != 1 ? " font-normal" : "border-b-2 font-semibold"} onClick={(e) => {
                        setIndex(1)

                    }}>
                        Recently Viewed
                    </div>
                    <div className={index != 2 ? " font-normal" : "border-b-2 font-semibold"} onClick={(e) => {
                        setIndex(2)

                    }}>
                        Completed
                    </div>

                </div>
                {index == 0 && <div className="w-full grid grid-cols-3 gap-6 mt-8">

                    {
                        course.map((e: any, index) => {
                            return <MyCourseCard key={index} data={e} />
                        })
                    }




                </div>}
                {index == 2 && <div className="w-full grid grid-cols-1 gap-6 mt-8">

                    {
                        (userProgress.filter((e: any) => e.courseStatus == "Completed")).map((e: any, index: any) => {
                            return < CompletedCourseCard key={index} data={course.filter((data) => data.Course.courseId == e?.courseId)[0]} percentage={e?.autoCalculatedProgressPercentage ?? "0"} />
                        })
                    }




                </div>}
                {index == 1 && <div className="w-full grid grid-cols-1 gap-6 mt-8">

                    {
                        course.length != 0 && userProgress.length != 0 ?(sortByDate(userProgress).map((progress:any,index:any)=> <RecentViewCourseCard key={index} data={course.filter((e) => e.Course.courseId == progress?.courseId)[0]} percentage={progress?.autoCalculatedProgressPercentage ?? "0"} />)) : <></>
                    }




                </div>}
            </main>
        </ProfileLayout>
    );
}
