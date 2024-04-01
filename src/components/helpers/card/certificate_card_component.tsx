import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation';

export default function CertificateCard({data}:{data:any}) {
  const router=useRouter();
    return <div onClick={(e)=>{
      router.push(`/certificate/${data.certificateCourseId}`)
    }} className="cursor-pointer box-border border flex flex-col p-6 justify-start items-start border-blue border-1 bg-dark_blue rounded-2xl">
      <p className="text-text_grey text-[12px] font-medium">{data.certificateName}</p>
      <h2 className="text-white text-xl font-medium">{data.title}</h2>
      <div className="flex flex-row gap-1 mt-2 items-center">
        <MagnifyingGlassIcon className="text-text_grey_one h-4 w-4" />
        <p className="text-text_grey_one text-base font-normal">{data.CertificateCourseCostPlans[0].CourseDuration.courseDuration} days</p>
      </div>
  
      {
  data.CertificateCourseCostPlans.length!=0&& data.CertificateCourseCostPlans[0].offerId!=null?     <div className="mx-auto box-border border flex flex-row gap-3 mt-7 items-center p-3  border-blue border-1 bg-primary_color rounded-2xl">
  
        <h3 className="text-blue text-lg font-medium">₹ {data.CertificateCourseCostPlans[0].planPrice}/-</h3>
        <h3 className="text-text_grey_one line-through text-lg font-normal">₹ {data.CertificateCourseCostPlans[0].offerPrice}/-</h3>
      </div>:  <div className="mx-auto box-border border flex flex-row gap-3 mt-7 items-center p-3  border-blue border-1 bg-primary_color rounded-2xl">
  
  <h3 className="text-blue text-lg font-medium">₹ {data.CertificateCourseCostPlans[0].planPrice}/-</h3>

</div>
    }
    </div>;
  }