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
import ProfileLayout from "@/components/profile_components/profile_layout";
import { useRouter } from "next/router";


export default function Profile() {
    const router = useRouter();
    return (
        <ProfileLayout>
            <main className="w-full h-full flex flex-col">
                <h2 className="text-lg font-bold text-normal_white">Dashboard</h2>
                <section className="mt-9 flex gap-5">
                    <div onClick={(e)=>router.push("/profile/my-learning")} className="w-60 h-32 rounded-lg flex flex-col justify-center items-center gap-3 bg-light_green"><p className="text-[16px] font-bold text-black">My Learning</p>
                        <img


                            className="h-10 w-15"
                            src="/my_courses.png" />
                    </div>
                    <div onClick={(e)=>router.push("/profile/my-webinar")} className="w-60 h-32 rounded-lg flex flex-col justify-center items-center gap-3 bg-blue"><p className="text-[16px] font-bold text-black">My Schedules/Webinar</p>
                        <img


                            className="h-10 w-15"
                            src="/my_webinar.png" />
                    </div>
                   
                </section>
            </main>
        </ProfileLayout>
    );
}
