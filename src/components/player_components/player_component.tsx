// components/Player.js
import React, { useState } from 'react';
import Quiz from './quiz_component';
import ReactPlayer from 'react-player'
import Loader from '../helpers/Loader';
import { axiosPrivate } from '@/common/axiosPrivate';
import { useParams, useRouter } from 'next/navigation'
import useUserData from '@/hooks/userData';


const PlayerComponent = ({ modules, item, moduleId, setMouduleId, onSelectItem }: { modules: any, item: any, moduleId: any, setMouduleId: any, onSelectItem: any }) => {
    const params = useParams();
    const router = useRouter()
    const [isLoading, setLoading] = useState(false);
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
                "moduleItemId": itemId
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

    if (item == null) {
        return null;
    }
    if (item.moduleItemDetails && item.moduleItemDetails.length != 0 && item.moduleItemDetails[0].mode == "video") {
        return (
            <div className="h-full w-full relative">
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
                        setLoading(true);
                        console.log("On Ready");
                    }}
                    onEnded={async () => {
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

            </div>
        );
    }

    if (!item?.moduleItemDetails && item.mode == "quiz") {
        console.log("Item Quiz");
        console.log(item.quiz);
        return (
            <div className="h-full w-full relative bg-normal_white">
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
            </div>
        );
    }

    return null;
};

export default PlayerComponent;
