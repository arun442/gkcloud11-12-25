import hideDuration from "@/helpers/hide_duration";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Metamorphous } from "next/font/google";
import { useRouter } from "next/navigation";
import { commonbasePath } from "../../../common/constants";
 
export default function CourseCard({
  data,
  showPrice,
}: {
  data: any;
  showPrice: boolean;
}) {
  const router = useRouter();
  // console.log('data',data);
  
  return (
    <div
      onClick={(e) => {
        router.push(`/course/${data.slug}`);
      }}
      className="cursor-pointer box-border border flex flex-col  p-4 justify-start items-start border-blue border-1 bg-dark_blue rounded-2xl" style={{width:data.title=="iScience"?"250px":"",alignItems:data.title=="iScience"?"center":""}}
    >
      <section className="flex-1 flex-col">
        <div className="w-full flex flex-row justify-between items-center">
          {/* <p className="text-text_grey text-[12px] font-medium">
            {data.courseCode}
          </p> */}
          {/* <div className="flex flex-row gap-1 mt-2 items-center">
      <img
                                   
                                   className="text-text_grey_one h-4 w-4"
                                   src="/Icon_star.svg"/>
     
        <p className="text-text_grey_one text-base font-medium">{data.CourseRating.defaultRating}</p>
      </div> */}
        </div>
        <h2 className="text-white text-md font-sm">{data.title}</h2>
        {hideDuration(data.partnerId, data.categoryId) ? (
          <></>
        ) : (
          <div className="flex flex-row gap-1 mt-2 items-center">
            <img
              alt="clock icon"
              className="text-text_grey_one h-4 w-4"
              src={`${commonbasePath}/Icon_clock.svg`}
            />
 
            <p className="text-text_grey_one text-base font-normal">
              {Math.round(data.CourseDurations[0].courseDuration)}{" "}
              {data.CourseDurations[0].courseDurationType}
            </p>
          </div>
        )}
      </section>
      {showPrice == true && data.CourseCostPlans[0].planPrice!=0.00 ? (
        <>
          <div className="flex flex-row gap-3 mt-7 pt-3 w-full border-dashed border-green border-t">
            {/* <p className="text-blue text-lg font-medium">{`₹${rupees.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</p> */}
            {data.CourseCostPlans[0].planPrice!=0.00 && data.CourseCostPlans[0].offerPrice!=0.00?<p className="text-blue text-sm md:text-lg font-medium line-through">{`₹${Math.round(data.CourseCostPlans[0].planPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</p>:data.CourseCostPlans[0].planPrice!=0.00 ?<p className="text-blue text-lg font-medium ">{`₹${Math.round(data.CourseCostPlans[0].planPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</p>:null}
            {data.CourseCostPlans[0].offerPrice!=0.00?<p className="text-blue text-sm md:text-lg font-medium">{`₹${Math.round(data.CourseCostPlans[0].offerPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</p>:null}

          </div>
 
          {/* {data.CourseCostPlans.length != 0 &&
          data.CourseCostPlans[0].offerId != null &&
          data.CourseCostPlans[0].offerPrice > 0 ? (
            <div className="flex flex-row gap-3 mt-7 p-3 w-full border-dashed border-green border-t">
              <h3 className="text-blue text-lg font-medium">
                ₹{Math.round(data.CourseCostPlans[0].offerPrice)}/-
              </h3>
              <h3 className="text-text_grey_one line-through text-lg font-normal">
                ₹{Math.round(data.CourseCostPlans[0].planPrice)}/-
              </h3>
            </div>
          ) : Math.round(data.CourseCostPlans[0].planPrice) < 1 ? (
            <></>
          ) : (
            <div className="flex flex-row gap-3 mt-7 p-3 w-full border-dashed border-green border-t">
              <h3 className="text-blue text-lg font-medium">
                ₹{Math.round(data.CourseCostPlans[0].planPrice)}/-
              </h3>
            </div>
          )} */}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
 
 