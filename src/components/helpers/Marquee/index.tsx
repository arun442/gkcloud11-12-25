import { axiosPublic } from "@/common/axiosPublic";
import { useState ,useEffect} from "react";


const Marquee = () => {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
  
      fetchData();
  
    }, [])
  
    const fetchData = async () => {
      try {
        const result = await axiosPublic.get('/lms/scroller-message');
  
        setData(result.data.scrollerMessage);
       
      } catch (error) {
  
      }
    }
    return (
    data.length!=0&&  <div className=" relative overflow-hidden whitespace-nowrap bg-scroll_green font-semibold p-2">
        <div className="inline-block animate-marquee">
          <span className="mx-4">{data[0].contentTitle}</span>
          <span className="mx-4">{data[0].description}</span>
          {/* <span className="mx-4">Here is another piece of scrolling text.</span>
          <span className="mx-4">And yet another scrolling message!</span> */}
        </div>
      </div>
    );
  };

  export default Marquee;