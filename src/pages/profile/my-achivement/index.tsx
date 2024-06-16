
import ProfileLayout from "@/components/profile_components/profile_layout";
import { useRouter } from "next/router";
import { axiosPrivate } from "@/common/axiosPrivate";
import { useEffect, useState } from "react";
import MyAchivementCard from "@/components/profile_components/my_achivement_card";


export default function Index() {
    let [achivement, setAchivement] = useState<any[]>([]);
    useEffect(() => {

        fetchAchivement();



    }, [])

    const fetchAchivement = async () => {
        try {
            const result = await axiosPrivate.get('/user/user-certificate');
          
            setAchivement(result.data);






        } catch (error) {

        }
    }
    const router = useRouter();
    return (
        <ProfileLayout>
            <main className="w-full h-auto flex flex-col">
                <h2 className="text-xl font-medium text-normal_white">My Achievements</h2>
                <div className="w-full grid grid-cols-1 gap-6 mt-8">

                    {
                        achivement.map((e: any, index) => {
                            return <MyAchivementCard key={index} data={e} />
                        })
                    }




                </div>
            </main>
        </ProfileLayout>
    );
}
