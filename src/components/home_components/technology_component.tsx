


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

       
  <div className="w-full grid grid-cols-4 gap-2">

  {
items.map((e:any)=>{
return  <div className="box-border border flex flex-col p-6 justify-start items-center border-blue border-1 bg-dark_blue rounded-lg">
<div className="border-blue-100 rounded-full h-14 w-14 p-3  bg-white-A700">
<Image
height={150}
width={150}
className="h-full w-full cursor-pointer"
src={imageHelper(e.Image.imageUrl)}
alt="link"
/>
</div>

<p className="ml-6 text-center text-sm text-white font-normal">{e.technologyName}</p>
</div>
})
  }




  </div>
    )
}

export default TechnologyComponent;





