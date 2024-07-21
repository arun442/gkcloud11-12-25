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
import ModuleList from './module_list_component';


const PlayerComponent = ({ notes, setNotes, data, modules, item, moduleId, setMouduleId, onSelectItem }: { notes: any, setNotes: any, data: any, modules: any, item: any, moduleId: any, setMouduleId: any, onSelectItem: any }) => {
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

            const userCourseProgress = (response?.data?.userCourseProgresses ?? []);
            let payload: any = {
                "userId": userData.userId,
                "courseId": parseInt(params.courseId[0]),
                "progressDate": new Date(),
                "moduleId": moduleId,
                "moduleItemId": itemId,

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

    const updateCourseStatus = async (moduleId: any, itemId: any) => {
        try {
            const response = await axiosPrivate.get("/user/user-course-progress", {
                params: {
                    "userId": userData.userId,
                    "courseId": parseInt(params.courseId[0]),
                }
            });

            const userCourseProgress = (response?.data?.userCourseProgresses ?? []);
            let payload: any = {
                "userId": userData.userId,
                "courseId": parseInt(params.courseId[0]),
                "progressDate": new Date(),
                "courseStatus": "Completed",
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
    const updateNotes = async (moduleId: any, itemId: any,note:any) => {
        try {
            const response = await axiosPrivate.get("/user/user-course-progress", {
                params: {
                    "userId": userData.userId,
                    "courseId": parseInt(params.courseId[0]),
                }
            });

            const userCourseProgress = (response?.data?.userCourseProgresses ?? []);
            let payload: any = {
                "userId": userData.userId,
                "courseId": parseInt(params.courseId[0]),

                "notes": note,
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
    return (<div className='w-full h-screen md:h-auto'>
         <ErrorBoundary>
        <section className='w-full h-[30vh] md:h-[70vh]'>{
            item == null ? <></> : item.moduleItemDetails && item.moduleItemDetails.length != 0 && item.moduleItemDetails[0].mode == "video" ?
                <div className="h-full w-full bg-dark_blue relative">
                    {
                        isLoading && <div className="w-full h-full absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
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
                                    await updateCourseStatus(moduleId, item.moduleItemId);
                                    router.refresh();
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
                                await updateCourseStatus(moduleId, item.moduleItemId);
                                router.refresh();
                                return;
                            }
                            console.log("Second", modules[moduleIndex + 1].moduleId, modules[moduleIndex + 1].moduleItems ? modules[moduleIndex + 1].moduleItems[0] : modules[moduleIndex + 1].details[0]);
                            setMouduleId(modules[moduleIndex + 1].moduleId);
                            onSelectItem(modules[moduleIndex + 1].moduleItems ? modules[moduleIndex + 1].moduleItems[0] : modules[moduleIndex + 1].details[0]);
                        }
                    }} />
                </div> : <></>
        }</section>
        </ErrorBoundary>
        <ErrorBoundary>
        <section className='w-full p-2 h-[70vh] md:h-auto flex-col'>
            <section className={classNames("w-full cursor-pointer text-sm  flex flex-row flex-wrap mt-12 justify-start items-center  gap-7")}>
                <div className={index != 0 ? "text-white font-normal" : "text-blue font-medium"} onClick={(e) => setIndex(0)}>
                    OverView
                </div>
                <div className='h-6 w-[1px] rounded-lg bg-grey'></div>
                <div className={index != 1 ? "text-white font-normal" : "text-blue font-medium"} onClick={(e) => setIndex(1)}>
                    Notes
                </div>
                <div className='h-6 w-[1px] rounded-lg bg-grey'></div>
                <div className={index != 2 ? "text-white font-normal" : "text-blue font-medium"} onClick={(e) => setIndex(2)}>
                    Stu
                </div>
                <div className='h-6 w-[1px] rounded-lg bg-grey md:hidden'></div>
                <div className={index != 3 ? "text-white font-normal md:hidden" : "text-blue font-medium md:hidden"} onClick={(e) => setIndex(3)}>
               Lectures
                </div>


            </section>
          
                <main className='mt-2 w-full flex-1 md:h-auto md:block'>
                    {
                        index == 0 ? <section className='w-full'>
                            <main className='mb-8'>
                                <h2 className='font-semibold text-2xl text-white mb-3 text-justify'>Course Description</h2>
                                <section>

                                    <p className='my-6 leading-6 font-normal text-sm text-white text-justify'>{data?.CourseContent?.courseContent?.course?.courseDetails?.description?.description ?? data?.CourseContent?.courseContent?.course?.courseDetails?.description ?? ""}</p>

                                    {
                                (data?.CourseContent?.courseContent?.course?.courseDetails?.description?.descriptionList ?? []).map((e: any, index: any) =>(e?.title ?? e??"").length==0?<></>:<section key={index}> <div  className='w-full flex flex-row gap-2 mb-4'>
                                    <p key={index} className='leading-6 font-medium text-lg text-white'>{index + 1}.</p>
                                    <p key={index} className='leading-6 font-medium text-lg  text-white flex-1 text-justify'>{e?.title ?? e}</p>
                                    
                                </div>
                                {
                                        (e?.titleListItems??[]).map((e: any, subIndex: any) =>(e??"").length==0?<></>: <div key={`${index}${subIndex}`} className='ml-4 mt-4 w-full flex flex-row gap-2 '>
                                        <p key={index} className='leading-6 font-normal text-sm text-white'>{index + 1}.{subIndex + 1}.</p>
                                        <p key={index} className='leading-6 font-normal text-sm text-white flex-1 text-justify'>{e}</p>
                                     
                                    </div>)
                                    }
                                </section>)
                            }
                                </section>
                                {
                                    (data?.CourseContent?.courseContent?.course?.courseDetails?.heighlights ?? []).length != 0 ? <section className='mt-10'>
                                        <h2 className='font-semibold text-2xl text-white mb-6 text-justify'>Highlights</h2>
                                        {
                                            (data?.CourseContent?.courseContent?.course?.courseDetails?.heighlights ?? []).map((e: any, index: any) =>(e??"").length==0?<></>: <p key={index} className='leading-6 font-normal text-sm text-white text-justify'>{index + 1}. {e}</p>)
                                        }
                                    </section> : <></>
                                }
                                {
                                    (data?.CourseContent?.courseContent?.course?.courseDetails?.courseBenefitInclude ?? []).length != 0 ? <section className='mt-10'>
                                        <h2 className='font-semibold text-2xl text-white mb-6 text-justify'>Course Benefit Include</h2>
                                        {
                                            (data?.CourseContent?.courseContent?.course?.courseDetails?.courseBenefitInclude ?? []).map((e: any, index: any) =>(e??"").length==0?<></>: <div key={index} className='w-full flex flex-row gap-2 '>
                                                <p key={index} className='leading-6 font-normal text-sm text-white'>{index + 1}.</p>
                                                <p key={index} className='leading-6 font-normal text-sm text-white flex-1 text-justify'>{e}</p>
                                            </div>)
                                        }
                                    </section> : <></>
                                }

                            </main>
                            <main className='mb-8'>
                                <h2 className='font-semibold text-2xl text-white mb-3 text-justify'>Objectives</h2>
                                <h2 className='font-normal text-sm text-white mb-6 text-justify'>{data?.CourseContent?.courseContent?.course?.courseDetails?.objectives?.description ?? ""}</h2>
                                {
                                    (data?.CourseContent?.courseContent?.course?.courseDetails?.objectives?.objectiveList ?? []).length != 0 ? <section className=''>

                                        {
                                            (data?.CourseContent?.courseContent?.course?.courseDetails?.objectives?.objectiveList ?? []).map((e: any, index: any) =>(e??"").length==0?<></>: <div key={index} className='w-full flex flex-row gap-2 '>
                                                <p key={index} className='leading-6 font-normal text-sm text-white text-justify'>{index + 1}.</p>
                                                <p key={index} className='leading-6 font-normal text-sm text-white flex-1 text-justify'>{e}</p>
                                            </div>)
                                        }
                                    </section> : <></>
                                }

                            </main>
                            <main className='mb-8'>
                                <h2 className='font-semibold text-2xl text-white mb-3 text-justify'>Audience</h2>
                                <h2 className='font-normal text-sm text-white mb-6 text-justify'>{data?.CourseContent?.courseContent?.course?.courseDetails?.audience?.description ?? ""}</h2>
                                {
                                    (data?.CourseContent?.courseContent?.course?.courseDetails?.audience?.audienceList ?? []).length != 0 ? <section className=''>

                                        {
                                            (data?.CourseContent?.courseContent?.course?.courseDetails?.audience?.audienceList ?? []).map((e: any, index: any) =>(e??"").length==0?<></>: <div key={index} className='w-full flex flex-row gap-2 '>
                                                <p key={index} className='leading-6 font-normal text-sm text-white text-justify'>{index + 1}.</p>
                                                <p key={index} className='leading-6 font-normal text-sm text-white flex-1 text-justify'>{e}</p>
                                            </div>)
                                        }
                                    </section> : <></>
                                }

                            </main>
                            <main className='mb-8'>
                                <h2 className='font-semibold text-2xl text-white mb-3 text-justify'>Prerequisites</h2>
                                <h2 className='font-normal text-sm text-white mb-6 text-justify'>{data?.CourseContent?.courseContent?.course?.courseDetails?.prerequisites?.description ?? ""}</h2>
                                {
                                    (data?.CourseContent?.courseContent?.course?.courseDetails?.prerequisites?.PrerequisiteList ?? []).length != 0 ? <section className=''>

                                        {
                                            (data?.CourseContent?.courseContent?.course?.courseDetails?.prerequisites?.PrerequisiteList ?? []).map((e: any, index: any) =>(e??"").length==0?<></>: <div key={index} className='w-full flex flex-row gap-2 '>
                                                <p key={index} className='leading-6 font-normal text-sm text-white text-justify'>{index + 1}.</p>
                                                <p key={index} className='leading-6 font-normal text-sm text-white flex-1 text-justify'>{e}</p>
                                            </div>)
                                        }
                                    </section> : <></>
                                }

                            </main>
                        </section> : index == 1 ? <textarea

                            rows={5}

                            value={notes}
                            onChange={(e) => {
                                updateNotes(moduleId, item.moduleItemId,e.target.value);
                                setNotes(e.target.value);
                                
                            }}



                            className="block px-4 w-full rounded-sm bg-dark_blue  text-white  placeholder:font-medium placeholder:text-gray-400 placeholder:pl-3  sm:text-sm sm:leading-6"
                        /> :index == 2?<></>: <div className=" md:hidden w-full h-full overflow-y-auto">
                        {item && <ModuleList modules={modules} setMouduleId={setMouduleId} onSelectItem={onSelectItem} currentItem={item} moduleId={moduleId} />}
                      </div>
                    }
                </main>

            
        </section>
        </ErrorBoundary>
    </div>)


};

export default PlayerComponent;
