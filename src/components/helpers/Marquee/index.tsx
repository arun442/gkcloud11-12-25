import { axiosPublic } from "@/common/axiosPublic";
import { useState ,useEffect} from "react";
import LeadFormModel from "../LeadFromModel";


const Marquee = () => {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
  
      fetchData();
  
    }, [])
    const [isOpen, setIsOpen] = useState(true);
    
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
    data.length!=0&&  <div className=" relative overflow-hidden whitespace-nowrap bg-scroll_green font-semibold p-2">
       <LeadFormModel isFromOffer={true} data={{}} isOpen={isOpen} closeModal={closeModal} courseCode={""} courseName={""} />
        <div className="inline-block animate-marquee">
          <span className="mx-4 "  onClick={(e)=>openModal()}>{data[0].description}</span>
          {/* <span className="mx-4">Here is another piece of scrolling text.</span>
          <span className="mx-4">And yet another scrolling message!</span> */}
        </div>
      </div>
    );
  };

  export default Marquee;