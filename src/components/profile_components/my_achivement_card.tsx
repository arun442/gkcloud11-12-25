import hideDuration from '@/helpers/hide_duration';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Metamorphous } from 'next/font/google';
import { useRouter } from 'next/navigation';


export default function MyAchivementCard({ data }: { data: any }) {
    const router = useRouter();
    return <div onClick={(e) => {
        router.push(`/course/${data.Course.courseId}`)
    }} className="cursor-pointer box-border border flex flex-row p-6 justify-between items-center border-blue border-1 bg-dark_blue rounded-2xl">

        <div className='flex-1 flex flex-col'>
            <p className="text-text_grey text-[12px] font-medium">Course / {data.Course.courseCode}</p>
            <h2 className="text-white text-xl font-medium">{data.Course.title}</h2>
        </div>

        <div className='flex flex-row gap-6'>
            <img


                className="h-6 w-6"
                src="/icon_download.svg" />
            <img


className="h-6 w-6"
                src="/icon_share.svg" />
        </div>


    </div>;
}