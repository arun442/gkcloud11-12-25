import React, { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import BoxReveal from "@/components/ui/box-reveal";
import GradualSpacing from "@/components/ui/gradual-spacing";
import { IoBook } from "react-icons/io5";
import { TbClock24 } from "react-icons/tb";
import { IoLanguage } from "react-icons/io5";
import { FaPuzzlePiece } from "react-icons/fa6";
import { GiRead } from "react-icons/gi";
import { HiLightBulb } from "react-icons/hi";
import { SiIbm } from "react-icons/si";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";
import Head from "next/head";
import { commonbasePath } from "@/common/constants";

export const Stu = () => {

  return (
    <div className="bg-none">
{/*  */}
   
        <ExampleContent />
        <ExampleContent1 />
        <ExampleContent2 />
   
    </div>
  );
};
 
const IMG_PADDING = 12;
 
// const TextParallaxContent = ({
//   imgUrl,
//   subheading, 
//   heading,
//   children,
// }: {
//   imgUrl: string;
//   subheading: string;
//   heading: string;
//   children: ReactNode;
// }) => {
//   return (
//     <div
//       style={{
//         paddingLeft: IMG_PADDING,
//         paddingRight: IMG_PADDING,
//       }}
//     >
//       <div className="relative h-[150vh]">
//         <StickyImage imgUrl={imgUrl} />
//         <OverlayCopy heading={heading} subheading={subheading} />
//       </div>
//       {children}
//     </div>
//   );
// };
 
// const StickyImage = ({ imgUrl }: { imgUrl: string }) => {
//   const targetRef = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: targetRef,
//     offset: ["end end", "end start"],
//   });
 
//   const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
//   const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
 
//   return (
//     <motion.div
//       style={{
//         backgroundImage: `url(${imgUrl})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         height: `calc(100vh - ${IMG_PADDING * 2}px)`,
//         top: IMG_PADDING,
//         scale,
//       }}
//       ref={targetRef}
//       className="sticky z-0 overflow-hidden rounded-3xl"
//     >
//       <motion.div
//         className="absolute inset-0 bg-neutral-950/70"
//         style={{
//           opacity,
//         }}
//       />
//     </motion.div>
//   );
// };
 
// const OverlayCopy = ({
//   subheading,
//   heading,
// }: {
//   subheading: string;
//   heading: string;
// }) => {
//   const targetRef = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: targetRef,
//     offset: ["start end", "end start"],
//   });
 
//   const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
//   const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);
 
//   return (
//     <motion.div
//       style={{
//         y,
//         opacity,
//       }}
//       ref={targetRef}
//       className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white"
//     >
//               <p className="text-center text-4xl font-bold md:text-7xl">{heading}</p>

//       <p className="mb-2 text-center text-xl md:mb-4 md:text-3xl">
//         {subheading}
//       </p>
//     </motion.div>
//   );
// };
const basePath  = commonbasePath;

const ExampleContent = () => (

  <div className="mx-auto  w-full pb-24  " style={{margin:0,marginTop:"100px"}}>
    
    <motion.div
    initial={{opacity:0}}
    whileInView={{opacity:1}}
            className="hidden md:flex w-full"
      >
    <span className=" w-full text-3xl font-bold text-white mb-10 flex items-center justify-center gap-4">
    Unlock Learning with   <span className="text-3xl font-bold" ><img src={`${basePath}/stu-white.png`} alt="stu" style={{height:"40px"}}/> </span>
    </span>
      </motion.div>
    <motion.div
   
    className="grid grid-cols-1 gap-2 md:grid-cols-2 mb-10 ">
      
    <div className="flex flex-col justify-end ">
     
      <span className=" text-3xl font-bold text-white mb-10  sm:hidden">
    Unlock Learning with  <span className="text-3xl font-bold" ><img src={`${basePath}/stu-white.png`} alt="stu" style={{height:"40px"}}/> </span>
    </span>
      <div className=" text-neutral-600 font-light text-sm md:text-sm  text-white  p-5  text-justify bg-[#192043] rounded-lg" >
        <h3 className="text-xl font-bold mb-1 flex items-center gap-2 justify-start text-yellow "><HiLightBulb style={{color:'#ffc82c',fontSize:"40px"}}/> Your Path to Smarter Learning</h3>
<div>
      At GK Cloud Solutions, we’re revolutionizing the way you learn. With Stu, our cutting-edge AI assistant, you get personalized support across all our courses. Whether you're an individual seeking to upskill, a student tackling challenging subjects, or a career aspirant preparing for your next opportunity, Stu is here to guide you.<br/><br/>
      With over 12 expertly designed courses enabled with Stu, our Learning Management System (LMS) ensures you're never alone in your learning journey. Whether it's answering questions, clarifying concepts, or offering additional resources, Stu delivers real-time support whenever you need it.
      </div>
      </div>
 
   
    </div>
    <video  autoPlay muted loop style={{maxWidth:"fit-content",width:"100%"}} >
      <source src={`${basePath}/stuanimation5.mp4`} type="video/mp4"/>
     </video>    
     {/* <div     style={{maxWidth:"fit-content",width:"100%"}} >
      <img src={`${basePath}/stuanimation5.gif`} alt="stu"/>
     </div>    */}
    </motion.div>
 
  </div>

);
const ExampleContent1 = () => (
  <div>
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 mb-10  md:grid-cols-12 items-center">
      
      <div className="col-span-1 text-xl h-6/6 w-full flex flex-col font-bold md:col-span-4 items-center text-white">
      <span className="w-full text-start text-white mb-2 font-semibold text-3xl md:flex md:items-center md:gap-2">Why Learn with <span className="text-3xl font-bold" ><img src={`${basePath}/stu-white.png`} alt="stu" style={{height:"30px"}}/> </span></span>

      <img src={`${basePath}/whystu3.png`} style={{ height: '300px' }} alt="description" />
      </div>

      <div className="col-span-1 md:col-span-8 grid items-end ">
        <div className="mb-4 font-normal text-neutral-600 md:text-xl flex flex-col items-center md:items-end text-white">
            <motion.div
            initial={{x:-200}}
            whileInView={{x:0}}
            transition={{duration:1}}
            className="flex flex-row gap-2 bg-[#192043] rounded-lg p-2 md:mr-28  w-4/5">
            <TbClock24 style={{fontSize:"45px",color:'#E7DBC3'}}/>
            <div className="flex flex-col items-start">
              <div className="text-lg font-bold">Instant Assistance</div> 
              <span className="mt-2  font-light text-sm">Get answers to your questions in real-time, 24/7.</span>

            </div>

            </motion.div>
            <motion.div
            initial={{x:-200}}
            whileInView={{x:0}}
            transition={{duration:2}}
            className="flex flex-row gap-2 bg-[#192043] rounded-lg p-2 mt-3  w-4/5">
            <IoLanguage style={{fontSize:"55px",color:'#E7DBC3'}}/>
            <div className="flex flex-col items-start">
            <div className="text-lg font-bold">Multilingual Support</div>
              <span className="mt-2  font-light text-sm">Learn in the language you’re comfortable with—Stu speaks and understands multiple languages, including Indian languages.
              </span>

        </div>
        </motion.div>
        <motion.div 
              initial={{x:-200}}
              whileInView={{x:0}}
              transition={{duration:1}}
        className="flex flex-row gap-2 bg-[#192043] rounded-lg p-2 mt-3 md:mr-28 w-4/5">
        <FaPuzzlePiece style={{fontSize:"45px",color:'#E7DBC3'}}/>
        <div className="flex flex-col items-start">
        <div className="text-lg font-bold">Seamless Integration</div>

        <span className="mt-2  font-light text-sm">     Stu is embedded across all courses, offering a smooth, interactive learning experience.
        </span>
        </div>
      
        </motion.div>
        <motion.div
              initial={{x:-200}}
              whileInView={{x:0}}
              transition={{duration:1}}
        className="flex flex-row gap-2 bg-[#192043] rounded-lg p-2 mt-3  w-4/5">
        <GiRead style={{fontSize:"45px",color:'#E7DBC3'}}/>
        <div className="flex flex-col items-start">
        <div className="text-lg font-bold">Personalized Learning</div>

        <span className="mt-2  font-light text-sm"> Stu adapts to your learning pace and style, ensuring every lesson is tailored for you.       
        </span>
        </div>
        
        </motion.div>
        </div>
     
        
      </div>
     
    </div>
   
    </div>

  );

  const ExampleContent2 = () => (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
      
      <div className="col-span-1 text-3xl font-bold md:col-span-4 text-white ">
     <h2> Stu Featured in IBM Success Case Study  </h2>  
     <div className="flex flex-row justify-center items-center mt-5">
     <img src={`${basePath}/IBM_WatsonX.png`} style={{height:"80px"}}/>
      </div>
    

      </div>
      <div className="col-span-1 md:col-span-8 ">
        <p className="mb-4 font-normal text-neutral-600 md:text-base text-white text-justify">
        We’re proud to announce that Stu, our AI-powered learning companion, has been featured in a success case study by IBM! Powered by IBM Watsonx, Stu has revolutionized the learning experience by providing personalized, real-time support to learners, resulting in higher engagement and improved knowledge retention.</p>
        <p className=" font-normal text-neutral-600 md:text-base text-white ">
        Read the full case study to see how Stu is driving learner success and business growth
        <span className="flex flex-row items-center justify-start gap-2">
        <a className="underline text-blue " target="blank" href="https://www.ibm.com/case-studies/gk-cloud-solutions"> GK Cloud Solutions - IBM Case Study  </a><HiArrowTopRightOnSquare/>

        </span>
        </p>
    
      </div>
    </div>
  );