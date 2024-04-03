import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation';


export default function CourseCard({data,showPrice}:{data:any,showPrice:boolean}) {
  const router=useRouter();
    return <div onClick={(e)=>{
      router.push(`/course/${data.courseId}`)
    }} className="cursor-pointer box-border border flex flex-col p-6 justify-start items-start border-blue border-1 bg-dark_blue rounded-2xl">
  
  <section className='flex-1 flex-col'>
  <div className='w-full flex flex-row justify-between items-center'>
     <p className="text-text_grey text-[12px] font-medium">{data.courseCode}</p>
     {/* <div className="flex flex-row gap-1 mt-2 items-center">
      <img
                                   
                                   className="text-text_grey_one h-4 w-4"
                                   src="/Icon_star.svg"/>
     
        <p className="text-text_grey_one text-base font-medium">{data.CourseRating.defaultRating}</p>
      </div> */}
     </div>
      <h2 className="text-white text-xl font-medium">{data.title}</h2>
      <div className="flex flex-row gap-1 mt-2 items-center">
      <img
                                   
                                   className="text-text_grey_one h-4 w-4"
                                   src="/Icon_clock.svg"/>
     
        <p className="text-text_grey_one text-base font-normal">{data.CourseDurations[0].courseDuration} days</p>
      </div>
  </section>
 {
  showPrice==true?  <>
  {
 data.CourseCostPlans.length!=0&& data.CourseCostPlans[0].offerId!=null?     <div className="mx-auto box-border border flex flex-row gap-3 mt-7 items-center p-3  border-blue border-1 bg-primary_color rounded-2xl">
 
       <h3 className="text-blue text-lg font-medium">₹ {data.CourseCostPlans[0].planPrice}/-</h3>
       <h3 className="text-text_grey_one line-through text-lg font-normal">₹ {data.CourseCostPlans[0].offerPrice}/-</h3>
     </div>:  <div className="mx-auto box-border border flex flex-row gap-3 mt-7 items-center p-3  border-blue border-1 bg-primary_color rounded-2xl">
 
 <h3 className="text-blue text-lg font-medium">₹ {data.CourseCostPlans[0].planPrice}/-</h3>

</div>
   }
  
  </>:<></>
 }
    </div>;
  }