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
import MyAchivementCard from "@/components/profile_components/my_achivement_card";
import moment from "moment";


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
                <h2 className="text-xl font-medium text-normal_white">Purchase History</h2>
                <div className="flex-1 w-full grid grid-cols-1 gap-6 mt-8">

                    <table className=" border-text_grey_one  mt-6 w-full">
                        <thead className='border-b-[0.25px] border-t-[0.25px] border-text_grey_one'>
                            <tr >
                                <th className=" border-text_grey_one text-base text-white font-normal py-6"></th>
                                <th className=" border-text_grey_one text-base text-white font-normal py-6">Date</th>
                                <th className=" border-text_grey_one text-base text-white font-normal">Total Price</th>
                                <th className=" border-text_grey_one text-base text-white font-normal">Payment Type</th>
                                <th className=" border-text_grey_one text-base text-white font-normal py-6"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                course.map((e: any, index: any) => {
                                    return <tr className="h-20 border-b-[0.25px] border-text_grey_one" key={index}>

                                        <td className=" py-2 text-sm text-blue  w-44">

                                            {e.Course.title}
                                        </td>
                                        <td className=" font-medium text-sm text-table_font text-center p-2">{moment(new Date(e.enrollmentDate)).format("DD MMM YYYY")}</td>
                                        <td className=" font-medium text-sm text-table_font text-center p-2">1000 </td>
                                        <td className=" font-medium text-sm text-table_font text-center p-2">1500 UPI</td>
                                        <td className=" font-medium text-sm text-table_font text-center  ">
                                           <section className="flex gap-2 justify-end">
                                           <div className="border-[0.25px] text-xs font-normal py-1 px-2">
                                                Receipt
                                            </div>
                                            <div className="border-[0.25px] text-xs font-normal py-1 px-2">
                                              Invoice
                                            </div>
                                           </section>
                                        </td>
                                    </tr>
                                })
                            }

                        </tbody>
                    </table>




                </div>
            </main>
        </ProfileLayout>
    );
}
