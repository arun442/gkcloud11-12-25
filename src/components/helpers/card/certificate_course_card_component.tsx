import hideDuration from '@/helpers/hide_duration';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation';


export default function CertificateCourseCard({data,showPrice}:{data:any,showPrice:boolean}) {
  const router=useRouter();
    return <div onClick={(e)=>{
   //   router.push(`/course/${data.Course.courseId}`)
    }} className="cursor-pointer box-border border flex flex-col p-6 justify-start items-start border-blue border-1 bg-dark_blue rounded-2xl">
  
  <section className='flex-1 flex-col'>
  <div className='w-full flex flex-row justify-between items-center'>
  
       <p className="text-text_grey text-[12px] font-medium">{data.Course.courseCode}</p>
    
     {/* <div className="flex flex-row gap-1 mt-2 items-center">
      <img
                                   
                                   className="text-text_grey_one h-4 w-4"
                                   src="/Icon_star.svg"/>
     
        <p className="text-text_grey_one text-base font-medium">{data.CourseRating.defaultRating}</p>
      </div> */}
     </div>
      <h2 className="text-white text-xl font-medium">{data.Course.title}</h2>
      {
         hideDuration(data.partnerId,data.categoryId)?<></>:  <div className="flex flex-row gap-1 mt-2 items-center">
         <img
                                      
                                      className="text-text_grey_one h-4 w-4"
                                      src="/Icon_clock.svg"/>
        
           <p className="text-text_grey_one text-base font-normal">{Math.round(data.CourseDuration.courseDuration)} {data.CourseDuration.courseDurationType}</p>
         </div>
      }
    
  </section>
 
    </div>;
  }