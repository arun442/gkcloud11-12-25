import { axiosPublic } from "@/common/axiosPublic";
import { useState ,useEffect} from "react";
import LeadFormModel from "../LeadFromModel";
import { MdOutlineArrowOutward } from "react-icons/md";
import { Cover } from "@/components/ui/cover";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";
import { FaGraduationCap } from "react-icons/fa";
import { commonbasePath } from "@/common/constants";
import { useRouter } from 'next/router';

const  Marquee = () => {
  const router = useRouter();

    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
  
      fetchData();
  
    }, [])
    const [isOpen, setIsOpen] = useState(false);
    
    const fetchData = async () => {
      try {
        const result = await axiosPublic.get('/lms/scroller-message');
  
        setData(result.data.scrollerMessage);
     
      } catch (error) {
  
      }
    }
      function closeModal(isDownloaded: any) {

    setIsOpen(false)
  }

  function openModal() {
    // setIsOpen(true)
    router.push("/free_webinar")
  }
    return (
  <>
       <LeadFormModel isFromOffer={true} data={{}} isOpen={isOpen} closeModal={closeModal} courseCode={""} courseName={""} />

<div className='  flex justify-center gap-2 text-xs md:text-base lg:text-base xl:text-xl items-center bg-gradient-to-b from-[#591DA9] to-[#051960] w-full text-center cursor-pointer sticky top-0 z-20 text-white font-medium ' onClick={(e)=>openModal()} style={{padding:"6px"}}>
<FaGraduationCap className="text-5xl md:text-2xl" style={{color:"black",stroke: "white", strokeWidth: "20"}}/>
{/* <img src={`${commonbasePath}/webinar1.png`} style={{height:"30px",stroke:"white",strokeWidth:"25px"}}/> */}
<div className="md:p-[3px] lg:p-[3px]">
Join Our AI Revolution: Let’s Make Sure Robots Know Who’s Boss! <span className='text-[#FFF302] font-semibold'>Enroll Now and
Become a Tech Trailblazer!

</span> 
</div>
{/* <div className="flex gap-2 font-semibold">
FREE Webinar <span className=" hidden md:block"> :</span> <span className='text-[#FFF302] font-semibold'>Careers in AI</span> | <span className='text-[#FFF302] font-semibold'>Wed, 27<sup> th</sup> NOV 2024</span>|<span className='text-[#FFF302] font-semibold'>8:00 PM Onwards</span>|<span className='text-[#FFF302] font-semibold'>Online</span>  
</div> */}

</div>

  </>
    );
  };

  export default Marquee;