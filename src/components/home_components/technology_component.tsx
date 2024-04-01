


import { axiosPublic } from "@/common/axiosPublic";
import imageHelper from "@/common/image_helper";

import Image from "next/image";
import React, { useState, useEffect } from "react";




const TechnologyComponent: React.FC = () => {
    const [items,setItems]=useState([]);
 
useEffect(() => {
 
  fetchData();
  
}, [])



const fetchData=async()=>{
  try {
    const result = await axiosPublic.get('/lms/technology');
   console.log("what is the result");
  


   setItems(result.data);
  } catch (error) {
 
  }
}

    return (

       
  <div className="w-full grid grid-cols-4 gap-4">

  {
items.map((e:any,index)=>{
return  <div key={index} className="box-border  border h-32 flex flex-col p-4 justify-start items-center border-blue border-1 bg-dark_blue rounded-lg">
<div className="flex-1">
<img

className="cursor-pointer object-contain max-w-full h-full w-full"
src={imageHelper(e.Image.imageUrl)}
alt="link"
/>
</div>

<p className="mt-2 text-center text-sm text-white font-normal">{e.technologyName}</p>
</div>
})
  }




  </div>
    )
}

export default TechnologyComponent;





