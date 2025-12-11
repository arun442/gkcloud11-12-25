import { Fragment, useState, useEffect, useRef } from "react";
import usePartnerMode from "@/hooks/partner_mode_hook";
import { axiosPublic } from "@/common/axiosPublic";
import { useRouter } from "next/navigation";
import classNames from "@/helpers/add_class";
import { Transition } from "@headlessui/react";
import Header from "@/components/helpers/header";
import HomePageMainContainer from "@/components/home_components/home_container";
import ExploreCourseComponent from "@/components/home_components/explore_course_compoent";
import ClassesComponent from "@/components/home_components/classes_component";
import WhyUsComponent from "@/components/home_components/why_us_component";
import UnqueOfferComponent from "@/components/home_components/unique_offer_components";
import OurClientComponent from "@/components/home_components/our_client_component";
import TestimonialComponent from "@/components/home_components/testimonial_component";
import Footer from "@/components/helpers/footer";
import CookieConsent from "@/components/helpers/cookie";
import Marquee from "@/components/helpers/Marquee";
// import { TextParallaxContentExample } from "@/components/stu/stu";
import { commonbasePath } from "@/common/constants";

const Navbar = () => {
  const [isProgramsHovered, setIsProgramsHovered] = useState(false);
  const [isProgramsOpen, setIsProgramsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const basePath  = commonbasePath;
  const router = useRouter();
  const [isLoading, setLoading] = useState(true);
  let [course, setCourse] = useState<any[]>([]);
  let [selectedCat, setSelectedCat] = useState("All Courses");
  let courseList = useRef<any[]>([]);
 
  const shuffle = (array: any[]) => {
    return array.sort(() => Math.random() - 0.5);
  };
 
  const fetchCourse = async () => {
    try {
      setLoading(true);
      const result = await axiosPublic.get("/lms/course");
      const shuffleCourses = shuffle(result.data.courses);
      setCourse(shuffleCourses);
 
      courseList.current = shuffleCourses;
      setCourse(
        courseList.current.filter(
          (e: any) => e.partnerId == partnerData[0].partnerId
        )
      );
      setSelectedCat(partnerData[0].partnerName);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
 
  const { partnerData } = usePartnerMode();
 
  useEffect(() => {
    if (partnerData.length != 0) {
      fetchCourse();
    }
  }, [partnerData]);
 
  const handleMouseEnter = () => {
    setIsProgramsOpen(true);
  };
 
  const handleMouseLeave = () => {
    setIsProgramsOpen(false);
  };
 
  return (
    <div className="relative h-auto z-10">
      <nav className="bg-none text-white p-4 flex items-center justify-between w-full z-30 relative transition-all duration-300 ease-in-out">
        <div className="flex items-center">
          <img src={`${basePath}/logo.png`} alt="Logo" className="w-auto h-14 mr-4" />
          <ul className="flex space-x-8">
            <li
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <p className="hover:text-gray-400 cursor-pointer">Programs</p>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">
                Webinars
              </a>
            </li>
          </ul>
        </div>
      </nav>
 
      <div
        ref={dropdownRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Transition
          as={Fragment}
          show={isProgramsOpen}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <div className="mx-auto">
            <ul className="flex flex-col gap-5 ml-10 h-auto">
              <div className=" w-full h-auto flex flex-row overflow-hidden bg-[#15205e] rounded-lg text-sm leading-6 shadow-lg">
                <div className="w-1/4">
                  {[...partnerData].map((item) => (
                    <div
                      onClick={() => {
                        setSelectedCat(item.partnerName);
                        setCourse(
                          courseList.current.filter(
                            (e) => e.partnerId == item.partnerId
                          )
                        );
                      }}
                      key={item.partnerName}
                      onMouseEnter={() => {
                        setSelectedCat(item.partnerName);
                        setCourse(
                          courseList.current.filter(
                            (e) => e.partnerId == item.partnerId
                          )
                        );
                      }}
                      className={classNames(
                        "cursor-pointer group relative flex flex-col gap-x-6 p-4 justify-center hover:bg-light_blue",
                        selectedCat == item.partnerName ? "bg-white" : ""
                      )}
                    >
                      <div className="flex-1 group">
                        <a
                          className={classNames(
                            "font-normal text-black group-hover:text-blue",
                            selectedCat == item.partnerName
                              ? "text-blue"
                              : "text-white"
                          )}
                        >
                          {item.partnerName}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
                <section className="flex-1 p-4 flex flex-col justify-center items-center bg-light_blue w-full">
                  {isLoading ? (
                    <div className="h-12 w-12 animate-spin absolute"></div>
                  ) : course.length === 0 ? (
                    <>
                      <div className="cursor-pointer flex flex-row justify-center items-center bg-orange px-6 py-2 text-base font-normal text-white">
                        Stay tuned! We're working on some exciting new courses.
                      </div>
                      <br />
                      <br />
                    </>
                  ) : (
                    <div className="flex-1 grid custom-scrollbar grid-cols-5 gap-4 overflow-y-auto">
                      {course
                        .sort((a, b) => a.courseId - b.courseId)
                        .map((e, index) => {
                          if (index > 11) return null;
                          return (
                            <a
                              key={e.courseId}
                              onClick={() => {
                                router.push(`/course/${e.slug}`);
                              }}
                              className="cursor-pointer font-normal text-black hover:text-blue hover:underline"
                            >
                              {e.title}
                            </a>
                          );
                        })}
                    </div>
                  )}
                  {course.length !== 0 && (
                    <div
                      onClick={() => {
                        router.push(`/course`);
                      }}
                      className="cursor-pointer mt-2 flex flex-row justify-center items-center bg-blue px-6 py-2 text-base font-normal text-black rounded-full"
                    >
                      Show All Courses
                    </div>
                  )}
                </section>
              </div>
            </ul>
          </div>
        </Transition>
      </div>
     
     
     
     
      <div
        className={classNames(
          "transition-all duration-1000 ease-in-out",
          isProgramsOpen ? "mt-[100px]" : "pt-2"
        )}
      >
        {/* Hero Section */}
        <div className="text-center mb-12 w-full rounded-lg bg-none">
          <div className="w-full">
            <Marquee />
            <main
              className={`relative w-full lg:max-w-7xl lg:mx-auto h-auto px-5 md:px-14 lg:px-20 xl:px-0 flex flex-col`}
            >
              <div
                className="absolute inset-0 -z-10 bg-cover bg-center h-screen"
                style={{
                  backgroundImage: 'url("/bg_dot.png")',
                  opacity: "0.1",
                }}
              ></div>
              <Header />
              <HomePageMainContainer />
              <ExploreCourseComponent />
              <ClassesComponent />
              <WhyUsComponent />
              <UnqueOfferComponent />
              <OurClientComponent />
              <TestimonialComponent />
              {/* <NewsLetterComponent /> */}
              <Footer />
              {/* <TextParallaxContentExample /> */}
              {/* <CookieConsent /> */}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default Navbar;