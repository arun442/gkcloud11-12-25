"use client";


import { axiosPublic } from "@/common/axiosPublic";
import imageHelper from "@/common/image_helper";
import { commonbasePath } from "@/common/constants";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState, useEffect, forwardRef, useRef  } from "react";
import AI from '../../../public/Techimages/ai.png'

import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/ui/animated-beam";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className,
      )}
    >
      {children}
    </div>
  );
});
 
Circle.displayName = "Circle";
const TechnologyComponent: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);
  const div8Ref = useRef<HTMLDivElement>(null);
  const centerref = useRef<HTMLDivElement>(null);

  const refsArray = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

    const [items,setItems]=useState([]);
 const router=useRouter();
useEffect(() => {
 
  fetchData();
  
}, [])


function removeDuplicates(array:any, property:any) {
  let seen:any = {};
  return array.filter(function(item:any) {
      let key = item[property];
      return seen.hasOwnProperty(key) ? false : (seen[key] = true);
  });
}
const fetchData=async()=>{
  try {
    const result = await axiosPublic.get('/lms/course-category');
  
  


   setItems(removeDuplicates( result.data.CourseCategory, 'categoryName'));
   console.log(removeDuplicates( result.data.CourseCategory, 'categoryName'));
   
  } catch (error) {
 
  }
}
const basePath  = commonbasePath;

    return (

       
  <div className="w-full flex justify-center" style={{height:"500px"}}>
 <div
className="relative flex h-full  md:w-6/12 w-full items-center justify-center rounded-xl lg:p-8 xl:p-8   md:shadow-xl "
ref={containerRef}
>
<div className="flex size-full flex-col max-w-lg  items-stretch justify-between gap-10">
    {/* <div className="flex flex-row items-center justify-between">
          <Circle ref={div1Ref}>
          <img src={AI.src} />
          </Circle>
          <Circle ref={div5Ref}>
          <img src={AI.src} />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div2Ref}>
          <img src={AI.src} />
          </Circle>
          <Circle ref={div4Ref} className="size-16">
          <img src={AI.src} />
          </Circle>
          <Circle ref={div6Ref}>
          <img src={AI.src} />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div3Ref}>
          <img src={AI.src} />
          </Circle>
          <Circle ref={div7Ref}>
          <img src={AI.src} />
          </Circle>
        </div> */}
 <div className="flex flex-row items-center justify-between">

  {
items.map((e:any,index)=>{
  // let refname="divref"+index+1
  console.log(index);
  
return( 
<>
{index<3?
<>
    <Circle ref={refsArray[index]} className="circle size-20 hover:scale-110 cursor-pointer">
      {e.categoryName=="Cloud Computing"?
      <img src={`${basePath}/Techimages/cloud-computing.png`} onClick={()=>{router.push(`/course?type=technology&id=${e.categoryId}&name=${e.categoryName}`)}}/>:
      e.categoryName=="AI"?
      <img src={`${basePath}/Techimages/ai.png`}onClick={()=>{router.push(`/course?type=technology&id=${e.categoryId}&name=${e.categoryName}`)}}/>:
<img src={`${basePath}/Techimages/security.png`} onClick={()=>{router.push(`/course?type=technology&id=${e.categoryId}&name=${e.categoryName}`)}}/>
}
<span
    className="absolute opacity-100 circle-hover:opacity-100 text-black-700 text-sm :-translate-y-10  z-50 mt-28 text-white"
  >
{e.categoryName}  </span>
    </Circle>

  </>
    :null
}
<AnimatedBeam
  containerRef={containerRef}
  fromRef={refsArray[0]}
  toRef={centerref}
  curvature={-125}
  endYOffset={0}
  pathOpacity={0.2}
  reverse
  gradientStartColor="	#00ffec"
  gradientStopColor="#0038ff"
  />

<AnimatedBeam
  containerRef={containerRef}
  fromRef={refsArray[1]}
  toRef={centerref}
  pathOpacity={0.2}
  reverse
  gradientStartColor="	#00ffec"
  gradientStopColor="#0038ff"
/>
<AnimatedBeam
  containerRef={containerRef}
  fromRef={refsArray[2]}
  toRef={centerref}
  curvature={-125}
  endYOffset={0}
  pathOpacity={0.2}
  gradientStartColor="	#00ffec"
  gradientStopColor="#0038ff"
/>

</>
 
 
) 

  })
}
 

</div>
<div className="flex flex-row items-center justify-between">

  {
items.map((e:any,index)=>{

return( 
<>
{index === 3 && (
        <Circle ref={refsArray[index]} className="size-20 hover:scale-110 cursor-pointer">
          <img src={`${basePath}/Techimages/azure.png`} onClick={()=>{router.push(`/course?type=technology&id=${e.categoryId}&name=${e.categoryName}`)}} />
          <span
    className="absolute opacity-100 circle1-hover:opacity-100 text-gray-700 text-sm :-translate-y-10  z-50 mt-28 text-white"
  >
{e.categoryName}  </span>
        </Circle>
        
      )}

      {index === 3 && (
        <Circle ref={centerref} className="size-30  text-[#00051F] font-bold " >
          <h1 >Technologies</h1>
        </Circle>
      )}

      {index === 4 && (
        <Circle ref={refsArray[index]} className="size-20 hover:scale-110 cursor-pointer">
          <img src={`${basePath}/Techimages/infrastructure.png`} onClick={()=>{router.push(`/course?type=technology&id=${e.categoryId}&name=${e.categoryName}`)}} />
          <span
    className="absolute opacity-100 circle1-hover:opacity-100 text-gray-700 text-sm :-translate-y-10  z-50 mt-28 text-white"
  >
{e.categoryName}  </span>
        </Circle>
      )}
<AnimatedBeam
  containerRef={containerRef}
  fromRef={refsArray[3]}
  toRef={centerref}
  endYOffset={0}
  pathOpacity={0.2}
  reverse
  gradientStartColor="	#00ffec"
  gradientStopColor="#0038ff"
/>
<AnimatedBeam
  containerRef={containerRef}
  fromRef={refsArray[4]}
  toRef={centerref}
  endYOffset={0}
  pathOpacity={0.2}
  gradientStartColor="	#00ffec"
  gradientStopColor="#0038ff"
/>
</>
 
 
) 

  })
}
 

</div>
<div className="flex flex-row items-center justify-between ">

  {
items.map((e:any,index)=>{
  

return( 
<>
{index>4&&index<8?
    <Circle ref={refsArray[index]} className="size-20 hover:scale-110 cursor-pointer" >
 {e.categoryName=="Azure Infrastructure"?
      <img src={`${basePath}/Techimages/azureinfrastructure.png`} onClick={()=>{router.push(`/course?type=technology&id=${e.categoryId}&name=${e.categoryName}`)}}/>:
      e.categoryName=="Cloud"?
      <img src={`${basePath}/Techimages/server.png`}onClick={()=>{router.push(`/course?type=technology&id=${e.categoryId}&name=${e.categoryName}`)}}/>:
<img src={`${basePath}/Techimages/management.png`} onClick={()=>{router.push(`/course?type=technology&id=${e.categoryId}&name=${e.categoryName}`)}}/>

}  
<span
    className="absolute opacity-100 circle1-hover:opacity-100 text-gray-700 text-sm :-translate-y-10  z-50 mt-28 text-white"
  >
{e.categoryName}  </span>
  </Circle>:null
}
<AnimatedBeam
  containerRef={containerRef}
  fromRef={refsArray[5]}
  toRef={centerref}
  curvature={125}
  endYOffset={0}
  reverse
  pathOpacity={0.2}
  gradientStartColor="	#00ffec"
  gradientStopColor="#0038ff"
/> 
<AnimatedBeam
  containerRef={containerRef}
  fromRef={refsArray[6]}
  toRef={centerref}
  endYOffset={0}
  reverse
  pathOpacity={0.2}
  gradientStartColor="	#00ffec"
  gradientStopColor="#0038ff"
/> 
<AnimatedBeam
  containerRef={containerRef}
  fromRef={refsArray[7]}
  toRef={centerref}
  curvature={125}
  endYOffset={0}
  pathOpacity={0.2}
  gradientStartColor="	#00ffec"
  gradientStopColor="#0038ff"
/> 
</>
 
 
) 

  })
}
 

</div> 

{/* //  <div onClick={()=>{
//   router.push(`/course?type=technology&id=${e.categoryId}&name=${e.categoryName}`)
// }} key={index} className="transform transition duration-500 hover:scale-110 cursor-pointer box-border  border h-32 flex flex-col p-4 justify-center items-center border-blue border-1 bg-dark_blue rounded-lg">
// {/* <div className="flex-1">
// <img

// className="cursor-pointer object-contain max-w-full h-full w-full"
// src={imageHelper(e.Image.imageUrl)}
// alt="link"
// />
// </div> 

// <p className="mt-2 text-center text-lg text-white font-medium">{e.categoryName}</p>
// </div> */}


</div>







</div>

  </div>
    )
}

export default TechnologyComponent;





