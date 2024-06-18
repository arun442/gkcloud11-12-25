import Header from "@/components/helpers/header";
import { axiosPublic } from "@/common/axiosPublic";
import { useState, useEffect } from "react";
import PlayerComponent from "@/components/player_components/player_component";
import ModuleList from "@/components/player_components/module_list_component";
import { axiosPrivate } from "@/common/axiosPrivate";
import useUserData from "@/hooks/userData";
import { useRouter } from "next/router";
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import CircleProgressBar from "@/components/helpers/circleProgress";


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

    return { props: { title: result.data.courses[0]?.title, modules: result.data.courses[0]?.CourseContent?.courseContent?.course?.courseDetails?.content?.modules ?? [], id: id } }
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
export default function Player({ modules, id, title }: { modules: any, id: any, title: any }) {

  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [moduleId, setModuleId] = useState(null);
  const { userData, } = useUserData();
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
          courseId: id,
          "userId": userData.userId

        }
      });

      const userCourseProgress = (response?.data?.userCourseProgresses ?? []).filter((e: any) => e.userCourseProgressId == 5);
      console.log("what is the response", userCourseProgress);
      if (userCourseProgress.length == 0) {
        setModuleId(modules[0]?.moduleId);
        setSelectedItem(modules[0]?.moduleItems ? modules[0]?.moduleItems[0] : modules[0]?.details[0]);
      } else {
        const currentModule = modules.find((e: any) => e.moduleId == userCourseProgress[0].moduleId);
        const moduleIndex = modules.findIndex((e: any) => e.moduleId == userCourseProgress[0].moduleId);
        console.log("moduleIndex", moduleIndex);
        if (moduleIndex < 0) {
          return;
        }
        console.log("currentModule.moduleItems", currentModule.moduleItems);
        const moduleItemIndex = currentModule.moduleItems ? currentModule.moduleItems.findIndex((e: any) => e.moduleItemId == userCourseProgress[0].moduleItemId) : currentModule.details.findIndex((e: any) => e.id == userCourseProgress[0].moduleItemId);
        console.log("moduleItemIndex", moduleItemIndex);
        if (moduleItemIndex < ((currentModule.moduleItems ?? currentModule.details).length - 1)) {
          setModuleId(userCourseProgress[0].moduleId);
          setSelectedItem(currentModule.moduleItems ? currentModule.moduleItems[moduleItemIndex + 1] : currentModule.details[moduleItemIndex + 1])
        } else {
          setModuleId(modules[moduleIndex + 1].moduleId);
          setSelectedItem(modules[moduleIndex + 1].moduleItems ? modules[moduleIndex + 1].moduleItems[0] : modules[moduleIndex + 1].details[0]);
        }

      }
      // setModuleId(userCourseProgress.length == 0 ? modules[0]?.moduleId : userCourseProgress[0].moduleId);
      // setSelectedItem(userCourseProgress.length == 0 ? modules[0]?.moduleItems[0]
      //   : modules[userCourseProgress[0].moduleId - 1]?.moduleItems[userCourseProgress[0].moduleItemId - 1]);

    } catch (error) {

    }
  }

  useEffect(() => {
    fetchUserProgress();


  }, [userData]);





  return (
    <main
      className={`relative w-full lg:max-w-7xl lg:mx-auto h-auto px-5 md:px-14 lg:px-20 xl:px-0 flex flex-col`}
    >
      <div className="w-full flex items-center justify-start py-2">
        <div className="flex flex-shrink-0 items-center">
          <img
            onClick={(e) => {
              router.push("/")
            }}
            className="h-20 w-auto cursor-pointer"
            src="/logo.png"
            alt="Your Company"
          />

        </div>
        <div className="ml-4 flex-1 flex flex-row gap-1 items-center">
          <p className="cursor-pointer text-[#A1A1A1] text-base font-normal" onClick={(e) => {
            router.back();
            router.back();
          }}>Dashboard</p>
          <ChevronRightIcon className="text-[#A1A1A1] h-4 w-4" />
          <p className="cursor-pointer text-[#A1A1A1] text-base font-normal" onClick={(e) => {
            router.back();
          }}>{title}</p>
          <ChevronRightIcon className="text-[#A1A1A1] h-4 w-4" />
          <p className="cursor-pointer text-text_grey_one text-base font-normal">{selectedItem != null ? selectedItem?.mode ? "Quiz" : selectedItem?.moduleItemName : ""}</p>
        </div>

        <div className="flex flex-shrink-0 gap-2 items-center">
          <CircleProgressBar percentage={((moduleId ?? 0) * 100) / (modules.length)} />
          <p className="cursor-pointer text-text_grey_one text-base font-normal">Your Progress</p>
        </div>


      </div>

      <div className="w-full flex h-full">
        <div className="flex-1 w-full h-screen">
          <div className="h-[70%] bg-dark_blue relative">  <PlayerComponent setMouduleId={setModuleId} onSelectItem={setSelectedItem} modules={modules} item={selectedItem} moduleId={moduleId} /></div>
          <div className="h-[30%]"></div>
        </div>
        <div className="w-[30%] h-full">
          {selectedItem && <ModuleList modules={modules} setMouduleId={setModuleId} onSelectItem={setSelectedItem} currentItem={selectedItem} moduleId={moduleId} />}
        </div>
      </div>
      <section></section>
    </main>
  );
}
