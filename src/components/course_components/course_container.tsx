import React, { Fragment, useState, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import TextTransition, { presets } from "react-text-transition";
import MainHeading from "../helpers/heading/main_heading";
import Head from "next/head";
import { CalendarIcon } from "@heroicons/react/24/outline";
import CourseCard from "../helpers/card/course_card_component";
import classNames from "@/helpers/add_class";
import DurationDropdown from "./duration_dropdown_component";
import PartnerDropdown from "./partner_dropdown_component";
import TechnologyDropdown from "./technology_dropdown_component";
import { axiosPublic } from "@/common/axiosPublic";
import CertificateCard from "../helpers/card/certificate_card_component";
import { useRouter, useParams } from "next/navigation";
import useTrainingMode from "@/hooks/training_mode_hook";
import { useSearchParams } from "next/navigation";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import NormalBtn from "../helpers/buttons/normal_btn_component";
import TrainingModeDropdown from "./training_mode_dropdown_component";
import { searchTextRegEx } from "@/common/constants";
import { CiFilter } from "react-icons/ci";
import { commonbasePath } from "../../common/constants";
 
export default function CourseContainer() {
  const [index, setIndex] = useState(0);
  const [showImage, setShowImage] = useState(false);
  let [course, setCourse] = useState<any[]>([]);
  const [courseList, setCourseList] = useState<any[]>([]);
  const [certificate, setCertificate] = useState<any[]>([]);
  const [certificateList, setCertificateList] = useState<any[]>([]);
  const [loadMore, setLoadMore] = useState(9);

  const router = useRouter();
  const searchParams = useSearchParams();
 
  const type = searchParams.get("type");
  const id = searchParams.get("id");
  const name = searchParams.get("name");
 
  useEffect(() => {
    setIndex(Number(sessionStorage.getItem("navtab")?sessionStorage.getItem("navtab"):0));
    console.log(id,name);
    
    fetchCourse();
    console.log("partner",partner);
    
    fetchCertificate();
 
    if (id) {
      setShowImage(true);
    }
  }, [id]);
 
  const fetchCourse = async () => {
    try {
      const result = await axiosPublic.get("/lms/course");
 
      setCourse(result.data.courses);
 
      setCourseList(result.data.courses);



    } catch (error) {}
  };
  const fetchCertificate = async () => {
    try {
      const result = await axiosPublic.get("/lms/certificate-course");
 
      setCertificate(result.data.certificateCourses);
      setCertificateList(result.data.certificateCourses);
    } catch (error) {}
  };
  const [trainingList, setTrainingData] = useState<any[]>([]);
  const [partner, setPartner] = useState<any>(null);
  const [technology, setTechnology] = useState<any>(null);
 
  const [mode, setMode] = useState<any>(null);
 
  const filter = () => {
    if (partner != null || technology != null || mode != null) {
      course = courseList;
      setLoadMore(9);
      if (partner != null) {
        setLoadMore(9);

        course = course.filter((e) => {
          return e.partnerId == partner?.partnerId;
        });
      }
      if (technology != null) {
        setLoadMore(9);

        course = course.filter((e) => {
          return e.categoryId == technology?.categoryId;
        });
      }
      if (mode != null) {
        setLoadMore(9);

        course = course.filter((e) => {
          return e.CourseCostPlans[0].trainingModeId == mode?.trainingModeId;
        });
      }
      setCourse(course);
    }
  };
  useEffect(() => {
    filter();
  }, [partner, technology, mode]);
 
  const clearFilter = () => {
    setCourse(courseList);
    setTrainingData([]);
    setPartner(null);
    setTechnology(null);
    setMode(null);
    setQuery("");
  };
 
  useEffect(() => {
    if (type != null) {
      if (type == "partner") {
        setPartner({
          partnerId: id,
          partnerName: name,
        });
      } else {
        setTechnology({
          categoryId: id,
          categoryName: name,
        });
      }
 
    }
    filter();

  }, [courseList]);
  const [query, setQuery] = useState("");
 
  useEffect(() => {
    if (index == 0) {
      if (query == "") {
        setCourse(courseList);
        return;
      }
      setCourse(
        courseList.filter((e) => {
          return (
            e.title.toLowerCase().includes(query.toLowerCase()) ||
            e.courseCode.toLowerCase().includes(query.toLowerCase())
          );
        })
      );
    } else {
      if (query == "") {
        setCertificate(certificateList);
        return;
      }
      setCertificate(
        certificateList.filter((e) => {
          return e.title.toLowerCase().includes(query.toLowerCase());
        })
      );
    }
  }, [query]);
 
  const useMediaQuery = (query: string): boolean => {
    const [matches, setMatches] = useState(false);
 
    useEffect(() => {
      const media = window.matchMedia(query);
      if (media.matches !== matches) {
        setMatches(media.matches);
      }
      const listener = () => setMatches(media.matches);
      media.addEventListener("change", listener);
      return () => media.removeEventListener("change", listener);
    }, [matches, query]);
 
    return matches;
  };
 
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isFilterVisible, setIsFilterVisible] = useState(false);
 
  const toggleFilter = () => {
    setIsFilterVisible((prev) => !prev); // Toggle filter visibility
  };
 
  return (
    <main className="w-auto bg-primary_color flex-1 flex flex-col">
      <Head>
        <title>{name}</title>
        <link
          rel="canonical"
          href={`/course?type=${type}&id=${id}&name=${name}`}
        />
        <meta name="robots" content="index, follow" />
      </Head>
      {isMobile ? (
        <>
          <div className="bg-dark_blue w-full h-full rounded-lg p-10">
            <div className="flex flex-row gap-1 items-center ">
              <p
                className="hover:text-blue cursor-pointer text-blue text-base font-medium"
                onClick={(e) => {
                  router.push("/");
                }}
              >
                Home
              </p>
              <ChevronRightIcon className="text-text_grey_one h-4 w-4" />
              <p className="hover:text-blue cursor-pointer text-text_grey_one text-base font-medium">
              {index==0?"Courses":"Certifications"}
              </p>
            </div>
            <div>
              <p className="text-white font-semibold text-center text-3xl ml-10">
              {index==0?"All Courses":" All Certifications"}
              </p>
              <p className="text-white ml-10 mt-2 opacity-70 text-center">
                Master the World’s Most In-Demand Skills and Grow Together
              </p>
            </div>
          </div>
          <div></div>
 
          {name != null &&
          (name == "AI" || name == "Artificial Intelligence") ? (
            <section className="w-full mt-10 flex flex-col justify-start items-start gap-6">
              <h2 className="text-3xl text-blue font-semibold">
                Artificial Intelligence
              </h2>
 
              <div className=" object-cover w-full flex flex-row items-center justify-center">
                <img
                  alt="ai"
                  className="object-contain mx-auto h-128"
                  src={`${commonbasePath}/ai6.png`}
                />
              </div>
            </section>
          ) : type != null &&
            type == "partner" &&
            name != null &&
            name == "Google Cloud" ? (
            <section className="w-full mt-10 flex flex-col justify-start items-start gap-6">
              <h2 className="text-3xl text-blue font-semibold">{name}</h2>
 
              <div className=" object-cover w-full flex flex-row items-center justify-center">
                <img
                  alt="gcp"
                  className="object-contain mx-auto h-128"
                  src={`${commonbasePath}/gcp.png`}
                />
              </div>
            </section>
          ) : name != null &&
            (name == "Microsoft Azure" || name == "Microsoft") ? (
            <section className="w-full mt-10 flex flex-col justify-start items-start gap-6">
              <h2 className="text-3xl text-blue font-semibold">{name}</h2>
 
              <div className=" object-contain w-full flex flex-row items-center justify-center">
                <img
                  alt="azure"
                  className="mx-auto h-auto md:h-128"
                  src={`${commonbasePath}/azure1.png`}
                />
              </div>
            </section>
          ) : (
            <></>
          )}
          <div
            className={classNames(
              "w-full cursor-pointer text-lg md:text-2xl  flex flex-row mt-12 mb-12 justify-center items-center  gap-7"
            )}
          >
            <div
              className={
                index != 0 ? "text-white font-normal" : "text-blue font-medium"
              }
              onClick={(e) => {
                setLoadMore(9);
                setIndex(0);
              }}
            >
              Courses
            </div>
            <div className="h-6 w-[1px] rounded-lg bg-grey"></div>
            <div
              className={
                index != 1 ? "text-white font-normal" : "text-blue font-medium"
              }
              onClick={(e) => {
                setIndex(1);
                setLoadMore(9);
              }}
            >
              Certifications
            </div>
          </div>
          <div className={` flex gap-6 w-auto `}>
          {index === 0 && (
          <div className={`w-full md:w-64 ${isFilterVisible ? "block" : "hidden"} md:block`}>
            <div className="box-border border p-4 border-blue border-1 bg-dark_blue rounded-2xl">
              <PartnerDropdown data={partner} setData={setPartner} />
              <TechnologyDropdown partner={partner} data={technology} setData={setTechnology} />
              <TrainingModeDropdown data={mode} setData={setMode} />
              {(partner || technology || mode) && (
                <NormalBtn
                  text={"Clear"}
                  onClick={(e: any) => {
                    e.preventDefault();
                    clearFilter();
                  }}
                />
              )}
            </div>
          </div>
        )}
 
            <div>
              <section className="flex flex-col items-start justify-start">
                {/* <div className="text-white mt-0 font-medium ">Courses</div> */}
                <div className="mt-4 gap-2 mx-auto flex flex-row items-center justify-center relative ml-0 md:block text-xs w-auto">
                  {index==0 &&
                  <CiFilter
                    className="text-white"
                    size={24}
                    onClick={toggleFilter}
                  />}
                
                  <input
                    value={query}
                    className="block w-full border-1 pl-10 rounded-full bg-dark_blue py-[15px] text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:font-medium placeholder:text-gray-400 placeholder:pl-3  sm:text-sm sm:leading-6"
                    placeholder="Search"
                    onChange={(event) => {
                      if (event.target.value.length == 0) {
                        setQuery("");
                        return;
                      }
                      if (searchTextRegEx.test(event.target.value)) {
                        setQuery(event.target.value);
                      }
                    }}
                  />
                </div>
              </section>
              {index == 0 ? (
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 -ml-4">
                  {course.map((e: any, index) => {
                    return index + 1 > loadMore ? (
                      <></>
                    ) : (
                      <CourseCard showPrice={true} key={index} data={e} />
                    );
                  })}
                </div>
              ) : (
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                  {certificate.map((e: any, index) => {
                    return index + 1 > loadMore ? (
                      <></>
                    ) : (
                      <CertificateCard key={index} data={e} />
                    );
                  })}
                </div>
              )}
               <section className="w-full my-10 flex flex-row items-center justify-center">
                {loadMore >= course.length ? (
                  <></>
                ) : (
                  <NormalBtn
                    text={"Load More"}
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.preventDefault();
                      setLoadMore(loadMore + 9);
                    }}
                  />
                )}
              </section>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="bg-dark_blue w-full h-full rounded-lg p-10">
            <div className="flex flex-row gap-1 items-center ml-10">
              <p
                className="hover:text-blue cursor-pointer text-blue text-base font-medium"
                onClick={(e) => {
                  router.push("/");
                }}
              >
                Home
              </p>
              <ChevronRightIcon className="text-text_grey_one h-4 w-4" />
              <p className="hover:text-blue cursor-pointer text-text_grey_one text-base font-medium">
              {index==0?"Courses":"Certifications"}
              </p>
            </div>
            <div>
              <p className="text-white font-semibold text-center text-3xl ml-10">
              {index==0?"All Courses":" All Certifications"}

                
              </p>
              <p className="text-white ml-10 mt-2 opacity-70 text-center">
                Master the World’s Most In-Demand Skills and Grow Together
              </p>
            </div>
          </div>
          <div></div>
 
          {name != null &&
          (name == "AI" || name == "Artificial Intelligence") ? (
            <section className="w-full mt-10 flex flex-col justify-start items-start gap-6">
              <h2 className="text-3xl text-blue font-semibold">
                Artificial Intelligence
              </h2>
 
              <div className=" object-cover w-full flex flex-row items-center justify-center">
                <img
                  alt="ai"
                  className="mx-auto h-auto  md:h-144"
                  src={`${commonbasePath}/ai6.png`}
                />
              </div>
            </section>
          ) : type != null &&
            type == "partner" &&
            name != null &&
            name == "Google Cloud" ? (
            <section className="w-full mt-10 flex flex-col justify-start items-start gap-6">
              <h2 className="text-3xl text-blue font-semibold">{name}</h2>
 
              <div className=" object-cover w-full flex flex-row items-center justify-center">
                <img
                  alt="gcp"
                  className="object-contain mx-auto h-128"
                  src={`${commonbasePath}/gcp.png`}
                />
              </div>
            </section>
          ) : name != null &&
            (name == "Microsoft Azure" || name == "Microsoft") ? (
            <section className="w-full mt-10 flex flex-col justify-start items-start gap-6">
              <h2 className="text-3xl text-blue font-semibold">{name}</h2>
 
              <div className=" object-contain w-full flex flex-row items-center justify-center">
                <img
                  alt="azure"
                  className="mx-auto h-auto md:h-128"
                  src={`${commonbasePath}/azure1.png`}
                />
              </div>
            </section>
          ) : (
            <></>
          )}
          <div
            className={classNames(
              "w-full cursor-pointer text-lg md:text-2xl  flex flex-row mt-12 mb-12 justify-center items-center  gap-7"
            )}
          >
            <div
              className={
                index != 0 ? "text-white font-normal" : "text-blue font-medium"
              }
              onClick={(e) => {
                setLoadMore(9);
                setIndex(0);
                sessionStorage.setItem("navtab","0");
              }}
            >
              Courses
            </div>
            <div className="h-6 w-[1px] rounded-lg bg-grey"></div>
            <div
              className={
                index != 1 ? "text-white font-normal" : "text-blue font-medium"
              }
              onClick={(e) => {
                setIndex(1);
                setLoadMore(9);
                sessionStorage.setItem("navtab","1");

              }}
            >
              Certifications
            </div>
          </div>
          <div className="flex gap-10 w-auto ">
            <div>
              {index == 0 ? (
                <div className="box-border border p-8 border-blue border-1 bg-dark_blue rounded-2xl hidden md:block w-64">
                  <section className="mt-0 flex flex-col flex-wrap gap-6">
                    <PartnerDropdown data={partner} setData={setPartner} />
                    <TechnologyDropdown
                      partner={partner}
                      data={technology}
                      setData={setTechnology}
                    />
                    <TrainingModeDropdown data={mode} setData={setMode} />
                    {/* <NormalBtn text={"Filter"} onClick={(e: any) => {
              e.preventDefault();
              filter();
           
            }} /> */}
                    {partner != null || technology != null || mode != null ? (
                      <NormalBtn
                        text={"Clear"}
                        onClick={(e: any) => {
                          e.preventDefault();
                          clearFilter();
                          if (name) {
                            router.replace("/course");
                          }
                        }}
                      />
                    ) : (
                      <></>
                    )}
                  </section>
                </div>
              ) : (
                <></>
              )}
            </div>
            <div>
              <section className="flex flex-col items-start justify-start">
                <div className="mt-4 mx-auto flex flex-row items-center justify-center relative ml-0 md:block text-xs w-auto">
                  <span className="absolute h-5 w-5 left-0 top-4  inset-0 pl-3">
                    {" "}
                    <MagnifyingGlassIcon className="h-5 w-5 text-blue items-center" />
                  </span>
                  <input
                    value={query}
                    className="block w-full border-1 pl-10 rounded-full bg-dark_blue py-[15px] text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:font-medium placeholder:text-gray-400 placeholder:pl-3  sm:text-sm sm:leading-6"
                    placeholder="Search"
                    onChange={(event) => {
                      if (event.target.value.length == 0) {
                        setQuery("");
                        return;
                      }
                      if (searchTextRegEx.test(event.target.value)) {
                        setQuery(event.target.value);
                      }
                    }}
                  />
                </div>
              </section>
              {index == 0 ? (
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 -ml-4">
                  {course.map((e: any, index) => {
                    return index + 1 > loadMore ? (
                      <></>
                    ) : (
                      <CourseCard showPrice={true} key={index} data={e} />
                    );
                  })}
                </div>
              ) : (
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                  {certificate.map((e: any, index) => {
                    return index + 1 > loadMore ? (
                      <></>
                    ) : (
                      <CertificateCard key={index} data={e} />
                    );
                  })}
                </div>
              )}
              <section className="w-full my-10 flex flex-row items-center justify-center">
                {loadMore >= course.length  ? (
                  <></>
                ) : (
                  <NormalBtn
                    text={"Load More"}
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.preventDefault();
                      setLoadMore(loadMore + 9);
                    }}
                  />
                )}
              </section>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
 
 