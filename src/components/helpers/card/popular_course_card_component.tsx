import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation';


export default function PopularCourseCard({data}:{data:any}) {
  const router=useRouter();
    return <div onClick={(e)=>{
      router.push(`/course/${data.courseId}`)
    }} className="transform transition duration-500 hover:scale-110 cursor-pointer box-border border flex flex-col p-6 justify-start items-start border-blue border-1 bg-dark_blue rounded-2xl">
     <section className='flex-1 flex-col'>
     <p className="text-text_grey text-[12px] font-medium">{data.Course.courseCode}</p>
      <h2 className="text-white text-xl font-medium">{data.Course.title}</h2>
  
     </section>
  

    </div>;
  }