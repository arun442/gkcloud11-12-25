import { axiosPublic } from "@/common/axiosPublic";
import { useState ,useEffect, useRef} from "react";
import LeadFormModel from "../LeadFromModel";
import { MdOutlineArrowOutward } from "react-icons/md";
import { Cover } from "@/components/ui/cover";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";
import { FaGraduationCap } from "react-icons/fa";
import { commonbasePath } from "@/common/constants";
import { Dialog, Transition } from '@headlessui/react'
import Assistant from "@/components/ai_assistant_component/Assistant";
import Lottie from 'react-lottie';
import animationData from '../../../../public/chatbotanimation4.json'
export default function  Ai_button ()  {
    const [isOpen, setIsOpen] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const handleMouseEnter = () => {
        if (audioRef.current) {
          audioRef.current.play();
        }
      };

      const handleMouseLeave = () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
      };

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    const toggleChat = () => {
      
      setIsOpen(!isOpen);

    
    };
    function closeModal() {

        setIsOpen(false)
      }
    return (
  <>
  <div >
  <audio ref={audioRef} src={`${commonbasePath}/pop.mp3`}  />
  <Transition appear show={isOpen} >
                <div className=" relative z-40 " >
                    <Transition.Child
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center md:items-start xl:items-center justify-end  text-center  ">
                            <Transition.Child
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <div className=" bg-white-A700  max-w-128 transform overflow-hidden rounded-2xl bg-white p-0 text-left align-middle shadow-xl transition-all">
                                <Assistant closeModel={closeModal}/>
                                </div>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Transition>
            <span className="fixed bottom-1 right-1 cursor-pointer z-10" onClick={toggleChat}>
                <div className="w-full flex items-end justify-end h-fit">
                {/* <img src={`${commonbasePath}/popclose.png`} alt="close" style={{height:'20px'}}  className="pointer"/> */}

                </div>
<div
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
    onClick={handleMouseEnter}
    >
         <Lottie options={defaultOptions} height={isOpen?80:150} width={isOpen?100:200} />
                         {/* <img src={`${commonbasePath}/chatbot1.png`}  alt='ai_assiatant' />  */}


</div>
            </span>
            {/* <lottie-player
  autoplay
  controls
  loop
  mode="normal"
  src={`${commonbasePath}/chatbotanimation.json`}
  style={{width:"320px"}}
></lottie-player> */}
                {/* <img src={`${commonbasePath}/chatbot1.png`}  alt='ai_assiatant' /> */}

            </div>
            </>

    );
  };

