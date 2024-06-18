// components/Player.js
import React, { useState } from 'react';
import Quiz from './quiz_component';
import ReactPlayer from 'react-player'
import Loader from '../helpers/Loader';
import { axiosPrivate } from '@/common/axiosPrivate';
import { useParams, useRouter } from 'next/navigation'
import useUserData from '@/hooks/userData';
import classNames from '@/helpers/add_class';
import ErrorBoundary from '@/helpers/error_boundary';
import OverlayLoader from '../helpers/OverlayLoader';


const PlayerComponent = ({notes,setNotes, data, modules, item, moduleId, setMouduleId, onSelectItem }: {notes:any, setNotes:any, data:any, modules: any, item: any, moduleId: any, setMouduleId: any, onSelectItem: any }) => {
    const params = useParams();
    const router = useRouter()
    const [isLoading, setLoading] = useState(true);

    console.log("what is the items", item, moduleId);
    const { userData, } = useUserData();
    const updateCourseItem = async (moduleId: any, itemId: any) => {
        try {
            const response = await axiosPrivate.get("/user/user-course-progress", {
                params: {
                    "userId": userData.userId,
                    "courseId": parseInt(params.courseId[0]),
                }
            });

            const userCourseProgress = (response?.data?.userCourseProgresses ?? []).filter((e: any) => e.userCourseProgressId == 5);
            let payload: any = {
                "userId": userData.userId,
                "courseId": parseInt(params.courseId[0]),
                "progressDate": new Date(),
                "moduleId": moduleId,
                "moduleItemId": itemId,
                "notes": notes,
            }
            if (userCourseProgress.length != 0) {
                payload.userCourseProgressId = userCourseProgress[0].userCourseProgressId

            }
            console.log("paylad", payload);

            //[]
            await axiosPrivate.post("/user/upsert-user-course-progress", payload);
            console.log("api done");

        } catch (error) {

        }
    }
    const updateQuiz = async (moduleId: any, itemId: any, answer: any) => {
        try {
            console.log("what is the params");
            console.log({

            })
            const response = await axiosPrivate.post("/user/upsert-course-quiz", {
                "quizId": itemId,
                "courseId": parseInt(params.courseId[0]),
                "moduleId": moduleId,
                "moduleItemId": itemId,
                "moduleItemDetailId": itemId,
                // "quizName": "AI Cloud Quiz",
                "isActive": true,
                "isEnabled": true,
                // "quizURL": "http://gkcloud.ai/quiz/ai/9898",
                "attendedDate": new Date(),
                // "remarks": "Sundar",
                "quizResponse": { "quiz": JSON.stringify(answer) }
            });


        } catch (error) {

        }
    }
    const [index, setIndex] = useState(0);
    return (<div className='w-full '>
        <section className='w-full h-[70vh]'>{
            item == null ? <></> : item.moduleItemDetails && item.moduleItemDetails.length != 0 && item.moduleItemDetails[0].mode == "video" ?
                <div className="h-full w-full bg-dark_blue relative">
                  {
                  isLoading&&   <div className="w-full h-full absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                     <div className="w-16 h-16 border-4 border-t-transparent border-blue rounded-full animate-spin"></div>
                   </div>
                  }
                    <ReactPlayer style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                        top: 0,
                        left: 0
                    }}

                        onStart={() => {
                            console.log("On Start");
                        }}
                        onReady={() => {
                            setLoading(false);
                            console.log("On Ready");
                        }}
                        onEnded={async () => {
                            setLoading(true);
                            await updateCourseItem(moduleId, item.moduleItemId);
                            const currentModule = modules.find((e: any) => e.moduleId == moduleId);
                            const moduleIndex = modules.findIndex((e: any) => e.moduleId == moduleId);
                            if (moduleIndex < 0) {
                                return;
                            }
                            const moduleItemIndex = (currentModule.moduleItems ?? currentModule.details).findIndex((e: any) => e.moduleItemId == item.moduleItemId);

                            if (moduleItemIndex < ((currentModule.moduleItems ?? currentModule.details).length - 1)) {
                                console.log("First");
                                setMouduleId(moduleId);
                                onSelectItem((currentModule.moduleItems ?? currentModule.details)[moduleItemIndex + 1])
                            } else {
                                const checkIndex = modules.findIndex((e: any) => e.moduleId == (moduleId + 1));
                                if (checkIndex < 0) {
                                    return;
                                }
                                console.log("Second", modules[moduleIndex + 1].moduleId, modules[moduleIndex + 1].moduleItems ? modules[moduleIndex + 1].moduleItems[0] : modules[moduleIndex + 1].details[0]);
                                setMouduleId(modules[moduleIndex + 1].moduleId);
                                onSelectItem(modules[moduleIndex + 1].moduleItems ? modules[moduleIndex + 1].moduleItems[0] : modules[moduleIndex + 1].details[0]);
                            }

                            //first need to fetch the current module using modules id 
                            //then need to check extra moudle items there or not 
                            //if there need to pass that moduleItem data into function params
                            // no there need to go for the next modules with first module item
                            console.log("its ented");
                        }} url={item.moduleItemDetails[0].url} width="100%" height="100%" controls />

                </div> : !item?.moduleItemDetails && item.mode == "quiz" ? <div className="h-full w-full relative bg-normal_white">
                    <Quiz questions={item.quiz} submit={async (answer: any) => {
                        await updateCourseItem(moduleId, item.id);
                        await updateQuiz(moduleId, item.id, answer);

                        const currentModule = modules.find((e: any) => e.moduleId == moduleId);
                        const moduleIndex = modules.findIndex((e: any) => e.moduleId == moduleId);
                        if (moduleIndex < 0) {
                            return;
                        }
                        const moduleItemIndex = (currentModule.moduleItems ?? currentModule.details).findIndex((e: any) => e.moduleItemId == item.moduleItemId);

                        if (moduleItemIndex < ((currentModule.moduleItems ?? currentModule.details).length - 1)) {
                            console.log("First");
                            setMouduleId(moduleId);
                            onSelectItem((currentModule.moduleItems ?? currentModule.details)[moduleItemIndex + 1])
                        } else {
                            const checkIndex = modules.findIndex((e: any) => e.moduleId == (moduleId + 1));
                            if (checkIndex < 0) {
                                return;
                            }
                            console.log("Second", modules[moduleIndex + 1].moduleId, modules[moduleIndex + 1].moduleItems ? modules[moduleIndex + 1].moduleItems[0] : modules[moduleIndex + 1].details[0]);
                            setMouduleId(modules[moduleIndex + 1].moduleId);
                            onSelectItem(modules[moduleIndex + 1].moduleItems ? modules[moduleIndex + 1].moduleItems[0] : modules[moduleIndex + 1].details[0]);
                        }
                    }} />
                </div> : <></>
        }</section>
        <section className='w-full p-2'>
            <section className={classNames("w-full cursor-pointer text-sm  flex flex-row mt-12 justify-start items-center  gap-7")}>
                <div className={index != 0 ? "text-white font-normal" : "text-blue font-medium"} onClick={(e) => setIndex(0)}>
                   OverView
                </div>
                <div className='h-6 w-[1px] rounded-lg bg-grey'></div>
                <div className={index != 1 ? "text-white font-normal" : "text-blue font-medium"} onClick={(e) => setIndex(1)}>
               Notes
                </div>
              

            </section>
            <ErrorBoundary>
                <main className='mt-2 w-full'>
                 {
index==0?<main>
<h2 className='font-semibold text-2xl text-white mb-3 text-justify'>Course Description</h2>
<section>

    <p className='my-6 leading-6 font-normal text-sm text-white text-justify'>{data?.CourseContent?.courseContent?.course?.courseDetails?.description?.description ?? data?.CourseContent?.courseContent?.course?.courseDetails?.description ?? ""}</p>

    {
        (data?.CourseContent?.courseContent?.course?.courseDetails?.description?.descriptionList ?? []).map((e: any, index: any) => <div key={index} className='w-full flex flex-row gap-2 '>
            <p key={index} className='leading-6 font-normal text-sm text-white'>{index + 1}.</p>
            <p key={index} className='leading-6 font-normal text-sm text-white flex-1 text-justify'>{e?.title ?? e}</p>
        </div>)
    }
</section>
{
    (data?.CourseContent?.courseContent?.course?.courseDetails?.heighlights ?? []).length != 0 ? <section className='mt-10'>
        <h2 className='font-semibold text-2xl text-white mb-6 text-justify'>Highlights</h2>
        {
            (data?.CourseContent?.courseContent?.course?.courseDetails?.heighlights ?? []).map((e: any, index: any) => <p key={index} className='leading-6 font-normal text-sm text-white text-justify'>{index + 1}. {e}</p>)
        }
    </section> : <></>
}
{
    (data?.CourseContent?.courseContent?.course?.courseDetails?.courseBenefitInclude ?? []).length != 0 ? <section className='mt-10'>
        <h2 className='font-semibold text-2xl text-white mb-6 text-justify'>Course Benefit Include</h2>
        {
            (data?.CourseContent?.courseContent?.course?.courseDetails?.courseBenefitInclude ?? []).map((e: any, index: any) => <div key={index} className='w-full flex flex-row gap-2 '>
                <p key={index} className='leading-6 font-normal text-sm text-white'>{index + 1}.</p>
                <p key={index} className='leading-6 font-normal text-sm text-white flex-1 text-justify'>{e}</p>
            </div>)
        }
    </section> : <></>
}

</main>:  <textarea
                               
                                rows={5}

value={notes}
onChange={(e)=>setNotes(e.target.value)}
                                


                                className="block px-4 w-full rounded-sm bg-dark_blue  text-white  placeholder:font-medium placeholder:text-gray-400 placeholder:pl-3  sm:text-sm sm:leading-6"
                            />
                 }
                </main>

            </ErrorBoundary>
        </section>
    </div>)


};

export default PlayerComponent;
