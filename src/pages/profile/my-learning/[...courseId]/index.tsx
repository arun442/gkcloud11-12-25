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
import ErrorBoundary from "@/helpers/error_boundary";
import { commonbasePath } from "@/common/constants";


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

    return { props: {data:result.data.courses[0], title: result.data.courses[0]?.title, modules: result.data.courses[0]?.CourseContent?.courseContent?.course?.courseDetails?.content?.modules ?? [], id: id } }
  } catch (error) {
   
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
}
export default function Player({data, modules, id, title }: {data:any, modules: any, id: any, title: any }) {
  const basePath  = commonbasePath;
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [moduleId, setModuleId] = useState(null);
  const { userData, } = useUserData();
  const [notes, setNotes] = useState('');
  const [coursestatus,setcoursestatus]=useState(false);
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

      const userCourseProgress = (response?.data?.userCourseProgresses ?? []);
   
      if (userCourseProgress.length == 0) {
        setModuleId(modules[0]?.moduleId);
        setSelectedItem(modules[0]?.moduleItems ? modules[0]?.moduleItems[0] : modules[0]?.details[0]);
      } else {
        setNotes(userCourseProgress[0].notes);
        const currentModule = modules.find((e: any) => e.moduleId == userCourseProgress[0].moduleId);
        const moduleIndex = modules.findIndex((e: any) => e.moduleId == userCourseProgress[0].moduleId);
      setcoursestatus(userCourseProgress.length>0&&userCourseProgress[0].courseStatus=="Completed"?true:false)
        if (moduleIndex < 0) {
          return;
        }
      
        const moduleItemIndex = currentModule.moduleItems ? currentModule.moduleItems.findIndex((e: any) => e.moduleItemId == userCourseProgress[0].moduleItemId) : currentModule.details.findIndex((e: any) => e.id == userCourseProgress[0].moduleItemId);
      
        if (moduleItemIndex < ((currentModule.moduleItems ?? currentModule.details).length - 1)) {
          setModuleId(userCourseProgress[0].moduleId);
          setSelectedItem(currentModule.moduleItems ? currentModule.moduleItems[moduleItemIndex + 1] : currentModule.details[moduleItemIndex + 1])
        } else {
          setModuleId(modules[moduleIndex + 1].moduleId);
          setSelectedItem(modules[moduleIndex + 1].moduleItems ? modules[moduleIndex + 1].moduleItems[0] : modules[moduleIndex + 1].details[0]);
        }

      }
     

    } catch (error) {

    }
  }

  useEffect(() => {
    fetchUserProgress();


  }, [userData]);





  return (
    <ErrorBoundary>
    <main
      className={`relative w-full lg:max-w-7xl lg:mx-auto h-auto px-5 md:px-14 lg:px-20 xl:px-0 flex flex-col`}
    >
      <div className="w-full flex items-center justify-between md:justify-start py-2">
        <div className="flex flex-shrink-0 items-center">
          <img
            onClick={(e) => {
              router.push("/")
            }}
            className="h-14 md:h-20 w-auto cursor-pointer"
            src={`${basePath}/logo.png`}
            alt="GK cloud solutions"
          />

        </div>
        <div className="hidden ml-4 flex-1 md:flex flex-row gap-1 items-center">
          <p className="hover:text-blue cursor-pointer text-[#A1A1A1] text-base font-normal" onClick={(e) => {
            router.back();
            router.back();
          }}>Dashboard</p>
          <ChevronRightIcon className="text-[#A1A1A1] h-4 w-4" />
          <p className="hover:text-blue cursor-pointer text-[#A1A1A1] text-base font-normal" onClick={(e) => {
            router.back();
          }}>{title}</p>
          <ChevronRightIcon className="text-[#A1A1A1] h-4 w-4" />
          <p className="hover:text-blue cursor-pointer text-text_grey_one text-base font-normal">{selectedItem != null ? selectedItem?.mode ? "Quiz" : selectedItem?.moduleItemName : ""}</p>
        </div>

        <div className="flex flex-shrink-0 gap-2 items-center">
          <CircleProgressBar percentage={((moduleId ?? 0) * 100) / (modules.length)} />
          <p className="cursor-pointer text-text_grey_one text-base font-normal">Your Progress</p>
        </div>


      </div>
{coursestatus?
<div className="w-full flex justify-center items-center mt-20">
  <span className="font-semibold text-white text-4xl ">
 Course Completed Successfully🎉
  </span>
  </div>:null}
      <div className="w-full flex h-full">
                        {modules[0]?.moduleItems[0]?.moduleItemDetails[0]?.mode=="" && (

              <div className=" flex w-full justify-center items-center h-[70vh]">
              <h1 className="text-white font-semibold text-4xl">Content unavailable for this course</h1>
            </div>
                          )}

            <div className="h-auto flex-1 md:w-full">
            {selectedItem && modules[0]?.moduleItems[0]?.moduleItemDetails[0]?.mode!="" && (
                <PlayerComponent
                  notes={notes}
                  setNotes={setNotes}
                  data={data}
                  setMouduleId={setModuleId}
                  onSelectItem={setSelectedItem}
                  modules={modules}
                  item={selectedItem}
                  moduleId={moduleId}
                />
              )}
            </div>
            <div className="hidden md:flex w-[30%] h-[70vh]">
            {selectedItem && (
                <ModuleList
                  modules={modules}
                  setMouduleId={setModuleId}
                  onSelectItem={setSelectedItem}
                  currentItem={selectedItem}
                  moduleId={moduleId}
                />
              )}
            </div>
          
          </div>
      <section></section>
    </main>
     </ErrorBoundary>
  );
}
