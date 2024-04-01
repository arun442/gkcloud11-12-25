import { MagnifyingGlassIcon, CalendarIcon } from '@heroicons/react/24/outline'


export default function WebinarCard({ data }: { data: any}) {
  return <div className="cursor-pointer box-border border flex flex-col justify-start items-start border-blue border-1 bg-dark_blue">
  <div className='w-full bg-blue h-48'></div>
  <section className='flex flex-col  p-6 '>
  <h2 className="text-white text-xl font-medium">{data.webinarName}</h2>
   <div className="flex flex-row gap-1 mt-2 items-center justify-between">
    <div className='flex flex-row'>
    <CalendarIcon className="text-text_grey_one h-4 w-4" />
     <p className="text-text_grey_one text-base font-normal">15 Mar 2024 | 06:45PM</p>
    </div>
    <p className="text-text_grey_one text-base font-normal">More..</p>
   </div>

 <div className="text-white text-sm font-medium mx-auto mt-7 items-center py-3  px-6  rounded-full bg-blue">

   Register Now
   </div>
  </section>
 </div>;
}