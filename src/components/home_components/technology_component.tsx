


import { axiosPublic } from "@/common/axiosPublic";
import imageHelper from "@/common/image_helper";

import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";




const TechnologyComponent: React.FC = () => {
    const [items,setItems]=useState([]);
 const router=useRouter();
useEffect(() => {
 
  fetchData();
  
}, [])



const fetchData=async()=>{
  try {
    const result = await axiosPublic.get('/lms/course-category');
   console.log("what is the result");
  


   setItems(result.data.CourseCategory);
  } catch (error) {
 
  }
}

    return (

       
  <div className="w-full grid grid-cols-4 gap-4">

  {
items.map((e:any,index)=>{
return  <div onClick={()=>{
  router.push(`/course?type=technology&id=${e.categoryId}&name=${e.categoryName}`)
}} key={index} className="cursor-pointer box-border  border h-32 flex flex-col p-4 justify-center items-center border-blue border-1 bg-dark_blue rounded-lg">
{/* <div className="flex-1">
<img

className="cursor-pointer object-contain max-w-full h-full w-full"
src={imageHelper(e.Image.imageUrl)}
alt="link"
/>
</div> */}

<p className="mt-2 text-center text-lg text-white font-medium">{e.categoryName}</p>
</div>
})
  }




  </div>
    )
}

export default TechnologyComponent;





