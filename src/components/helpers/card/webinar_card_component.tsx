import WebinarModel from '@/components/webinar_components/webinar_popup';
import { MagnifyingGlassIcon, CalendarIcon } from '@heroicons/react/24/outline'
import { useState } from 'react';
import moment from 'moment';
import imageHelper from '@/common/image_helper';

export default function WebinarCard({ data }: { data: any}) {
  let [isOpen, setIsOpen] = useState(false)
  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
  return <div className="cursor-pointer box-border border flex flex-col justify-start items-start border-blue border-1 bg-dark_blue">
     <WebinarModel closeModal={closeModal} isOpen={isOpen} data={data} />
  <div className='w-full bg-blue h-48'>

  <img

className="cursor-pointer object-fill max-w-full h-full w-full"

src={imageHelper(data.Image.imageUrl)}
alt="link"
/>
  </div>
  <section className='flex flex-col  p-6 '>
  <h2 className="text-white text-xl font-medium">{data.webinarName}</h2>
   <div className="flex flex-row gap-1 mt-2 items-center justify-between">
    <div className='flex flex-row justify-center items-center'>
    <CalendarIcon className="text-text_grey_one h-4 w-4" />
     <p className="text-text_grey_one text-base font-normal">{data.WebinarSchedules.length==0?"": moment(new Date(data.WebinarSchedules[0].scheduleDate)).format("DD MMM YYYY | hh:mmA")}</p>
    </div>
    <p className="text-text_grey_one text-base font-normal">More..</p>
   </div>

 <div onClick={(e)=>{
  openModal();
 }} className="text-white text-sm font-medium mx-auto mt-7 items-center py-3  px-6  rounded-full bg-blue">

   Register Now
   </div>
  </section>
 </div>;
}