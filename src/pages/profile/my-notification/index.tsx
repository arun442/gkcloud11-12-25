

import ProfileLayout from "@/components/profile_components/profile_layout";
import { useRouter } from "next/router";
import { axiosPrivate } from "@/common/axiosPrivate";
import { useEffect, useState } from "react";

import classNames from "@/helpers/add_class";
import MyNotificationCard from "@/components/profile_components/my_notification_card";


export default function Index() {
    let [notification, setNotification] = useState<any[]>([]);
    const [index, setIndex] = useState(0);

    useEffect(() => {

        fetchNotification(index);



    }, [index])

    const fetchNotification = async (index: number) => {
        try {
            const result = await axiosPrivate.get('/lms/notification');
            if (index == 0) {
                setNotification(result.data.notifications);
                return;
            }
            if (index == 1) {
                setNotification(result.data.notifications.filter((e: any) => e.notificationType != "Webinar"))
                return;
            }
            if (index == 2) {
                setNotification(result.data.notifications.filter((e: any) => e.notificationType == "Webinar"))
                return;
            }







        } catch (error) {

        }
    }
    const router = useRouter();



    return (
        <ProfileLayout>
            <main className="w-full h-full flex flex-col">
                <h2 className="text-xl font-medium text-normal_white">All Notifications</h2>
                <div className={classNames("w-full cursor-pointer text-[16px]  flex flex-row justify-start items-center text-white mt-10 gap-16")}>
                    <div className={index != 0 ? "font-normal" : "border-b-2 font-semibold"} onClick={(e) => {

                        setIndex(0)
                    }}>
                        All
                    </div>

                    <div className={index != 1 ? " font-normal" : "border-b-2 font-semibold"} onClick={(e) => {
                        setIndex(1)

                    }}>
                        Programs
                    </div>
                    <div className={index != 2 ? " font-normal" : "border-b-2 font-semibold"} onClick={(e) => {
                        setIndex(2)

                    }}>
                        Webinars
                    </div>

                </div>
                <div className="flex-1 w-full grid grid-cols-1 gap-12 mt-12">

                    {
                        notification.map((e: any, index) => {
                            return <MyNotificationCard key={index} data={e} />
                        })
                    }




                </div>
            </main>
        </ProfileLayout>
    );
}
