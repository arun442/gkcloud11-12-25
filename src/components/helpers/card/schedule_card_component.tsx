import { axiosPrivate } from '@/common/axiosPrivate';
import useTrainingMode from '@/hooks/training_mode_hook';
import useUserData from '@/hooks/userData';
import { MagnifyingGlassIcon, CalendarIcon } from '@heroicons/react/24/outline'
import moment from 'moment';
import { useState } from 'react';


export default function ScheduleCard({ data,type }: { data: any,type:number }) {
  const { userData,} = useUserData();
  const [selectedCat, setSelectedCat] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const { trainingData } = useTrainingMode();
  const entroll=async()=>{
    if(selectedCat==null){
      return alert("Please select the schedule");
    }
    if(userData==null){
        return alert("Before enrollment Please login");
    }
    try {
        if (isLoading) {
            return;
        }
        setLoading(true);
        const result = await axiosPrivate.post('/lms/add-course-enrollment', {
            "userId":  userData.userId,
            "courseId" :selectedCat,
           
            "courseCostPlanId": data.CourseCostPlans[0].courseCostPlanId,
            "enrollmentReference":"This is Test Enrollment",
            "amount": data.CourseCostPlans.length!=0&& data.CourseCostPlans[0].offerId!=null?data.CourseCostPlans[0].offerPrice: data.CourseCostPlans[0].planPrice
            });
    
    
        setLoading(false);
        window.open(`${result.data.gateway.url}&encRequest=${result.data.gateway.encRequest}&access_code=${result.data.gateway.access_code}`);
        console.log(result.data);
       
    
    } catch (error: any) {
        setLoading(false);
        console.log(error);
        alert(error!.message);
    
    }
        }
  return <div className=" cursor-pointer box-border  p-6  border flex flex-col justify-start items-start border-grey border-1 bg-dark_blue rounded-2xl">

<div className='flex-1'>
  
<h2 className="text-white text-lg font-medium">{data.title}</h2>
    <div className="w-full flex flex-row mt-6 items-center justify-between">
      <p className="text-text_grey_one text-[12px] font-normal">{data.courseCode}</p>
      <div className='flex-1 flex flex-row items-center justify-end gap-2'>
        <CalendarIcon className="text-text_grey_one h-4 w-4" />
        <p className="text-text_grey_one text-[12px] font-normal"> {data.CourseDurations[0].courseDuration} Days</p>
      </div>

    </div>
    <table className="border-collapse border-[0.25px] border-text_grey_one  mt-6 w-full">
      <thead className='border-[0.25px] border-text_grey_one'>
        <tr >

          <th className="border-[0.25px] border-text_grey_one text-base text-white font-normal py-6">Date</th>
          <th className="border-[0.25px] border-text_grey_one text-base text-white font-normal">Location</th>
          <th className="border-[0.25px] border-text_grey_one text-base text-white font-normal">Fees</th>
        </tr>
      </thead>
      <tbody>
       {
        data.CourseSchedules.map((option:any,index:any)=>{
          return  <tr key={index}>

          <td className="border-b-[0.25px] border-text_grey_one py-4 px-2 flex items-center gap-2"> 
          <input
            id={option.scheduleId}
            name={`${option.scheduleId}[]`}
            defaultValue={option.scheduleId}
            value={option.scheduleId}
            type="checkbox"
            checked={selectedCat == option.scheduleId ? true : false}
            onChange={(e:any) => {
              setSelectedCat(e.target.value);

            }}
            defaultChecked={false}
            className={selectedCat == option.scheduleId ? "h-4 w-4 rounded  border-custom_blue text-custom_blue focus:ring-custom_blue" : "h-4 w-4 rounded border-custom_grey text-custom_grey focus:ring-custom_grey"}
          />
          
           <label
            htmlFor={`filter-mobile-${option.scheduleId}`}
            className={selectedCat == option.scheduleId ? "text-base font-medium text-blue text-center" : "text-base font-medium text-table_font text-center"}
          > {moment(new Date(option.startDate)).format('MMMM Do')}- {moment(new Date(option.endDate)).format('MMMM Do')}  </label></td>
          <td className="border-[0.25px]  text-base font-medium text-table_font text-center py-4">{trainingData.filter((e) => e.trainingModeId == option.trainingModeId).length == 0 ? "" : trainingData.filter((e) => e.trainingModeId == option.trainingModeId)[0].trainingModeShortName}</td>
          <td className="border-[0.25px]  text-base font-medium text-table_font text-center py-4"> {
  data.CourseCostPlans.length!=0&& data.CourseCostPlans[0].offerId!=null?     <div className="flex flex-row items-center">
  
        <h3 className=" text-base font-medium text-table_font">₹ {data.CourseCostPlans[0].offerPrice}/-</h3>
        <h3 className=" line-through text-base font-medium text-table_font">₹ {data.CourseCostPlans[0].planPrice}/-</h3>
      </div>:  <div className="flex flex-row items-center">
  
  <h3 className="text-base font-medium text-table_font">₹ {data.CourseCostPlans[0].planPrice}/-</h3>

</div>
    }</td>
        </tr>
        })
       }

      </tbody>
    </table>
</div>
    <div onClick={(e)=>{
      entroll();
    }} className="text-white text-sm font-medium mx-auto mt-7 items-center py-3  px-8  rounded-full bg-blue">

      Enroll
    </div>

  </div>;
}