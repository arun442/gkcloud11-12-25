import { axiosPublic } from "@/common/axiosPublic";
import { useState ,useEffect} from "react";
import LeadFormModel from "../LeadFromModel";


const Marquee = () => {
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
    setIsOpen(true)
  }
    return (
    data.length!=0&&  <div className="sticky top-0 z-20  overflow-hidden  bg-scroll_green font-semibold p-2 flex justify-center items-center">
       <LeadFormModel isFromOffer={true} data={{}} isOpen={isOpen} closeModal={closeModal} courseCode={""} courseName={""} />
        <div className="inline-block cursor-pointer" onClick={(e)=>openModal()}>
          {
            data[0].description
          }
         
        </div>
      </div>
    );
  };

  export default Marquee;